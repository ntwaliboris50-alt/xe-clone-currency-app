<template>
  <div>
    <h1>Welcome to Rural Care</h1>
    <p>Digital Patient Check-in System</p>
    
    <div class="actions">
      <div class="card blue" @click="$emit('navigate', 'newpatient')">
        <i class="fa-solid fa-user-plus"></i>
        <p>Register New Patient</p>
      </div>
      <div class="card green" @click="$emit('navigate', 'returning')">
        <i class="fa-solid fa-user-check"></i>
        <p>Returning Patient Check-in</p>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <small>Total Patients</small>
        <h3>{{ store.totalPatientsToday }}</h3>
      </div>
      <div class="stat-card">
        <small>Waiting</small>
        <h3>{{ store.waitingCount }}</h3>
      </div>
      <div class="stat-card">
        <small>In Progress</small>
        <h3>{{ store.progressCount }}</h3>
      </div>
      <div class="stat-card">
        <small>Completed</small>
        <h3>{{ store.completedCount }}</h3>
      </div>
    </div>
    
    <div class="queue-preview">
      <h3>Current Queue Preview</h3>
      <div v-for="patient in store.patientsList.slice(0, 3)" :key="patient.id" class="queue-item">
        <span class="queue-badge">#{{ patient.queueNumber }}</span>
        <strong>{{ patient.fullName }}</strong>
        <span class="status-badge" :class="patient.status.toLowerCase().replace(' ', '-')">{{ patient.status }}</span>
      </div>
      <button class="btn-outline" @click="$emit('navigate', 'queue')">View Full Queue →</button>
    </div>
  </div>
</template>

<script setup>
import { useClinicStore } from '../stores/clinicStore'

const store = useClinicStore()
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #1f3b4c;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 40px 0;
}

.card {
  width: 220px;
  padding: 30px;
  border-radius: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card.blue {
  background: #4a86c5;
}

.card.green {
  background: #0fb14a;
}

.card i {
  font-size: 45px;
  margin-bottom: 15px;
}

.stats-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.stat-card {
  background: white;
  padding: 15px 25px;
  border-radius: 15px;
  text-align: center;
  min-width: 100px;
}

.stat-card h3 {
  font-size: 28px;
  margin-top: 5px;
  color: #0fb14a;
}

.queue-preview {
  background: white;
  border-radius: 20px;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.queue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.queue-badge {
  background: #7b3fe4;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.waiting {
  background: #f0b429;
  color: white;
}

.status-badge.in-progress {
  background: #3182ce;
  color: white;
}

.btn-outline {
  margin-top: 15px;
  padding: 10px 25px;
  background: white;
  border: 2px solid #0fb14a;
  color: #0fb14a;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}

.btn-outline:hover {
  background: #0fb14a;
  color: white;
}
</style>