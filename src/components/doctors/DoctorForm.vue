<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Nom :</label>
      <input id="name" v-model="form.name" />
      <span class="error" v-if="errors.name">{{ errors.name }}</span>
    </div>

    <div>
      <label for="speciality">Spécialité :</label>
      <input id="speciality" v-model="form.speciality" />
      <span class="error" v-if="errors.speciality">{{ errors.speciality }}</span>
    </div>

    <div>
      <label for="phone">Téléphone :</label>
      <input id="phone" v-model="form.phone" />
      <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
    </div>

    <div>
      <label>Disponible :</label>
      <input type="checkbox" v-model="form.available" />
    </div>

    <button type="submit">{{ isEditing ? 'Modifier' : 'Ajouter' }} Docteur</button>
  </form>

  <ul>
    <li v-for="doctor in doctors" :key="doctor.id">
      {{ doctor.name }} - {{ doctor.speciality }} -
      {{ doctor.status === 'available' ? 'Disponible' : 'Indisponible' }}
      <button @click="editDoctor(doctor)">✏️</button>
      <button @click="deleteDoctor(doctor.id)">🗑️</button>
    </li>
  </ul>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useDoctors } from '@/composables/useDoctors'

const { doctors, addDoctor, updateDoctor, deleteDoctor } = useDoctors()

const form = reactive({
  name: '',
  speciality: '',
  phone: '',
  available: true,
})

const errors = reactive({
  name: '',
  speciality: '',
  phone: '',
})

const isEditing = ref(false)
let editingId = null

function validate() {
  let isValid = true
  Object.keys(errors).forEach(key => (errors[key] = ''))

  if (!form.name) { errors.name = 'Le nom est requis'; isValid = false }
  if (!form.speciality) { errors.speciality = 'La spécialité est requise'; isValid = false }
  if (!form.phone) {
    errors.phone = 'Le téléphone est requis'
    isValid = false
  } else {
    const phonePattern = /^[0-9]{8,15}$/
    if (!phonePattern.test(form.phone)) {
      errors.phone = 'Téléphone invalide (8 à 15 chiffres)'
      isValid = false
    }
  }

  return isValid
}

function handleSubmit() {
  if (!validate()) return

  if (isEditing.value) {
    updateDoctor(editingId, form)
  } else {
    addDoctor(form)
  }

  resetForm()
}

function editDoctor(doctor) {
  Object.assign(form, {
    name: doctor.name,
    speciality: doctor.speciality,
    phone: doctor.phone,
    available: doctor.status === 'available',
  })
  editingId = doctor.id
  isEditing.value = true
}

function resetForm() {
  form.name = ''
  form.speciality = ''
  form.phone = ''
  form.available = true
  editingId = null
  isEditing.value = false
}
</script>

<style>
.error {
  color: red;
  font-size: 0.9em;
}
</style>
