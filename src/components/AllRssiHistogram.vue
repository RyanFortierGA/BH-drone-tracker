<template>
    <div class="chart-wrapper">
      <h3>{{isDetecting ? 'Active All RSSI Data (< 5 minutes)' : 'All RSSI Data'}}</h3>
      <div class="chart-block" v-if="overviewChartData">
        <BarChart :data="overviewChartData" :options="chartOptions" />
      </div>
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    components: {
      BarChart: Bar
    },
    props: ['rssiAllData', 'isDetecting'],
    data() {
      return {
        overviewChartData: null
      };
    },
    watch: {
      rssiAllData: {
        handler: 'processChartData',
        deep: true
      }
    },
    methods: {
      processChartData() {
        if (this.rssiAllData && this.rssiAllData.length > 0) {
          const overviewLabels = this.rssiAllData.map(({ drone_id }) => drone_id);
          const overviewData = this.rssiAllData.map(({ rssi }) => rssi);
  
          this.overviewChartData = {
            labels: overviewLabels,
            datasets: [{
              label: 'Overview RSSI',
              backgroundColor: '#42A5F5',
              data: overviewData
            }]
          };
        } else {
          this.overviewChartData = null;
        }
      }
    },
    mounted() {
      this.processChartData();
    },
    computed: {
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          animation: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Drone ID'
              }
            },
            y: {
              display: true,
              reverse: true,
              title: {
                display: true,
                text: 'RSSI'
              },
              ticks: {
                stepSize: 10
              }
            }
          }
        };
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .chart-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    .chart-block {
      height: 400px;
      overflow-y: auto;
    }
  }
  </style>