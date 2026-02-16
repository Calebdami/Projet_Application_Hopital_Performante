<template>
    <div>
        <h2>Patients</h2>

        <PatientForm
            :editMode="editMode"
            :modelValue="selectedPatient"
            @submit="savePatient"
        />

        <PatientsTable
            :patients="patients"
            @edit="startEdit"
            @delete="removePatient"
            @view="goToDetail"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { usePatients } from '@/composables/usePatients'

    import PatientForm from '@/components/patients/PatientForm.vue'
    import PatientsTable from '@/components/patients/PatientsTable.vue'

    const router = useRouter()
    const { patients, addPatient, updatePatient, deletePatient } = usePatients()

    const editMode = ref(false)
    const selectedPatient = ref(null)

    function savePatient(data) {
        if (editMode.value) {
            updatePatient(selectedPatient.value.id, data)
        } else {
            addPatient(data)
        }

        editMode.value = false
        selectedPatient.value = null
    }

    function startEdit(patient) {
        editMode.value = true
        selectedPatient.value = patient
    }

    function removePatient(id) {
        deletePatient(id)
    }

    function goToDetail(id) {
        router.push(`/patients/${id}`)
    }
</script>
