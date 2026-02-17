<template>
    <div v-if="patient" class="patient-detail">
        <h2>Détail du patient</h2>

        <div class="card">
            <p><strong>Nom :</strong> {{ patient.firstName }} {{ patient.lastName }}</p>
            <p><strong>Genre :</strong> {{ patient.gender }}</p>
            <p><strong>Téléphone :</strong> {{ patient.phone }}</p>
            <p><strong>Groupe sanguin :</strong> {{ patient.bloodGroup }}</p>
            <p><strong>Statut :</strong> {{ patient.status }}</p>
            <p><strong>Date création :</strong> {{ formatDate(patient.createdAt) }}</p>
        </div>

        <button @click="goBack">Retour</button>
    </div>

    <p v-else>Patient introuvable.</p>
</template>

<script setup>
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { usePatients } from '@/composables/usePatients'
    import { formatDate } from '@/utils/helpers'

    const route = useRoute()
    const router = useRouter()

    const { patients } = usePatients()

    const patient = computed(() => patients.value.find(p => p.id == route.params.id))

    function goBack() { router.back() }
</script>

<style scoped>
    .patient-detail {
        padding: 20px;
    }

    .card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }

    button {
        padding: 8px 16px;
        background: #111827;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
</style>
