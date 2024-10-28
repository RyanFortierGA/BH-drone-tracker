import { groupRssiDataByDroneId } from './detectionUtils';

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
        return this.rssiDataByDroneId;
      }
      if (this.selectedSessionIndex === 0) {
        // "View All" is selected
        return groupRssiDataByDroneId(this.sessions);
      }
      return this.sessions[this.selectedSessionIndex - 1]?.rssiDataByDroneId || [];
    },
    currentAllRssiData() {
      if (this.isDetecting) {
        return this.rssiAllData;
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