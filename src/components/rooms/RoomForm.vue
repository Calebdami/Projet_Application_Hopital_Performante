<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Numéro de chambre :</label>
      <input v-model="form.number" />
      <span class="error" v-if="errors.number">{{ errors.number }}</span>
    </div>

    <div>
      <label>Capacité (nombre de lits) :</label>
      <input type="number" v-model.number="form.capacity" min="1" />
      <span class="error" v-if="errors.capacity">{{ errors.capacity }}</span>
    </div>

    <div>
      <label>Statut :</label>
      <select v-model="form.status">
        <option value="free">Libre</option>
        <option value="occupied">Occupée</option>
        <option value="maintenance">Maintenance</option>
      </select>
    </div>

    <div>
      <label>Affectation patient :</label>
      <select v-model="form.patientId">
        <option value="">Aucun</option>
        <option
          v-for="p in patients"
          :key="p.id"
          :value="p.id"
          :disabled="isPatientAssigned(p.id)"
        >
          {{ p.firstName }} {{ p.lastName }}
          <span v-if="isPatientAssigned(p.id)"> (Déjà assigné)</span>
        </option>
      </select>
    </div>

    <button type="submit">{{ isEditing ? 'Modifier' : 'Ajouter' }} Chambre</button>
  </form>

  <h2>Liste des chambres</h2>
  <ul>
    <li v-for="room in rooms" :key="room.id">
      <strong>{{ room.number }}</strong> - Capacité : {{ room.capacity }} - Statut :
      <span :style="{ color: room.status === 'occupied' ? 'red' : room.status === 'maintenance' ? 'orange' : 'green' }">
        {{ room.status }}
      </span>
      <span v-if="room.patients && room.patients.length">
        - Occupée par : {{ getPatientNames(room.patients).join(', ') }}
      </span>
      <button @click="editRoom(room)">✏️</button>
      <button @click="deleteRoom(room.id)">🗑️</button>
    </li>
  </ul>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRooms } from '@/composables/useRooms'
import { usePatients } from '@/composables/usePatients'

const { rooms, addRoom, updateRoom, deleteRoom } = useRooms()
const { patients } = usePatients()

const form = reactive({
  number: '',
  capacity: 1,
  status: 'free',
  patients: [], // tableau pour plusieurs patients
})

const errors = reactive({
  number: '',
  capacity: '',
})

const isEditing = ref(false)
let editingId = null

// --- Validation du formulaire ---
function validate() {
  let isValid = true
  Object.keys(errors).forEach((k) => (errors[k] = ''))

  if (!form.number) {
    errors.number = 'Numéro requis'
    isValid = false
  }

  if (!form.capacity || form.capacity < 1) {
    errors.capacity = 'Capacité invalide'
    isValid = false
  }

  if (form.patients.length > form.capacity) {
    errors.capacity = 'Nombre de patients supérieur à la capacité'
    isValid = false
  }

  return isValid
}

// --- Soumission ---
function handleSubmit() {
  if (!validate()) return

  if (isEditing.value) {
    updateRoom(editingId, form)
    alert('Chambre modifiée avec succès')
  } else {
    addRoom(form)
    alert('Chambre ajoutée avec succès')
  }

  resetForm()
}

// --- Edition ---
function editRoom(room) {
  Object.assign(form, room)
  editingId = room.id
  isEditing.value = true
}

// --- Reset form ---
function resetForm() {
  form.number = ''
  form.capacity = 1
  form.status = 'free'
  form.patients = []
  editingId = null
  isEditing.value = false
}

// --- Helpers ---
function getPatientNames(patientIds) {
  return patientIds.map((id) => {
    const p = patients.value.find((p) => p.id === id)
    return p ? `${p.firstName} ${p.lastName}` : 'Inconnu'
  })
}

function isPatientAssigned(patientId) {
  return rooms.value.some((r) => r.patients?.includes(patientId))
}
</script>

<style>
.error {
  color: red;
  font-size: 0.9em;
}
</style>
