// src/utils/sessionUtils.js

export function loadDetectionsFromLocalStorage() {
    const savedSessions = localStorage.getItem('sessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  }
  
  export function saveSessionData(sessions) {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }
  
  export function initializeNewSession() {
    return {
      timestamp: new Date().toLocaleString(),
      detections: [],
      allDetections: [],
      activeDroneIds: [],
      rssiDataByDroneId: [],
      rssiAllData: [],
      messageCount: 0
    };
  }
  
  export function clearSessionData() {
    return {
      allDetections: [],
      activeDroneIds: [],
      detections: [],
      rssiAllData: [],
      rssiDataByDroneId: [],
      messageCount: 0
    };
  }