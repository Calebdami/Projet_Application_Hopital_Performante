<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Patient :</label>
      <select v-model.number="form.patientId">
        <option disabled value="">Sélectionner</option>
        <option v-for="p in patients" :key="p.id" :value="p.id">
          {{ p.firstName }} {{ p.lastName }}
        </option>
      </select>
      <span class="error" v-if="errors.patientId">{{ errors.patientId }}</span>
    </div>

    <div>
      <label>Médecin :</label>
      <select v-model.number="form.doctorId">
        <option disabled value="">Sélectionner</option>
        <option
          v-for="d in doctors"
          :key="d.id"
          :value="d.id"
          :disabled="d.status === 'unavailable'"
        >
          {{ d.name }} - {{ d.speciality }}
          <span v-if="d.status === 'unavailable'">(Indisponible)</span>
        </option>
      </select>
      <span class="error" v-if="errors.doctorId">{{ errors.doctorId }}</span>
    </div>

    <div>
      <label>Date :</label>
      <input type="date" v-model="form.date" :min="today" />
      <span class="error" v-if="errors.date">{{ errors.date }}</span>
    </div>

    <div>
      <label>Heure de début :</label>
      <input type="time" v-model="form.startTime" />
      <span class="error" v-if="errors.startTime">{{ errors.startTime }}</span>
    </div>

    <div>
      <label>Heure de fin :</label>
      <input type="time" v-model="form.endTime" />
      <span class="error" v-if="errors.endTime">{{ errors.endTime }}</span>
    </div>

    <div>
      <label>Statut :</label>
      <select v-model="form.status">
        <option value="pending">En attente</option>
        <option value="confirmed">Confirmé</option>
        <option value="cancelled">Annulé</option>
      </select>
    </div>

    <button type="submit">{{ isEditing ? 'Modifier' : 'Ajouter' }} Rendez-vous</button>
  </form>

  <h2>Liste des rendez-vous</h2>
  <ul>
    <li v-for="appt in appointments" :key="appt.id">
      {{ getPatientName(appt.patientId) }} avec {{ getDoctorName(appt.doctorId) }} le
      {{ appt.date }} de {{ appt.startTime }} à {{ appt.endTime }} - {{ appt.status }}
      <button @click="editAppointment(appt)">✏️</button>
      <button @click="deleteAppointment(appt.id)">🗑️</button>
    </li>
  </ul>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { usePatients } from '@/composables/usePatients'
import { useDoctors } from '@/composables/useDoctors'
import { useAppointments } from '@/composables/useAppointments'

const { patients } = usePatients()
const { doctors } = useDoctors()
const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments()

const today = new Date().toISOString().split('T')[0]

const form = reactive({
  patientId: '',
  doctorId: '',
  date: '',
  startTime: '',
  endTime: '',
  status: 'pending',
})

const errors = reactive({
  patientId: '',
  doctorId: '',
  date: '',
  startTime: '',
  endTime: '',
})

const isEditing = ref(false)
let editingId = null

function validate() {
  let isValid = true
  Object.keys(errors).forEach(k => errors[k] = '')

  if (!form.patientId) { errors.patientId = 'Patient requis'; isValid = false }
  if (!form.doctorId) { errors.doctorId = 'Médecin requis'; isValid = false }
  if (!form.date) { errors.date = 'Date requise'; isValid = false }
  if (!form.startTime) { errors.startTime = 'Heure de début requise'; isValid = false }
  if (!form.endTime) { errors.endTime = 'Heure de fin requise'; isValid = false }
  if (form.startTime && form.endTime && form.endTime <= form.startTime) {
    errors.endTime = 'L’heure de fin doit être après l’heure de début'
    isValid = false
  }

  return isValid
}

function handleSubmit() {
  if (!validate()) return

  try {
    const payload = { ...form }
    if (isEditing.value) {
      updateAppointment(editingId, payload)
      alert('Rendez-vous modifié avec succès')
    } else {
      addAppointment(payload)
      alert('Rendez-vous ajouté avec succès')
    }
    resetForm()
  } catch (error) {
    alert(error.message)
  }
}

function editAppointment(appt) {
  Object.assign(form, appt)
  editingId = appt.id
  isEditing.value = true
}

function resetForm() {
  form.patientId = ''
  form.doctorId = ''
  form.date = ''
  form.startTime = ''
  form.endTime = ''
  form.status = 'pending'
  editingId = null
  isEditing.value = false
}

function getPatientName(id) {
  const p = patients.value.find(p => p.id === id)
  return p ? `${p.firstName} ${p.lastName}` : 'Inconnu'
}

function getDoctorName(id) {
  const d = doctors.value.find(d => d.id === id)
  return d ? `${d.name} (${d.speciality})` : 'Inconnu'
}
</script>

<style>
.error { color: red; font-size: 0.9em; }
</style>
