<template>
  <div>
    <Header />
    <div class="container">
      <Sidebar @navigate="currentView = $event" />
      <div class="main">
        <div v-if="store.alertMessage" class="notification" :class="store.alertType">
          <i :class="store.alertType === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'"></i>
          {{ store.alertMessage }}
          <span class="close-alert" @click="store.showAlert('', 'success')">✖</span>
        </div>

        <DashboardView v-if="currentView === 'dashboard'" @navigate="currentView = $event" />
        <NewPatientView v-else-if="currentView === 'newpatient'" @navigate="currentView = $event" />
        <ReturningPatientView v-else-if="currentView === 'returning'" @navigate="currentView = $event" />
        <QueueView v-else-if="currentView === 'queue'" />
        <ReportsView v-else-if="currentView === 'reports'" />
        <SettingsView v-else-if="currentView === 'settings'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useClinicStore } from './stores/clinicStore'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import DashboardView from './components/DashboardView.vue'
import NewPatientView from './components/NewPatientView.vue'
import ReturningPatientView from './components/ReturningPatientView.vue'
import QueueView from './components/QueueView.vue'
import ReportsView from './components/ReportsView.vue'
import SettingsView from './components/SettingsView.vue'

const store = useClinicStore()
const currentView = ref('dashboard')
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.main {
  flex: 1;
  padding: 30px 25px;
}

.notification {
  padding: 12px 20px;
  border-radius: 40px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slideIn 0.3s ease;
}

.notification.success {
  background: #d4edda;
  border-left: 6px solid #0fb14a;
  color: #155724;
}

.notification.failure {
  background: #f8d7da;
  border-left: 6px solid #dc3545;
  color: #721c24;
}

.close-alert {
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .main {
    padding: 20px 15px;
  }
}
</style>