<template>
    <form @submit.prevent="handleSubmit" class="form">
        <h3>{{ editMode ? 'Modifier' : 'Ajouter' }} Patient</h3>

        <input v-model="form.firstName" placeholder="Prénom" required />
        <input v-model="form.lastName" placeholder="Nom" required />

        <select v-model="form.gender">
            <option value="male">Homme</option>
            <option value="female">Femme</option>
        </select>

        <input v-model="form.phone" placeholder="Téléphone" required />
        <input v-model="form.bloodGroup" placeholder="Groupe sanguin" />

        <select v-model="form.status">
            <option value="hospitalized">Hospitalisé</option>
            <option value="discharged">Sorti</option>
            <option value="pending">En attente</option>
        </select>

        <button type="submit">
            {{ editMode ? 'Mettre à jour' : 'Créer' }}
        </button>
    </form>
</template>

<script setup>
    import { reactive, watch } from 'vue'

    const props = defineProps({
        modelValue: Object,
        editMode: Boolean
    })

    const emit = defineEmits(['submit'])

    const form = reactive({
        firstName: '',
        lastName: '',
        gender: 'male',
        phone: '',
        bloodGroup: '',
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

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    button {
        padding: 8px 14px;
    }
</style>
