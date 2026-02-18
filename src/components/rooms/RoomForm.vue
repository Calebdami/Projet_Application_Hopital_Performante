<template>
    <form @submit.prevent="handleSubmit" class="form">
        <h3>{{ editMode ? 'Modifier' : 'Ajouter' }} Chambre</h3>

        <input v-model="form.number" placeholder="Numéro de chambre" required/>

        <input type="number" v-model="form.capacity" placeholder="Capacité" required/>

        <select v-model="form.status">
            <option value="free">Libre</option>
            <option value="occupied">Occupée</option>
        </select>

        <button type="submit">{{ editMode ? 'Mettre à jour' : 'Créer' }}</button>
    </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: Object,
  editMode: Boolean
})

const emit = defineEmits(['submit'])

const defaultForm = {
  number: '',
  capacity: 3,
  status: 'free'
}

// Objet réactif du formulaire
const form = reactive({ ...defaultForm })

// ===============================
// Si on passe en mode édition,
// on remplit le formulaire
// ===============================
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      Object.assign(form, val)
    }
  },
  { immediate: true }
)

// ===============================
// Réinitialisation propre
// ===============================
function resetForm() {
  Object.assign(form, defaultForm)
}

// ===============================
// Soumission
// ===============================
function handleSubmit() {

  emit('submit', { ...form })

  // On reset seulement si on crée
  if (!props.editMode) {
    resetForm()
  }
}
</script>


<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
