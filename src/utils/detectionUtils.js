// src/utils/detectionUtils.js
export function processDetections(message, allDetections, rssiDataByDroneId, rssiAllData) {
    const currentActiveIds = message.detections.map(d => d.drone_id);
    const now = Math.floor(Date.now() / 1000);
  
    // Update end_time for drones that are no longer active
    allDetections.forEach(detection => {
      if (!currentActiveIds.includes(detection.drone_id) && !detection.end_time) {
        detection.end_time = now;
      }
    });
  
    // Update or add new detections
    message.detections.forEach(detection => {
      const existingDetection = allDetections.find(d => d.drone_id === detection.drone_id && !d.end_time);
      if (existingDetection) {
        existingDetection.rssi = detection.rssi;
      } else {
        allDetections.push({
          ...detection,
          start_time: now
        });
      }
  
      const droneRssiData = rssiDataByDroneId.find(rssi => rssi.drone_id === detection.drone_id);
      if (!droneRssiData) {
        rssiDataByDroneId.push({
          drone_id: detection.drone_id,
          timestamp: detection.start_time,
          rssiList: [detection.rssi]
        });
      } else {
        droneRssiData.rssiList.push(detection.rssi);
      }
  
      rssiAllData.push({drone_id: detection.drone_id, rssi: detection.rssi, timestamp: detection.start_time});
    });
  
    return { allDetections, rssiDataByDroneId, rssiAllData, currentActiveIds };
  }

  export function groupRssiDataByDroneId(sessions) {
    const allRssiData = sessions.reduce((all, session) => all.concat(session.rssiDataByDroneId), []);
    const groupedByDroneId = {};
  
    allRssiData.forEach(drone => {
      if (!groupedByDroneId[drone.drone_id]) {
        groupedByDroneId[drone.drone_id] = { drone_id: drone.drone_id, rssiList: [] };
      }
      groupedByDroneId[drone.drone_id].rssiList.push(...drone.rssiList);
    });
  
    return Object.values(groupedByDroneId);
  }