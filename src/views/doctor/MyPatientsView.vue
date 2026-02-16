<template>
    <div>
        <h2>Mes Patients</h2>

        <PatientsTable
            :patients="myPatients"
            @view="goToDetail"
        />
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuth } from '@/composables/useAuth'
    import { usePatients } from '@/composables/usePatients'
    import PatientsTable from '@/components/patients/PatientsTable.vue'

    const router = useRouter()

    const { currentUser } = useAuth()
    const { patients } = usePatients()

    const myPatients = computed(() =>
        patients.value.filter(
            p => p.doctorId == currentUser.value?.id
        )
    )

    function goToDetail(id) {
        router.push(`/patients/${id}`)
    }
</script>
