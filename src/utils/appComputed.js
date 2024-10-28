
export default function getComputedProperties() {
  return {
    filteredDetections() {
      if (this.isDetecting) {
        return this.detections;
      }
      if (this.selectedSessionIndex === 0) {
        // "View All" is selected
        return this.sessions.reduce((all, session) => all.concat(session.detections), []);
      }
      return this.sessions[this.selectedSessionIndex - 1]?.detections || [];
    },
    currentByDroneIdRssiData() {
      if (this.isDetecting) {
        const now = Math.floor(Date.now() / 1000);
        const fiveMinutesAgo = now - 300;
        return this.rssiDataByDroneId.filter(droneData => droneData.timestamp > fiveMinutesAgo);
      }
      if (this.selectedSessionIndex === 0) {
        // "View All" is selected
        const allRssiData = this.sessions.reduce((all, session) => all.concat(session.rssiDataByDroneId), []);
        const groupedByDroneId = {};

        allRssiData.forEach(drone => {
          if (!groupedByDroneId[drone.drone_id]) {
            groupedByDroneId[drone.drone_id] = { drone_id: drone.drone_id, rssiList: [] };
          }
          groupedByDroneId[drone.drone_id].rssiList.push(...drone.rssiList);
        });

        return Object.values(groupedByDroneId);
      }
      return this.sessions[this.selectedSessionIndex - 1]?.rssiDataByDroneId || [];
    },
    currentAllRssiData() {
      if (this.isDetecting) {
        const now = Math.floor(Date.now() / 1000);
        const fiveMinutesAgo = now - 300;
        return this.rssiAllData.filter(data => data.timestamp > fiveMinutesAgo);
      }
      if (this.selectedSessionIndex === 0) {
        // "View All" is selected
        return this.sessions.reduce((all, session) => all.concat(session.rssiAllData), []);
      }
      return this.sessions[this.selectedSessionIndex - 1]?.rssiAllData || [];
    },
    currentMessageCount() {
      if (this.isDetecting) {
        return this.messageCount;
      }
      if (this.selectedSessionIndex === 0) {
        // "View All" is selected
        return this.sessions.reduce((total, session) => total + session.messageCount, 0);
      }
      return this.sessions[this.selectedSessionIndex - 1]?.messageCount || 0;
    },
  };
}
