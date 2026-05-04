<template>
  <div>
    <h1><i class="fa-solid fa-gear"></i> Settings</h1>
    <p class="subtitle">Configure system preferences and options</p>
    
    <div class="settings-container">
      <div class="settings-section"><h3><i class="fa-solid fa-building"></i> General Settings</h3>
        <div class="setting-item"><label>Clinic Name</label><input type="text" v-model="localSettings.name" class="setting-input"></div>
        <div class="setting-item"><label>Default Language</label><select v-model="selectedLanguage" class="setting-select"><option>English</option><option>Kinyarwanda</option><option>French</option></select></div>
      </div>
      
      <div class="settings-section"><h3><i class="fa-solid fa-bell"></i> Notifications</h3>
        <div class="toggle-item"><span>Enable Sound Alerts</span><div class="toggle-switch" :class="{ active: localSettings.soundAlerts }" @click="localSettings.soundAlerts = !localSettings.soundAlerts"><div class="toggle-knob"></div></div></div>
        <div class="toggle-item"><span>Desktop Notifications</span><div class="toggle-switch" :class="{ active: desktopNotifications }" @click="desktopNotifications = !desktopNotifications"><div class="toggle-knob"></div></div></div>
      </div>
      
      <div class="settings-section"><h3><i class="fa-solid fa-display"></i> Display Preferences</h3>
        <div class="display-modes"><div class="mode-card" :class="{ active: localSettings.theme === 'Light Mode' }" @click="localSettings.theme = 'Light Mode'"><i class="fa-solid fa-sun"></i><span>Light Mode</span></div><div class="mode-card" :class="{ active: localSettings.theme === 'Dark Mode' }" @click="localSettings.theme = 'Dark Mode'"><i class="fa-solid fa-moon"></i><span>Dark Mode</span></div></div>
      </div>
      
      <div class="settings-actions"><button class="btn-save" @click="saveSettings"><i class="fa-solid fa-save"></i> Save Settings</button><button class="btn-reset" @click="resetSettings"><i class="fa-solid fa-undo"></i> Reset to Default</button></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useClinicStore } from '../stores/clinicStore'

const store = useClinicStore()
const selectedLanguage = ref('English')
const desktopNotifications = ref(false)
const localSettings = reactive({ name: store.clinicSettings.name, soundAlerts: store.clinicSettings.soundAlerts, theme: store.clinicSettings.theme })
const saveSettings = () => { store.saveSettings({ ...localSettings }) }
const resetSettings = () => { localSettings.name = 'RuralCare Health Clinic'; localSettings.soundAlerts = true; localSettings.theme = 'Light Mode'; selectedLanguage.value = 'English'; desktopNotifications.value = false; store.showAlert('Settings reset to default', 'success') }
</script>

<style scoped>
h1 { color: #1f3b4c; }
.subtitle { color: #666; margin-bottom: 30px; }
.settings-container { max-width: 700px; margin: 0 auto; }
.settings-section { background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; }
.settings-section h3 { color: #4a86c5; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
.setting-item { margin-bottom: 20px; }
.setting-item label { display: block; margin-bottom: 8px; font-weight: 600; color: #333; }
.setting-input, .setting-select { width: 100%; padding: 10px 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
.toggle-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee; }
.toggle-switch { width: 50px; height: 26px; background: #ccc; border-radius: 13px; cursor: pointer; position: relative; transition: background 0.3s; }
.toggle-switch.active { background: #0fb14a; }
.toggle-knob { width: 22px; height: 22px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 3px; transition: transform 0.3s; }
.toggle-switch.active .toggle-knob { transform: translateX(24px); }
.display-modes { display: flex; gap: 15px; }
.mode-card { flex: 1; padding: 15px; border: 2px solid #e0e0e0; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s; }
.mode-card i { font-size: 24px; margin-bottom: 8px; display: block; }
.mode-card.active { border-color: #0fb14a; background: #e8f5e9; }
.settings-actions { display: flex; gap: 15px; justify-content: center; margin-top: 20px; }
.btn-save, .btn-reset { padding: 12px 25px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; }
.btn-save { background: #0fb14a; color: white; }
.btn-reset { background: #6c757d; color: white; }
</style>