<template>
  <div>
    <h2>Médecins</h2>

    <DoctorForm :editMode="editMode" :modelValue="selectedDoctor" @submit="saveDoctor" />

    <DoctorsTable
      :doctors="doctors"
      :patients="patients"
      @edit="startEdit"
      @delete="removeDoctor"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDoctors } from '@/composables/useDoctors'

import DoctorForm from '@/components/doctors/DoctorForm.vue'
import DoctorsTable from '@/components/doctors/DoctorsTable.vue'
import { usePatients } from '@/composables/usePatients'

const { patients } = usePatients()

const { doctors, addDoctor, updateDoctor, deleteDoctor } = useDoctors(patients)

const editMode = ref(false)
const selectedDoctor = ref(null)

function saveDoctor(data) {
  if (editMode.value) {
    updateDoctor(selectedDoctor.value.id, data)
  } else {
    addDoctor(data)
  }

  editMode.value = false
  selectedDoctor.value = null
}

function startEdit(doctor) {
  editMode.value = true
  selectedDoctor.value = doctor
}

function removeDoctor(id) {
  deleteDoctor(id)
}
</script>
