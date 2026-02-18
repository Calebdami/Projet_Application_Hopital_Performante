<template>
    <table class="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Genre</th>
                <th>Statut</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="patient in patients" :key="patient.id">
                <td>{{ patient.firstName }} {{ patient.lastName }}</td>
                <td>{{ patient.gender }}</td>
                <td>{{ patient.status }}</td>
                <td>
                    <router-link :to="{ name: 'PatientDetail', params: { id: patient.id } }">👁️</router-link>
                    <button @click="$emit('edit', patient)">✏️</button>
                    <button @click="$emit('delete', patient.id)">🗑️</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue'

    // Props : la liste des patients
    defineProps({
        patients: {
            type: Array,
            default: () => []
        }
    })

    // Déclaration des événements émis vers le parent
    const emit = defineEmits(['view', 'edit', 'delete'])
    </script>


<style scoped>
    .table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
    }
</style>
