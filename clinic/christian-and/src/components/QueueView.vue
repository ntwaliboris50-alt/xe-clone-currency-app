<template>
  <div>
    <h1><i class="fa-solid fa-list"></i> Today's Queue Management</h1>
    <p class="subtitle">Manage patient flow and update status</p>
    
    <div class="stats-cards">
      <div class="stat"><span class="stat-label">Total</span><span class="stat-value">{{ store.totalPatientsToday }}</span></div>
      <div class="stat"><span class="stat-label">Waiting</span><span class="stat-value">{{ store.waitingCount }}</span></div>
      <div class="stat"><span class="stat-label">In Progress</span><span class="stat-value">{{ store.progressCount }}</span></div>
      <div class="stat"><span class="stat-label">Completed</span><span class="stat-value">{{ store.completedCount }}</span></div>
    </div>
    
    <div class="queue-table-container">
      <table class="queue-table">
        <thead><tr><th># Queue</th><th>Patient Name</th><th>Phone</th><th>Symptoms</th><th>Check-in Time</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          <tr v-for="patient in sortedPatients" :key="patient.id">
            <td><span class="queue-number">#{{ patient.queueNumber }}</span></td>
            <td><strong>{{ patient.fullName }}</strong></td>
            <td>{{ patient.phone }}</td>
            <td><small>{{ patient.symptoms?.join(', ') || 'None' }}</small></td>
            <td>{{ patient.checkinTime || '--' }}</td>
            <td><span class="status" :class="getStatusClass(patient.status)">{{ patient.status }}</span></td>
            <td>
              <button v-if="patient.status === 'Waiting'" class="action-btn start" @click="updateStatus(patient.id, 'In Progress')">Start</button>
              <button v-if="patient.status === 'In Progress'" class="action-btn complete" @click="updateStatus(patient.id, 'Completed')">Complete</button>
              <span v-if="patient.status === 'Completed'" class="done-icon"><i class="fa-solid fa-check-circle"></i> Done</span>
            </td>
          </tr>
          <tr v-if="store.patientsList.length === 0"><td colspan="7" style="text-align: center; padding: 40px;">No patients in queue today</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useClinicStore } from '../stores/clinicStore'

const store = useClinicStore()
const sortedPatients = computed(() => [...store.patientsList].sort((a, b) => a.queueNumber - b.queueNumber))
const getStatusClass = (status) => {
  switch(status) {
    case 'Waiting': return 'status-waiting'
    case 'In Progress': return 'status-progress'
    case 'Completed': return 'status-completed'
    default: return ''
  }
}
const updateStatus = (patientId, newStatus) => { store.updatePatientStatus(patientId, newStatus) }
</script>

<style scoped>
h1 { color: #1f3b4c; }
.subtitle { color: #666; margin-bottom: 30px; }
.stats-cards { display: flex; gap: 20px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap; }
.stat { background: white; padding: 15px 30px; border-radius: 15px; text-align: center; min-width: 100px; }
.stat-label { display: block; font-size: 14px; color: #666; margin-bottom: 5px; }
.stat-value { font-size: 32px; font-weight: bold; color: #0fb14a; }
.queue-table-container { background: white; border-radius: 20px; overflow-x: auto; padding: 20px; }
.queue-table { width: 100%; border-collapse: collapse; }
.queue-table th { text-align: left; padding: 12px; background: #f8f9fc; color: #555; font-weight: 600; }
.queue-table td { padding: 12px; border-bottom: 1px solid #eee; }
.queue-number { background: #e2e8f0; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; display: inline-block; }
.status { padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; color: white; }
.status-waiting { background: #f0b429; }
.status-progress { background: #3182ce; }
.status-completed { background: #38a169; }
.action-btn { padding: 5px 12px; border: none; border-radius: 15px; cursor: pointer; font-size: 12px; font-weight: bold; }
.action-btn.start { background: #3182ce; color: white; }
.action-btn.complete { background: #38a169; color: white; }
.done-icon { color: #38a169; font-weight: bold; }
</style>