<template>
    <table class="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Genre</th>
                <th>Téléphone</th>
                <th>Statut</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="patient in patients" :key="patient.id">
                <td>{{ patient.firstName }} {{ patient.lastName }}</td>
                <td>{{ patient.gender }}</td>
                <td>{{ patient.phone }}</td>
                <td>{{ patient.status }}</td>
                <td>
                    <button @click="$emit('view', patient.id)">👁️</button>
                    <button @click="$emit('edit', patient)">✏️</button>
                    <button @click="$emit('delete', patient.id)">🗑️</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    defineProps({
        patients: {
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

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
    }
</style>
