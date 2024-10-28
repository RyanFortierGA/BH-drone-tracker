import { expect } from 'chai';
import { processDetections } from '../src/utils/detectionUtils.js';

describe('Detection Utils', function() {
  it('should process detections and update the state correctly', function() {
    const initialDetections = [];
    const initialRssiDataByDroneId = [];
    const initialRssiAllData = [];
    const message = {
      detections: [
        { drone_id: 'abcd1234', start_time: 1620000000, band: '2.4GHz', classification: 'OcuSync', rssi: -80 }
      ]
    };

    const { allDetections, rssiDataByDroneId, rssiAllData, currentActiveIds } = processDetections(
      message,
      initialDetections,
      initialRssiDataByDroneId,
      initialRssiAllData
    );

    expect(allDetections).to.have.lengthOf(1);
    expect(rssiDataByDroneId).to.have.lengthOf(1);
    expect(rssiAllData).to.have.lengthOf(1);
    expect(currentActiveIds).to.include('abcd1234');
  });
});
