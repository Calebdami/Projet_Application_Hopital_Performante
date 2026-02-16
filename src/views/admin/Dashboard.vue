<template>
    <div class="dashboard">
        <h2>Dashboard Admin</h2>

        <div class="cards">
            <StatsCard title="Patients" :value="patients.length" />
            <StatsCard title="Médecins" :value="doctors.length" />
            <StatsCard title="Rendez-vous" :value="appointments.length" />
            <StatsCard title="Chambres" :value="rooms.length" />
        </div>
    </div>
</template>

<script setup>
    import StatsCard from '@/components/dashboard/StatsCard.vue'
    import { usePatients } from '@/composables/usePatients'
    import { useDoctors } from '@/composables/useDoctors'
    import { useAppointments } from '@/composables/useAppointments'
    import { useRooms } from '@/composables/useRooms'

    const { patients } = usePatients()
    const { doctors } = useDoctors()
    const { appointments } = useAppointments()
    const { rooms } = useRooms()
</script>

<style scoped>
    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 15px;
    }
</style>
