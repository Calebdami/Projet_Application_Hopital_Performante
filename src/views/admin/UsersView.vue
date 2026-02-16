<template>
  <div>
    <h2>Créer un utilisateur</h2>

    <form @submit.prevent="handleCreate">
      <input v-model="form.name" placeholder="Nom" required />
      <input v-model="form.email" placeholder="Email" required />

      <input v-model="form.password" type="password" placeholder="Mot de passe" required />

      <select v-model="form.role">
        <option value="doctor">Médecin</option>
        <option value="receptionist">Réceptionniste</option>
      </select>

      <button type="submit">Créer</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { createUser } = useAuth()

const message = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'doctor',
})

function handleCreate() {
  try {
    createUser(form)
    message.value = 'Utilisateur créé avec succès'
  } catch (err) {
    message.value = err.message
  }
}
</script>
