<template>
    <table class="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Spécialité</th>
                <th>Téléphone</th>
                <th>Disponible</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="doctor in doctors" :key="doctor.id">
                <td>{{ doctor.name }}</td>
                <td>{{ doctor.speciality }}</td>
                <td>{{ doctor.phone }}</td>
                <td>{{ doctor.available ? 'Oui' : 'Non' }}</td>
                <td>
                    <button @click="$emit('edit', doctor)">✏️</button>
                    <button @click="$emit('delete', doctor.id)">🗑️</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    defineProps({
        doctors: {
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
