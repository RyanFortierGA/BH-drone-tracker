//task 1 create a script that generates random detection messages

import { v4 as uuidv4 } from 'uuid';
// Function to generate a random string of 8 characters
function generateRandomString() {
	let randomString = uuidv4().slice(0, 8);
	randomString = randomString.split('').map(char => {
		return Math.random() > 0.5 ? char.toUpperCase() : char;
	}).join('');
	return randomString;
}

// Function to generate a random RSSI value
function generateRandomRSSI(previousRSSI = null) {
	const minRSSI = -110;
	const maxRSSI = -65;
	const variation = 5;

	let newRSSI;
	if (previousRSSI !== null) {
		newRSSI = previousRSSI + (Math.random() * 2 * variation - variation);
	} else {
		newRSSI = Math.random() * (maxRSSI - minRSSI) + minRSSI;
	}

	newRSSI = Math.max(minRSSI, Math.min(maxRSSI, newRSSI));
	return parseFloat(newRSSI.toPrecision(4));
}

// Store active drones
let activeDrones = [];

// Function to generate detection messages
function generateDetections() {
	const timestamp = Math.floor(Date.now() / 1000);

	// Update active drones with 80% persistence
	activeDrones = activeDrones.filter(() => Math.random() < 0.8);
	// Add new drones to maintain a minimum number of detections between 2 & 5, if desired is always 2 like example remove the random function and set to targetDroneCount = 3
	const targetDroneCount = Math.floor(Math.random() * 4) + 2;
	
	while (activeDrones.length < targetDroneCount) {
		const droneId = generateRandomString();
		const startTime = timestamp;
		const band = Math.random() > 0.5 ? '2.4GHz' : '5.8GHz'; // 50% chance of each band
		const classification = Math.random() > 0.5 ? 'OcuSync' : 'Lightbridge'; // 50% chance of each classification
		const rssi = generateRandomRSSI();

		activeDrones.push({
			drone_id: droneId,
			start_time: startTime,
			band,
			classification,
			rssi,
		});
	}

	// Update RSSI for active drones
	activeDrones = activeDrones.map(drone => ({
		...drone,
		rssi: generateRandomRSSI(drone.rssi),
	}));

	return {
		msg_type: 'detections',
		system: 'detection_service',
		msg_id: generateRandomString(),
		detections: activeDrones,
		timestamp,
	};
}
function stopDetections() {
	activeDrones = [];
}
export { generateDetections, stopDetections };