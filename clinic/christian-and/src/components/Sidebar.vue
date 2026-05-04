<template>
  <div class="sidebar">
    <a v-for="item in navItems" :key="item.name" href="#" @click.prevent="$emit('navigate', item.view)">
      <i :class="item.icon"></i> {{ item.label }}
    </a>
    
    <div class="quick">
      <p><b>Quick Stats</b></p>
      <p>Patients Today: <span style="color:blue">{{ store.totalPatientsToday }}</span></p>
      <p>In Queue: <span style="color:orange">{{ store.waitingCount }}</span></p>
      <p>Avg Wait: <span style="color:green">{{ store.avgWaitTime }} min</span></p>
    </div>
  </div>
</template>

<script setup>
import { useClinicStore } from '../stores/clinicStore'

const store = useClinicStore()

const navItems = [
  { name: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-house', view: 'dashboard' },
  { name: 'newpatient', label: 'New patient', icon: 'fa-solid fa-user-plus', view: 'newpatient' },
  { name: 'returning', label: 'Returning patient', icon: 'fa-solid fa-repeat', view: 'returning' },
  { name: 'queue', label: "Today's queue", icon: 'fa-solid fa-list', view: 'queue' },
  { name: 'reports', label: 'Reports', icon: 'fa-solid fa-chart-bar', view: 'reports' },
  { name: 'settings', label: 'Setting', icon: 'fa-solid fa-gear', view: 'settings' }
]
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #f8f9fc;
  min-height: calc(100vh - 100px);
  padding: 20px 12px;
  border-right: 1px solid #ddd;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  color: #1f5e8e;
  text-decoration: none;
  border-radius: 30px;
  margin-bottom: 6px;
  transition: 0.2s;
  cursor: pointer;
}

.sidebar a:hover {
  background: #e0f0fa;
  color: #0b5e2e;
}

.quick {
  margin-top: 40px;
  background: #e9ecef;
  padding: 15px;
  border-radius: 20px;
}

.quick p {
  margin: 8px 0;
  font-size: 14px;
}
</style>