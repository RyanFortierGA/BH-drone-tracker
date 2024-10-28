<template>
  <div class="control-panel">
    <button @click="toggleDetection" class="control-button">
      <font-awesome-icon :icon="isDetecting ? 'stop' : 'play'" />
      <span :class="isDetecting ? 'detecting-animation' : 'static-circle'"></span>
    </button>
    <span class="session-timer">{{ formattedSessionTimer }}</span>
    <button @click="$emit('clear-data')" class="clear-button">
      <span>Clear Data</span> <font-awesome-icon icon="trash" />
    </button>
  </div>
</template>

<script>
export default {
  props: ['isDetecting', 'activeDroneIds'],
  data() {
    return {
      sessionTimer: 0,
      timerInterval: null
    }
  },
  computed: {
    formattedSessionTimer() {
      return this.formatTime(this.sessionTimer);
    }
  },
  watch: {
    isDetecting(newVal) {
      if (newVal) {
        this.startTimer();
      } else {
        this.stopTimer();
        this.sessionTimer = 0;
      }
    }
  },
  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    startTimer() {
      if (!this.timerInterval) {
        this.timerInterval = setInterval(() => {
          this.sessionTimer++;
        }, 1000);
      }
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    },
    toggleDetection() {
      this.$emit('toggle-detection');
    }
  },
  beforeUnmount() {
    this.stopTimer();
  }
}
</script>

<style lang="scss">
.control-panel {
  position: fixed;
  top: 0;
  width: 98%;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.control-button, .clear-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-button:hover, .clear-button:hover {
  color: #ffcc00;
}

.static-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border: 2px solid #ffcc00;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.detecting-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top: 4px solid #ffcc00;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
  transform: translate(-50%, -50%);
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.session-timer {
  font-size: 1.2em;
  margin: 0 20px;
  position: relative;
  left: 4%;
}
</style>