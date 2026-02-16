<script setup>
import { reactive, ref } from 'vue'
import { usePatients } from '@/composables/usePatients'

const { patients, addPatient, updatePatient, deletePatient } = usePatients()

const form = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  phone: '',
  bloodGroup: '',
  status: '',
  doctorId: '',
  roomId: '',
})

const isEditing = ref(false)
let editingId = null

function handleSubmit() {
  if (isEditing.value) {
    updatePatient(editingId, form)
  } else {
    addPatient(form)
  }
  resetForm()
}

function editPatient(patient) {
  Object.assign(form, patient)
  editingId = patient.id
  isEditing.value = true
}

function resetForm() {
  form.firstName = ''
  form.lastName = ''
  form.gender = ''
  form.phone = ''
  form.bloodGroup = ''
  form.status = ''
  form.doctorId = ''
  form.roomId = ''
  editingId = null
  isEditing.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="firstName">Prénom :</label>
      <input id="firstName" v-model="form.firstName" required />
    </div>

    <div>
      <label for="lastName">Nom :</label>
      <input id="lastName" v-model="form.lastName" required />
    </div>

    <div>
      <label>Sexe :</label>
      <select v-model="form.gender" required>
        <option disabled value="">Sélectionner</option>
        <option value="male">Masculin</option>
        <option value="female">Féminin</option>
        <option value="other">Autre</option>
      </select>
    </div>

    <div>
      <label for="phone">Téléphone :</label>
      <input id="phone" v-model="form.phone" required />
    </div>

    <div>
      <label for="bloodGroup">Groupe sanguin :</label>
      <select v-model="form.bloodGroup" required>
        <option disabled value="">Sélectionner</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
    </div>

    <div>
      <label>Status :</label>
      <select v-model="form.status" required>
        <option disabled value="">Sélectionner</option>
        <option value="inpatient">Hospitalisé</option>
        <option value="outpatient">Ambulatoire</option>
      </select>
    </div>

    <div>
      <label for="doctorId">Médecin :</label>
      <input id="doctorId" v-model="form.doctorId" />
    </div>

    <div>
      <label for="roomId">Chambre :</label>
      <input id="roomId" v-model="form.roomId" />
    </div>

    <button type="submit">{{ isEditing ? 'Modifier' : 'Ajouter' }} Patient</button>
  </form>

  <h2>Liste des patients</h2>
  <ul>
    <li v-for="patient in patients" :key="patient.id">
      {{ patient.firstName }} {{ patient.lastName }} - {{ patient.status }}
      <button @click="editPatient(patient)">✏️</button>
      <button @click="deletePatient(patient.id)">🗑️</button>
    </li>
  </ul>
</template>
