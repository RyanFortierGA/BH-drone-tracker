<template>
  <div class="statistics-container"> 
    <h2>{{isDetecting ? "Active Drone Statistics" : "All Detections Statistics"}}</h2>
    <div class="trackingBoard">
      <div class="trackingBoard-section">
        <table>
          <thead>
            <tr>
              <th>Band</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(band, index) in sortedBandCounts" :key="index">
              <td>{{ band.name }}</td>
              <td>{{ band.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="trackingBoard-section">
        <table>
          <thead>
            <tr>
              <th>Classification</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(classification, index) in sortedClassificationCounts" :key="index">
              <td>{{ classification.name }}</td>
              <td>{{ classification.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p>Total Messages Received: {{ messageCount }}</p>
  </div>
</template>

<script>
export default {
  props: ['detections', 'messageCount', 'isDetecting'],
  computed: {
    uniqueDetections() {
      const unique = {};
      this.detections.forEach(detection => {
        if (!unique[detection.drone_id]) {
          unique[detection.drone_id] = detection;
        }
      });
      return Object.values(unique);
    },
    bandCounts() {
      const counts = {};
      this.uniqueDetections.forEach(detection => {
        counts[detection.band] = (counts[detection.band] || 0) + 1;
      });
      return counts;
    },
    classificationCounts() {
      const counts = {};
      this.uniqueDetections.forEach(detection => {
        counts[detection.classification] = (counts[detection.classification] || 0) + 1;
      });
      return counts;
    },
    sortedBandCounts() {
      return Object.entries(this.bandCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    },
    sortedClassificationCounts() {
      return Object.entries(this.classificationCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    },
  }
}
</script>

<style lang="scss">
.statistics-container {
  width: 100%;
  .trackingBoard {
    display: flex;
    flex-direction: row;
    gap: 20px;
    h3{
      margin-top: 0px;
    }
  }
  .trackingBoard-section {
    width: 45%;
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