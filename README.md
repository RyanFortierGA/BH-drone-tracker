# Drone Detection UI

This project is a Vue 3 application designed to simulate and visualize drone detection data. It includes a drone simulator script for generating data and a user interface for displaying and interacting with this data.

## Table of Contents

- [Project Setup](#project-setup)
- [Running the Drone Simulator](#running-the-drone-simulator)
- [Running the UI](#running-the-ui)
- [Features](#features)
- [UI Controls](#ui-controls)
- [Scripts](#scripts)

## Project Setup

To get started with the project, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/yourusername/drone-detection-ui.git
cd drone-detection-ui
npm install
```

## Running the Drone Simulator

The drone simulator is a script located in the `dronesimulator` directory. It generates simulated drone data for testing and development purposes.

### Task 1: Running the Simulator

The UI is a Vue 3 application that visualizes the drone data generated by the simulator.

1. Start the development server:

   ```bash
   npm run serve
   ```

2. Open your browser and go to `http://localhost:8080` to view the application.

3. Click on the "Play" button to begin the simulation.

## Features

- Created a session based tracking system, that allows you to track multiple detection sessions and switch between them to view the data.
- when you click the start button, a new session is created, and the UI will automatically react to incoming data from the simulator.
- Displays active detections in a table, while the simulation is running.
- Displays a table of all detections for a session, when the simulation has been stopped.
- A bonus feature to this table is it is searchable and sortable.
- Displays a statistics section, that shows the top classifications, Bands, and number of messages received in a session.
- Displays a histogram on the left for all RSSI values, both active during simulation and all time.
- Displays a histogram on the right for the currently selected drones RSSI values, both active during simulation and all time.
- instead of clicking a session you can also view by all time which is a combined view of all sessions, by selecting the "view all" option in the session selector.
- Iniated tests for the drone simulator, to ensure it is working as expected, using the mocha test framework. *as a note here I would like to add some more tests, if i had more time, like a full cypress test suite for the UI, but this is a good start.*
## UI Controls

- **Play/Pause**: Start or stop the simulation.
- **Stop**: Stop the simulation immediately.
- **Clear**: Clear the detections data and resets the UI.
- **Session Selector**: Choose a session to display.

## Scripts

- **`npm run serve`**: Compiles and hot-reloads the project for development.
- **`npm run build`**: Compiles and minifies the project for production.
- **`npm run lint`**: Lints and fixes files.
- **`npm run test`**: Runs the test suite.
