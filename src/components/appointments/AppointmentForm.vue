<script setup>
    import { reactive, watch, computed } from 'vue'

    const props = defineProps({
        modelValue: Object,
        editMode: Boolean
    })

    const emit = defineEmits(['submit'])

    const form = reactive({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        status: 'pending'
    })

    watch(
        () => props.modelValue,
        (val) => {
            if (val) Object.assign(form, val)
        },
        { immediate: true }
    )

    function handleSubmit() {
        emit('submit', { ...form })
    }
</script>

<template>
    <form @submit.prevent="handleSubmit" class="form">
        <h3>{{ editMode ? 'Modifier' : 'Nouveau' }} Rendez-vous</h3>

        <input v-model="form.patientId" placeholder="ID Patient" required />
        <input v-model="form.doctorId" placeholder="ID Médecin" required />

        <input type="date" v-model="form.date" required />
        <input type="time" v-model="form.time" required />

        <select v-model="form.status">
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="cancelled">Annulé</option>
        </select>

        <button type="submit">
            {{ editMode ? 'Mettre à jour' : 'Créer' }}
        </button>
    </form>
</template>


<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    button {
        padding: 8px 14px;
    }
</style>
