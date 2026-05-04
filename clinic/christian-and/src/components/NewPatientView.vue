<template>
  <div>
    <h1><i class="fa-solid fa-user-plus"></i> Register New Patient</h1>
    <p class="subtitle">Complete the form below to register a new patient</p>
    
    <div class="form-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
      </div>
      
      <div class="section">
        <h3><i class="fa-regular fa-user"></i> Personal Information</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Full Name *</label>
            <input v-model="formData.fullName" placeholder="Enter full name">
          </div>
          <div class="form-group">
            <label>National ID *</label>
            <input v-model="formData.nationalID" placeholder="National ID number">
            <small v-if="nationalIdError" class="error">{{ nationalIdError }}</small>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Date of Birth</label>
            <input type="date" v-model="formData.dob">
          </div>
          <div class="form-group">
            <label>Gender *</label>
            <select v-model="formData.gender">
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h3><i class="fa-solid fa-phone"></i> Contact Information</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Phone Number *</label>
            <input v-model="formData.phone" placeholder="+250 788 xxx xxx">
          </div>
          <div class="form-group">
            <label>Address</label>
            <input v-model="formData.address" placeholder="Village, district">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Emergency Contact Name</label>
            <input v-model="formData.emergencyContact" placeholder="Contact person">
          </div>
        </div>
      </div>
      
      <div class="section">
        <h3><i class="fa-solid fa-stethoscope"></i> Symptoms (Select all that apply)</h3>
        <div class="symptoms-group">
          <label v-for="symptom in store.symptomOptions" :key="symptom" class="checkbox-label">
            <input type="checkbox" :value="symptom" v-model="formData.symptoms"> {{ symptom }}
          </label>
        </div>
      </div>
      
      <div class="form-actions">
        <button class="btn-primary" @click="submitForm">✅ Register Patient</button>
        <button class="btn-secondary" @click="cancelForm">❌ Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useClinicStore } from '../stores/clinicStore'

const store = useClinicStore()
const emit = defineEmits(['navigate'])

const formData = reactive({
  fullName: '',
  nationalID: '',
  dob: '',
  gender: 'Female',
  phone: '',
  address: '',
  symptoms: [],
  emergencyContact: ''
})

const nationalIdError = computed(() => {
  if (formData.nationalID && formData.nationalID.length < 6) {
    return 'National ID must be at least 6 characters'
  }
  return ''
})

const progressWidth = computed(() => {
  let filled = 0
  if (formData.fullName) filled += 20
  if (formData.nationalID && formData.nationalID.length >= 6) filled += 20
  if (formData.phone) filled += 20
  if (formData.dob) filled += 10
  if (formData.address) filled += 10
  if (formData.symptoms.length > 0) filled += 20
  return Math.min(filled, 100)
})

const submitForm = () => {
  const success = store.addNewPatient({ ...formData })
  if (success) {
    emit('navigate', 'queue')
  }
}

const cancelForm = () => {
  store.cancelRegistration()
  emit('navigate', 'dashboard')
}
</script>

<style scoped>
h1 { color: #1f3b4c; margin-bottom: 10px; }
.subtitle { color: #666; margin-bottom: 30px; }
.form-container { background: white; border-radius: 20px; padding: 30px; max-width: 800px; margin: 0 auto; }
.progress-bar { height: 8px; background: #e0e0e0; border-radius: 10px; margin-bottom: 30px; overflow: hidden; }
.progress-fill { height: 100%; background: #0fb14a; border-radius: 10px; transition: width 0.3s ease; }
.section { margin-bottom: 30px; }
.section h3 { color: #4a86c5; margin-bottom: 20px; font-size: 18px; }
.form-row { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
.form-group { flex: 1; min-width: 200px; }
label { display: block; margin-bottom: 8px; font-weight: 600; color: #333; }
input, select { width: 100%; padding: 10px 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
input:focus, select:focus { outline: none; border-color: #0fb14a; }
.error { color: #dc3545; font-size: 12px; margin-top: 5px; display: block; }
.symptoms-group { display: flex; flex-wrap: wrap; gap: 15px; }
.checkbox-label { display: flex; align-items: center; gap: 8px; font-weight: normal; cursor: pointer; }
.form-actions { display: flex; gap: 15px; margin-top: 20px; }
.btn-primary, .btn-secondary { padding: 12px 25px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; }
.btn-primary { background: #0fb14a; color: white; }
.btn-primary:hover { background: #0c8f3c; }
.btn-secondary { background: #6c757d; color: white; }
.btn-secondary:hover { background: #5a6268; }
</style>