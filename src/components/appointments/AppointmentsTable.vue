<template>
    <table class="table">
        <thead>
            <tr>
                <th>Patient</th>
                <th>Médecin</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Statut</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="appt in appointments" :key="appt.id">
                <td>{{ appt.patientId }}</td>
                <td>{{ appt.doctorId }}</td>
                <td>{{ appt.date }}</td>
                <td>{{ appt.time }}</td>
                <td>{{ appt.status }}</td>
                <td>
                <button @click="$emit('edit', appt)">✏️</button>
                <button @click="$emit('delete', appt.id)">🗑️</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    defineProps({
        appointments: {
            type: Array,
            default: () => []
        }
    })
</script>

<style scoped>
    .table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }
</style>
