<template>
  <div>
    <h1><i class="fa-solid fa-chart-bar"></i> Reports & Analytics</h1>
    <p class="subtitle">View daily statistics and generate reports</p>
    
    <div class="stats-grid">
      <div class="report-card"><i class="fa-solid fa-users"></i><div class="report-info"><span class="label">Total Patients</span><span class="value">{{ store.totalPatientsToday }}</span></div></div>
      <div class="report-card"><i class="fa-solid fa-clock"></i><div class="report-info"><span class="label">Average Wait Time</span><span class="value">{{ store.avgWaitTime }} min</span></div></div>
      <div class="report-card"><i class="fa-solid fa-chart-line"></i><div class="report-info"><span class="label">Completion Rate</span><span class="value">{{ completionRate }}%</span></div></div>
    </div>
    
    <div class="charts-container">
      <div class="chart-card"><h3>Patient Status Distribution</h3><div class="pie-chart"><div class="pie" :style="{ background: pieGradient }"></div><div class="pie-legend"><div><span class="dot waiting-dot"></span> Waiting: {{ store.waitingCount }}</div><div><span class="dot progress-dot"></span> In Progress: {{ store.progressCount }}</div><div><span class="dot completed-dot"></span> Completed: {{ store.completedCount }}</div></div></div></div>
      <div class="chart-card"><h3>Symptom Distribution</h3><div v-for="(count, symptom) in store.symptomStats" :key="symptom" class="symptom-bar"><span class="symptom-name">{{ symptom }}</span><div class="bar-container"><div class="bar-fill" :style="{ width: getPercentage(count) + '%' }"></div></div><span class="symptom-count">{{ count }}</span></div></div>
    </div>
    
    <div class="report-actions"><button class="btn-download" @click="downloadReport"><i class="fa-solid fa-download"></i> Download Full Report</button></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useClinicStore } from '../stores/clinicStore'

const store = useClinicStore()
const completionRate = computed(() => store.totalPatientsToday === 0 ? 0 : Math.round((store.completedCount / store.totalPatientsToday) * 100))
const pieGradient = computed(() => { const total = store.totalPatientsToday || 1; const waitingPercent = (store.waitingCount / total) * 100; const progressPercent = (store.progressCount / total) * 100; return `conic-gradient(#f0b429 0% ${waitingPercent}%, #3182ce ${waitingPercent}% ${waitingPercent + progressPercent}%, #38a169 ${waitingPercent + progressPercent}% 100%)` })
const getPercentage = (count) => store.totalPatientsToday === 0 ? 0 : (count / store.totalPatientsToday) * 100
const downloadReport = () => { const report = store.generateReport(); const dataStr = JSON.stringify(report, null, 2); const blob = new Blob([dataStr], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `clinic_report_${Date.now()}.json`; a.click(); URL.revokeObjectURL(url); store.showAlert('Report downloaded successfully!', 'success') }
</script>

<style scoped>
h1 { color: #1f3b4c; }
.subtitle { color: #666; margin-bottom: 30px; }
.stats-grid { display: flex; gap: 20px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap; }
.report-card { background: white; padding: 20px 30px; border-radius: 15px; display: flex; align-items: center; gap: 15px; min-width: 180px; }
.report-card i { font-size: 40px; color: #0fb14a; }
.report-info { display: flex; flex-direction: column; }
.label { font-size: 14px; color: #666; }
.value { font-size: 28px; font-weight: bold; color: #1f3b4c; }
.charts-container { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; margin-bottom: 30px; }
.chart-card { background: white; padding: 25px; border-radius: 20px; flex: 1; min-width: 280px; }
.chart-card h3 { margin-bottom: 20px; color: #4a86c5; }
.pie-chart { display: flex; align-items: center; gap: 30px; flex-wrap: wrap; justify-content: center; }
.pie { width: 150px; height: 150px; border-radius: 50%; }
.pie-legend { font-size: 14px; }
.dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px; }
.waiting-dot { background: #f0b429; }
.progress-dot { background: #3182ce; }
.completed-dot { background: #38a169; }
.symptom-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
.symptom-name { width: 130px; font-size: 14px; }
.bar-container { flex: 1; height: 25px; background: #e0e0e0; border-radius: 12px; overflow: hidden; }
.bar-fill { height: 100%; background: #0fb14a; border-radius: 12px; transition: width 0.5s ease; }
.symptom-count { width: 40px; font-weight: bold; }
.report-actions { text-align: center; }
.btn-download { padding: 12px 30px; background: #0fb14a; color: white; border: none; border-radius: 30px; font-size: 16px; cursor: pointer; font-weight: bold; }
</style>