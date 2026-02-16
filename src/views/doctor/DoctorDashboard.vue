<template>
    <div>
        <h2>Dashboard Médecin</h2>

        <div class="cards">
            <StatsCard
                title="Mes Patients"
                :value="myPatients.length"
            />

            <StatsCard
                title="Mes Rendez-vous"
                :value="myAppointments.length"
            />
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import StatsCard from '@/components/dashboard/StatsCard.vue'
    import { useAuth } from '@/composables/useAuth'
    import { usePatients } from '@/composables/usePatients'
    import { useAppointments } from '@/composables/useAppointments'

    const { currentUser } = useAuth()
    const { patients } = usePatients()
    const { appointments } = useAppointments()

    const myPatients = computed(() =>
        patients.value.filter(
            p => p.doctorId == currentUser.value?.id
        )
    )

    const myAppointments = computed(() =>
        appointments.value.filter(
            a => a.doctorId == currentUser.value?.id
        )
    )
</script>

<style scoped>
    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 15px;
    }
</style>
