import { expect } from 'chai';
import { generateDetections } from '../src/droneSimulator.js';

describe('Drone Detection Simulator', function() {
  it('should generate a message with correct structure', function() {
    const message = generateDetections();
    
    expect(message).to.have.property('msg_type', 'detections');
    expect(message).to.have.property('system', 'detection_service');
    expect(message).to.have.property('msg_id').that.is.a('string').with.lengthOf(8);
    expect(message).to.have.property('detections').that.is.an('array');
    expect(message).to.have.property('timestamp').that.is.a('number');
  });

  it('should generate detections with correct properties', function() {
    const message = generateDetections();
    const detection = message.detections[0];

    expect(detection).to.have.property('drone_id').that.is.a('string').with.lengthOf(8);
    expect(detection).to.have.property('start_time').that.is.a('number');
    expect(detection).to.have.property('band').that.is.oneOf(['2.4GHz', '5.8GHz']);
    expect(detection).to.have.property('classification').that.is.oneOf(['OcuSync', 'Lightbridge']);
    expect(detection).to.have.property('rssi').that.is.a('number').within(-110, -65);
  });

  it('should maintain 80% of drones between messages', function() {
    const initialMessage = generateDetections();
    const initialDroneIds = initialMessage.detections.map(d => d.drone_id);

    const subsequentMessage = generateDetections();
    const subsequentDroneIds = subsequentMessage.detections.map(d => d.drone_id);

    const retainedDrones = initialDroneIds.filter(id => subsequentDroneIds.includes(id));
    expect(retainedDrones.length).to.be.at.least(Math.floor(initialDroneIds.length * 0.8));
  });
});
