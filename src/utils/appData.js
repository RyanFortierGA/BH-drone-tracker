export default function getInitialData() {
    return {
      allDetections: [], // Stores all detections for the current session
      detections: [], // Active detections without an end time
      isDetecting: false, // Flag to indicate if detection is active
      DetectionInterval: null, // Interval ID for detection simulation
      activeDroneIds: [], // List of currently active drone IDs
      sessions: [{ name: "View All", detections: [], rssiDataByDroneId: [], rssiAllData: [], messageCount: 0 }], // Add "View All" option
      selectedSessionIndex: 0, // Index of the currently selected session
      rssiAllData: [], // RSSI data for all detections
      rssiDataByDroneId: [], // RSSI data grouped by drone ID
      messageCount: 0, // Count of messages processed,
      clearing: false // Flag to indicate if clearing is in progress
    };
  }