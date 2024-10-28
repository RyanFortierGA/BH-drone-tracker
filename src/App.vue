<template>
  <div id="app">
    <ControlPanel :isDetecting="isDetecting" @toggle-detection="toggleDetection" @clear-data="clearData" :activeDroneIds="activeDroneIds" />
    <div class="dashboard">
      <SessionSelector
        :sessions="sessions"
        :selectedSessionIndex="selectedSessionIndex"
        :isDetecting="isDetecting"
        @update:selectedSessionIndex="selectedSessionIndex = $event"
        @load-session-data="loadSessionData"
      />
      <div class="row-container">
        <DataTable :detections="filteredDetections" :isDetecting="isDetecting" />
        <DroneStatistics :detections="filteredDetections" :messageCount="currentMessageCount" :isDetecting="isDetecting" />
      </div>
      <div class="row-container" v-if="!clearing">
        <AllRssiHistogram  :rssiAllData="currentAllRssiData" :isDetecting="isDetecting"/>
        <PerDroneHistogram :rssiDataByDroneId="currentByDroneIdRssiData" :isDetecting="isDetecting"/>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue';
import AllRssiHistogram from './components/AllRssiHistogram.vue';
import PerDroneHistogram from './components/PerDroneHistogram.vue';
import DroneStatistics from './components/DroneStatistics.vue';
import SessionSelector from './components/SessionSelector.vue';
import ControlPanel from './components/ControlPanel.vue';
import { generateDetections, stopDetections } from './droneSimulator';
import { processDetections } from './utils/detectionUtils';
import { loadDetectionsFromLocalStorage, saveSessionData, initializeNewSession, clearSessionData } from './utils/sessionUtils';
import getInitialData from './utils/appData'; // initial data
import getComputedProperties from './utils/appComputed'; // computed properties

export default {
  components: { DataTable, AllRssiHistogram, PerDroneHistogram, DroneStatistics, SessionSelector, ControlPanel },
  
  data() {
    return getInitialData();
  },

  computed: getComputedProperties(),

  mounted() {
    this.sessions = loadDetectionsFromLocalStorage(); // Load sessions from local storage on mount
  },

  methods: {
    simulateDetections() {
      this.messageCount++; // Increment message count
      const message = generateDetections(); // Generate a new detection message
      const { allDetections, rssiDataByDroneId, rssiAllData, currentActiveIds } = processDetections(
        message,
        this.allDetections,
        this.rssiDataByDroneId,
        this.rssiAllData
      );
      // Update data properties to trigger reactivity
      this.allDetections = allDetections;
      this.rssiDataByDroneId = rssiDataByDroneId;
      this.rssiAllData = rssiAllData;
      this.activeDroneIds = currentActiveIds;
      this.detections = this.allDetections.filter(d => !d.end_time); // Filter active detections
    },
    toggleDetection() {
      if (this.isDetecting) {
        clearInterval(this.DetectionInterval); // Stop detection interval
        stopDetections(); // Stop detection logic
        this.DetectionInterval = null;

        const now = Math.floor(Date.now() / 1000);
        this.allDetections.forEach(detection => {
          if (!detection.end_time) {
            detection.end_time = now; // Mark end time for active detections
          }
        });
        // Save current session data
        this.sessions[0] = {
          ...this.sessions[0],
          detections: this.allDetections,
          rssiDataByDroneId: this.rssiDataByDroneId,
          rssiAllData: this.rssiAllData,
          messageCount: this.messageCount
        };
        saveSessionData(this.sessions); // Persist session data

        Object.assign(this, clearSessionData()); // Clear session-specific data

        this.selectedSessionIndex = 1; // most recent session is at index 1, so we start from 1
      } else {
        const newSession = initializeNewSession();
        this.sessions.unshift(newSession); // Add the new session to the beginning
        if (this.sessions.length > 10) {
          this.sessions.pop(); // Maintain a maximum of 10 sessions
        }
        saveSessionData(this.sessions);

        Object.assign(this, clearSessionData());
        this.simulateDetections(); // Start detection simulation
        this.DetectionInterval = setInterval(this.simulateDetections, 3000); // Set interval for detection
      }
      this.isDetecting = !this.isDetecting; // Toggle detection state
    },
    loadSessionData() {
      const session = this.sessions[this.selectedSessionIndex];
      this.detections = session ? session.detections : []; // Load detections for selected session
    },
    clearData() {
      Object.assign(this, clearSessionData()); // Clear all session data
      this.sessions = [];
      this.rssiDataByDroneId = []; // Clear RSSI data by drone ID
      this.rssiAllData = []; // Clear all RSSI data
      this.detections = []; // Clear detections
      this.clearing = true;
      setTimeout(() => {
        this.clearing = false;
      }, 100);
      localStorage.removeItem('sessions'); // Remove sessions from local storage
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding-top: 50px;
  font-family: 'Inter', sans-serif;
}
.dashboard {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .row-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
}
</style>
