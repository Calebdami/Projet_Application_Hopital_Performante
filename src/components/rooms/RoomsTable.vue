<template>
    <table class="table">
        <thead>
            <tr>
                <th>Numéro</th>
                <th>Capacité</th>
                <th>Statut</th>
                <th>Patient</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="room in rooms" :key="room.id">
                <td>{{ room.number }}</td>
                <td>{{ room.capacity }}</td>
                <td>{{ room.status }}</td>
                <td>{{ room.patientId || '-' }}</td>
                <td>
                    <button @click="$emit('edit', room)">✏️</button>
                    <button @click="$emit('delete', room.id)">🗑️</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    defineProps({
        rooms: {
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
