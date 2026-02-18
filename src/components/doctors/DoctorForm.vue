<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h3>{{ editMode ? 'Modifier' : 'Ajouter' }} Médecin</h3>

    <input v-model="form.firstName" placeholder="Prénom" required />
    <input v-model="form.lastName" placeholder="Nom" required />
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
  editMode: Boolean,
})

const emit = defineEmits(['submit'])

const defaultForm = {
  firstName: '',
  lastName: '',
  speciality: '',
  phone: '',
  available: true,
}

const form = reactive({ ...defaultForm })

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val)
  },
  { immediate: true },
)

function resetForm() {
  Object.assign(form, defaultForm)
}

function handleSubmit() {
  emit('submit', { ...form })
  if (!props.editMode) resetForm()
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
