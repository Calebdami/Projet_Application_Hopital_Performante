<template>
    <div>
        <h2>Mes Rendez-vous</h2>

        <AppointmentsTable
            :appointments="myAppointments"
        />
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useAuth } from '@/composables/useAuth'
    import { useAppointments } from '@/composables/useAppointments'
    import AppointmentsTable from '@/components/appointments/AppointmentsTable.vue'

    const { currentUser } = useAuth()
    const { appointments } = useAppointments()

    const myAppointments = computed(() =>
        appointments.value.filter(
            a => a.doctorId == currentUser.value?.id
        )
    )
</script>
