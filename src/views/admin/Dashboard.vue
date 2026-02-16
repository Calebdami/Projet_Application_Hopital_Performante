<template>
  <div>
    <h1>Dashboard</h1>

    <div class="cards">
      <div class="card">
        <h3>Total Patients</h3>
        <p>{{ totalPatients }}</p>
      </div>

      <div class="card">
        <h3>Rendez-vous</h3>
        <p>{{ totalAppointments }}</p>
      </div>

      <div class="card">
        <h3>Chambres Occupées</h3>
        <p>{{ occupiedRooms }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const patients = JSON.parse(localStorage.getItem('patients')) || []
const appointments = JSON.parse(localStorage.getItem('appointments')) || []
const rooms = JSON.parse(localStorage.getItem('rooms')) || []

const totalPatients = computed(() => patients.length)

const totalAppointments = computed(() => appointments.length)

const occupiedRooms = computed(() => 
  rooms.filter(r => r.status === 'occupied').length
)
</script>

<style scoped>
.cards {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}
</style>
