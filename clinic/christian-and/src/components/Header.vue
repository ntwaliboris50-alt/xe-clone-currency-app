<template>
  <div class="topbar">
    <div class="logo">
      <i class="fa fa-plus"></i>
    </div>
    <div class="title-box">
      <div>
        <strong>{{ store.clinicSettings.name }}</strong><br>
        <small>Digital Patient Check-in System</small>
      </div>
      <div class="lang">🌐 English</div>
    </div>
  </div>
</template>

<script setup>
import { useClinicStore } from '../stores/clinicStore'

const store = useClinicStore()
</script>

<style scoped>
.topbar {
  background: #0fb14a;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.logo {
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo i {
  color: #0fb14a;
  font-size: 36px;
}

.title-box {
  background: #2c6e9e;
  color: white;
  padding: 10px 25px;
  border-radius: 40px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.lang {
  background: #1f4e72;
  padding: 5px 15px;
  border-radius: 30px;
  font-size: 13px;
}
</style>