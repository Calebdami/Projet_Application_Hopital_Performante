<template>
    <div>
        <h2>Créer un utilisateur</h2>

        <form @submit.prevent="create" class="form">
            <input v-model="name" placeholder="Nom" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Mot de passe" required />

            <select v-model="role">
                <option value="doctor">Médecin</option>
                <option value="receptionist">Réceptionniste</option>
            </select>

            <button type="submit">
                Créer
            </button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useAuth } from '@/composables/useAuth'

    const { createUser } = useAuth()

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const role = ref('doctor')

    function create() {
        try {
            createUser({
                name: name.value,
                email: email.value,
                password: password.value,
                role: role.value
            })

            name.value = ''
            email.value = ''
            password.value = ''
        } catch (err) {
            alert(err.message)
        }
    }
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 320px;
    }
</style>
