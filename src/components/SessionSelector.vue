<template>
  <div v-if="!isDetecting" class="session-selector">
    <label for="sessionSelect" class="session-label">Select Session:</label>
    <select id="sessionSelect" :value="selectedSessionIndex" @change="updateSessionIndex" class="session-dropdown">
      <option value="0">View All</option>
      <option v-for="(session, index) in sessions" :key="index" :value="index + 1">
        Session {{ sessions.length - index }} - {{ session.timestamp }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['sessions', 'selectedSessionIndex', 'isDetecting'],
  methods: {
    updateSessionIndex(event) {
      const newIndex = parseInt(event.target.value, 10);
      this.$emit('update:selectedSessionIndex', newIndex);
      this.$emit('load-session-data');
    }
  }
}
</script>

<style scoped>
.session-selector {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
}

.session-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.session-dropdown {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.session-dropdown:focus {
  border-color: #007bff;
  outline: none;
}
</style>
