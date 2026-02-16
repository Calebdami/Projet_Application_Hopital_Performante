<template>
    <form @submit.prevent="handleSubmit" class="form">
        <h3>{{ editMode ? 'Modifier' : 'Ajouter' }} Médecin</h3>

        <input v-model="form.name" placeholder="Nom" required />
        <input v-model="form.speciality" placeholder="Spécialité" required />
        <input v-model="form.phone" placeholder="Téléphone" required />

        <label>
            Disponible
            <input type="checkbox" v-model="form.available" />
        </label>

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
        name: '',
        speciality: '',
        phone: '',
        available: true
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
</style>
