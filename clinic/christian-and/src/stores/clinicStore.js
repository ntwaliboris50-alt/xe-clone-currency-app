import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useClinicStore = defineStore('clinic', () => {
  // ========== REACTIVE STATE VARIABLES ==========
  const patientsList = ref([
    { 
      id: 1, 
      queueNumber: 3, 
      fullName: 'Grace Mukamana', 
      nationalID: '1198205151234', 
      dob: '1982-05-15', 
      gender: 'Female', 
      phone: '+250788123456', 
      address: 'Rwamagana Village', 
      symptoms: ['Fever', 'Headache'], 
      emergencyContact: 'John 0788...', 
      status: 'In Progress',
      checkinTime: '07:15 AM'
    },
    { 
      id: 2, 
      queueNumber: 4, 
      fullName: 'Jean Niyonzima', 
      nationalID: '1197508225678', 
      dob: '1975-08-22', 
      gender: 'Male', 
      phone: '+250788234567', 
      address: 'Kayonza District', 
      symptoms: ['Cough'], 
      emergencyContact: 'Marie 078..', 
      status: 'Waiting',
      checkinTime: '08:30 AM'
    },
    { 
      id: 3, 
      queueNumber: 5, 
      fullName: 'Marie Uwimana', 
      nationalID: '1199012039876', 
      dob: '1990-12-03', 
      gender: 'Female', 
      phone: '+250788345678', 
      address: 'Rusumo Sector', 
      symptoms: ['Malaria', 'Fatigue'], 
      emergencyContact: 'Pascal 078..', 
      status: 'Waiting',
      checkinTime: '09:00 AM'
    }
  ])
  
  let nextQueueId = 6
  const isRegistered = ref(false)
  const currentQueueNumber = ref(null)
  const alertMessage = ref('')
  const alertType = ref('success')
  
  const clinicSettings = ref({
    name: 'RuralCare Health Clinic',
    soundAlerts: true,
    theme: 'Light Mode'
  })
  
  const symptomOptions = ref([
    'Fever', 'Cough', 'Headache', 'Fatigue', 
    'Malaria', 'Shortness of breath', 'Body aches', 'Nausea'
  ])
  
  // ========== COMPUTED PROPERTIES ==========
  const waitingCount = computed(() => patientsList.value.filter(p => p.status === 'Waiting').length)
  const progressCount = computed(() => patientsList.value.filter(p => p.status === 'In Progress').length)
  const completedCount = computed(() => patientsList.value.filter(p => p.status === 'Completed').length)
  const totalPatientsToday = computed(() => patientsList.value.length)
  const avgWaitTime = computed(() => {
    if (patientsList.value.length === 0) return 0
    let total = patientsList.value.reduce((acc, p) => acc + (p.queueNumber % 10 + 5), 0)
    return Math.floor(total / patientsList.value.length)
  })
  
  const symptomStats = computed(() => {
    const stats = {}
    patientsList.value.forEach(p => {
      if (p.symptoms && p.symptoms.length) {
        p.symptoms.forEach(sym => { 
          stats[sym] = (stats[sym] || 0) + 1 
        })
      } else {
        stats['No Symptoms'] = (stats['No Symptoms'] || 0) + 1
      }
    })
    return stats
  })
  
  // ========== FUNCTIONS AND METHODS ==========
  const showAlert = (msg, type = 'success') => {
    alertMessage.value = msg
    alertType.value = type
    setTimeout(() => { alertMessage.value = '' }, 3500)
  }
  
  const addNewPatient = (patientData) => {
    if (!patientData.nationalID || patientData.nationalID.length < 6) {
      showAlert('Invalid National ID! Must be at least 6 characters.', 'failure')
      return false
    }
    
    if (!patientData.fullName.trim()) {
      showAlert('Full name is required!', 'failure')
      return false
    }
    
    if (!patientData.phone.trim()) {
      showAlert('Phone number is required!', 'failure')
      return false
    }
    
    const newId = Date.now()
    const queueNum = nextQueueId++
    
    const patientObj = {
      id: newId,
      queueNumber: queueNum,
      fullName: patientData.fullName,
      nationalID: patientData.nationalID,
      dob: patientData.dob || 'N/A',
      gender: patientData.gender,
      phone: patientData.phone,
      address: patientData.address || 'Rural area',
      symptoms: [...patientData.symptoms],
      emergencyContact: patientData.emergencyContact || '—',
      status: 'Waiting',
      checkinTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    patientsList.value.push(patientObj)
    isRegistered.value = true
    currentQueueNumber.value = queueNum
    
    showAlert(`✅ ${patientObj.fullName} registered successfully! Queue #${queueNum}`, 'success')
    return true
  }
  
  const checkinReturningPatient = (patient) => {
    const newQueueNumber = nextQueueId++
    const checkinEntry = {
      ...patient,
      id: Date.now() + Math.random(),
      queueNumber: newQueueNumber,
      status: 'Waiting',
      checkinTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      symptoms: patient.symptoms || ['General check']
    }
    patientsList.value.push(checkinEntry)
    isRegistered.value = true
    currentQueueNumber.value = newQueueNumber
    showAlert(`${patient.fullName} checked in! Queue #${newQueueNumber}`, 'success')
    return true
  }
  
  const updatePatientStatus = (patientId, newStatus) => {
    const patient = patientsList.value.find(p => p.id === patientId)
    if (patient) {
      const oldStatus = patient.status
      patient.status = newStatus
      
      if (newStatus === 'Completed') {
        showAlert(`🎉 Success! ${patient.fullName} has completed their visit!`, 'success')
      } else if (newStatus === 'In Progress' && oldStatus === 'Waiting') {
        showAlert(`👨‍⚕️ ${patient.fullName} is now in consultation`, 'success')
      } else {
        showAlert(`Status updated for ${patient.fullName} → ${newStatus}`, 'success')
      }
      return true
    }
    showAlert('Failed to update status', 'failure')
    return false
  }
  
  const cancelRegistration = () => {
    isRegistered.value = false
    currentQueueNumber.value = null
    showAlert('Registration cancelled', 'failure')
  }
  
  const saveSettings = (settings) => {
    clinicSettings.value = { ...settings }
    showAlert('Settings saved successfully!', 'success')
    if (settings.theme === 'Dark Mode') {
      document.body.style.background = '#1a1a2e'
    } else {
      document.body.style.background = '#eef2f5'
    }
  }
  
  const generateReport = () => {
    const reportData = {
      date: new Date().toISOString(),
      clinicName: clinicSettings.value.name,
      totalPatients: totalPatientsToday.value,
      waitingCount: waitingCount.value,
      progressCount: progressCount.value,
      completedCount: completedCount.value,
      averageWaitTime: avgWaitTime.value,
      symptomBreakdown: symptomStats.value,
      patientsList: patientsList.value.map(p => ({
        name: p.fullName,
        queueNumber: p.queueNumber,
        status: p.status,
        symptoms: p.symptoms
      }))
    }
    return reportData
  }
  
  return {
    patientsList,
    isRegistered,
    currentQueueNumber,
    alertMessage,
    alertType,
    clinicSettings,
    symptomOptions,
    waitingCount,
    progressCount,
    completedCount,
    totalPatientsToday,
    avgWaitTime,
    symptomStats,
    showAlert,
    addNewPatient,
    checkinReturningPatient,
    updatePatientStatus,
    cancelRegistration,
    saveSettings,
    generateReport
  }
})