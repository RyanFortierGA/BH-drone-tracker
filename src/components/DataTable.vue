<template>
  <div class="table-container">
    <div class="table-header">
      <h2>{{ isDetecting ? 'Currently Active Detections Data' : 'All Detections Data' }}</h2>
      <input type="text" v-model="searchQuery" placeholder="Search..." />
    </div>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('drone_id')">Drone ID</th>
          <th @click="sortBy('start_time')">Start Time</th>
          <th @click="sortBy('band')">Band</th>
          <th @click="sortBy('classification')">Classification</th>
          <th @click="sortBy('rssi')">RSSI</th>
          <th @click="sortBy('duration')">Duration (s)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(detection, index) in filteredDetections" :key="detection.drone_id + '-' + index">
          <td>{{ detection.drone_id }}</td>
          <td>{{ detection.start_time }}</td>
          <td>{{ detection.band }}</td>
          <td>{{ detection.classification }}</td>
          <td>{{ detection.rssi }}</td>
          <td>{{ calculateDuration(detection.start_time, detection.end_time) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['detections', 'isDetecting'],
  data() {
    return {
      sortKey: '',
      sortAsc: true,
      intervalId: null,
      searchQuery: ''
    };
  },
  computed: {
    sortedDetections() {
      return [...this.detections].sort((a, b) => {
        if (this.sortKey) {
          const result = a[this.sortKey] > b[this.sortKey] ? 1 : -1;
          return this.sortAsc ? result : -result;
        }
        return 0;
      });
    },
    filteredDetections() {
      return this.sortedDetections.filter(detection => {
        return Object.values(detection).some(value =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  },
  methods: {
    calculateDuration(startTime, endTime) {
      const now = Math.floor(Date.now() / 1000);
      return (endTime || now) - startTime;
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.$forceUpdate(); // Force Vue to re-render to update durations
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // Clear the interval when the component is destroyed
  }
}
</script>

<style lang="scss">
.table-container {
  width: 100%;
  .table-header {
    display: flex;
    gap: 10px;
    align-items: center;
    input[type="text"] {
      margin-bottom: 10px;
      padding: 8px 12px;
      width: 250px;
      box-sizing: border-box;
      margin-left: auto;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s, box-shadow 0.3s;

      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
        outline: none;
      }
    }
  }
  table, td {
    border: 1px solid black;
  }
  th {
    width: 120px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  table {
      display: flex;
      flex-flow: column;
      width: 100%;
      max-height: 300px;
      
  }

  thead {
      padding-right: 13px;
      flex: 0 0 auto;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid black;
  }

  tbody {
      flex: 1 1 auto;
      display: block;
      overflow-y: auto;
      overflow-x: hidden;
  }

  tr {
      width: 100%;
      display: table;
      table-layout: fixed;
  }

}

</style>