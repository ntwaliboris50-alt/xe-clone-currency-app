<template>
  <div>
    <h1><i class="fa-solid fa-repeat"></i> Returning Patient Check-in</h1>
    <p class="subtitle">Quick check-in for existing patients</p>
    
    <div class="search-container">
      <div class="search-box">
        <i class="fa-solid fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search by name or phone number..." class="search-input">
      </div>
      
      <div v-for="patient in filteredPatients" :key="patient.id" class="patient-card">
        <div class="patient-info">
          <div class="avatar">{{ getInitials(patient.fullName) }}</div>
          <div class="details">
            <h4>{{ patient.fullName }}</h4>
            <small>📞 {{ patient.phone }} | 📍 {{ patient.address }}</small><br>
            <small>DOB: {{ patient.dob }} | Gender: {{ patient.gender }}</small>
          </div>
        </div>
        <button class="select-btn" @click="checkinPatient(patient)">Select →</button>
      </div>
      
      <div v-if="filteredPatients.length === 0 && searchQuery" class="no-results">
        <i class="fa-solid fa-user-slash"></i>
        <p>No matching patients found. Please register as new patient.</p>
        <button class="btn-primary" @click="$emit('navigate', 'newpatient')">Register New Patient</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useClinicStore } from '../stores/clinicStore'

const store = useClinicStore()
const emit = defineEmits(['navigate'])
const searchQuery = ref('')

const filteredPatients = computed(() => {
  if (!searchQuery.value) return store.patientsList.slice(0, 5)
  const query = searchQuery.value.toLowerCase()
  return store.patientsList.filter(p => 
    p.fullName.toLowerCase().includes(query) || 
    p.phone.includes(query)
  )
})

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const checkinPatient = (patient) => {
  store.checkinReturningPatient(patient)
  emit('navigate', 'queue')
}
</script>

<style scoped>
h1 { color: #1f3b4c; }
.subtitle { color: #666; margin-bottom: 30px; }
.search-container { max-width: 700px; margin: 0 auto; }
.search-box { background: white; border-radius: 50px; padding: 5px 20px; display: flex; align-items: center; gap: 15px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.search-box i { color: #999; }
.search-input { flex: 1; padding: 15px; border: none; font-size: 16px; }
.search-input:focus { outline: none; }
.patient-card { background: white; border-radius: 15px; padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; transition: transform 0.2s; }
.patient-card:hover { transform: translateX(5px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.patient-info { display: flex; align-items: center; gap: 15px; }
.avatar { width: 60px; height: 60px; background: #7bbf42; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; }
.details h4 { margin: 0 0 5px 0; color: #333; }
.details small { color: #666; font-size: 12px; }
.select-btn { background: #0fb14a; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold; }
.select-btn:hover { background: #0c8f3c; }
.no-results { text-align: center; padding: 50px; background: white; border-radius: 20px; }
.no-results i { font-size: 48px; color: #999; margin-bottom: 15px; }
.btn-primary { margin-top: 15px; padding: 10px 25px; background: #0fb14a; color: white; border: none; border-radius: 25px; cursor: pointer; }
</style>