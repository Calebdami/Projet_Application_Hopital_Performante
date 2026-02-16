<template>
    <div>
        <h2>Rendez-vous</h2>

        <AppointmentForm
            :editMode="editMode"
            :modelValue="selectedAppointment"
            @submit="saveAppointment"
        />

        <AppointmentsTable
            :appointments="appointments"
            @edit="startEdit"
            @delete="removeAppointment"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useAppointments } from '@/composables/useAppointments'

    import AppointmentForm from '@/components/appointments/AppointmentForm.vue'
    import AppointmentsTable from '@/components/appointments/AppointmentsTable.vue'

    const {
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment
    } = useAppointments()

    const editMode = ref(false)
    const selectedAppointment = ref(null)

    function saveAppointment(data) {
        try {
            if (editMode.value) {
                updateAppointment(selectedAppointment.value.id, data)
            } else {
                addAppointment(data)
            }

            editMode.value = false
            selectedAppointment.value = null
        } catch (err) {
            alert(err.message)
        }
    }

    function startEdit(appt) {
        editMode.value = true
        selectedAppointment.value = appt
    }

    function removeAppointment(id) {
        deleteAppointment(id)
    }
</script>
