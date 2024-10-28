<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <h3>{{isDetecting ? 'Active Per Drone Data (< 5 minutes)' : 'Per Drone Data'}}</h3>
      <div v-if="rssiDataByDroneId && rssiDataByDroneId.length > 0">
        <label for="droneSelect">Select Drone ID: </label>
        <select id="droneSelect" v-model="selectedDroneId" @change="updateSelectedDroneChart" class="drone-dropdown">
          <option v-for="drone in rssiDataByDroneId" :key="drone.drone_id" :value="drone.drone_id">
            {{ drone.drone_id }}
          </option>
        </select>
      </div>
    </div>
    <div class="chart-block" v-if="selectedDroneChartData">
      <BarChart :data="selectedDroneChartData" :options="chartOptions" />
    </div>
    <div class="chart-block" v-else-if="!selectedDroneChartData && isDetecting">
      <div class="loader-container">
        <div class="loader"></div>
        <p>Loading...</p>
      </div>
    </div>
    <div class="chart-block" v-else>
      <span>Please select a drone Id from the dropdown</span>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  components: {
    BarChart: Bar
  },
  props: ['rssiDataByDroneId', 'isDetecting'],
  data() {
    return {
      selectedDroneId: null,
      selectedDroneChartData: null
    };
  },
  watch: {
    rssiDataByDroneId: {
      handler: 'processChartData',
      deep: true
    },
    isDetecting: {
      handler: 'changeSelectedDrone',
      deep: true
    }
  },
  methods: {
    processChartData() {
      if (this.rssiDataByDroneId && this.rssiDataByDroneId.length > 0) {
        if (!this.selectedDroneId) {
          this.selectedDroneId = this.rssiDataByDroneId[0].drone_id;
        }
        this.updateSelectedDroneChart();
      }
    },
    updateSelectedDroneChart() {
      console.log('Updating selected drone chart');
      const selectedDrone = this.rssiDataByDroneId.find(drone => drone.drone_id === this.selectedDroneId);
      if (selectedDrone) {
        const rssiList = [...selectedDrone.rssiList];
        this.selectedDroneChartData = {
          labels: rssiList.map((_, index) => `Entry ${index + 1}`),
          datasets: [{
            label: `RSSI for ${selectedDrone.drone_id}`,
            backgroundColor: '#66BB6A',
            data: rssiList
          }]
        };
      } else {
        this.selectedDroneChartData = null;
      }
    },
    changeSelectedDrone() {
      if(this.rssiDataByDroneId && this.rssiDataByDroneId.length > 0){
          console.log('Changing selected drone');
          setTimeout(() => {
              this.selectedDroneId = this.rssiDataByDroneId[0].drone_id;
          }, 200);
      }
    }
  },
  mounted() {
      if(this.rssiDataByDroneId && this.rssiDataByDroneId.length > 0){
          this.selectedDroneId = this.rssiDataByDroneId[0].drone_id;
      }
      this.processChartData();
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        animation: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Entry #'
            }
          },
          y: {
            display: true,
            reverse: true,
            title: {
              display: true,
              text: 'RSSI'
            },
            ticks: {
              stepSize: 10
            }
          }
        }
      };
    }
  }
}
</script>

<style scoped lang="scss">
.chart-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  .chart-block {
    height: 300px;
    overflow-y: auto;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #66BB6A;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .chart-header {
    display: flex;
    align-items: center;
    width: 100%;
    div:has(select) {
      margin-left: auto;
    }
  }
}

.drone-dropdown {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.drone-dropdown:focus {
  border-color: #007bff;
  outline: none;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
</style>
