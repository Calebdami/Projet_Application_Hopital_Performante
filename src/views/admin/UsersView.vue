<script setup>
    import { reactive, ref } from 'vue'
    import { useAuth } from '@/composables/useAuth'

    const { createUser } = useAuth()

    const createdUser = ref(null)

    const form = reactive({
        name: '',
        email: '',
        password: '',
        role: 'doctor'
    })

    function handleCreate() {
        try {
            createdUser.value = createUser({ ...form })

            form.name = ''
            form.email = ''
            form.password = ''
            form.role = 'doctor'
        } catch (err) {
            alert(err.message)
        }
    }
</script>

<template>
    <div>
        <h2>Inscription des utilisateurs</h2>

        <form @submit.prevent="handleCreate" class="form">
            <input v-model="form.name" placeholder="Nom" required />
            <input v-model="form.email" type="email" placeholder="Email" required />
            <input v-model="form.password" type="password" placeholder="Mot de passe" required />

            <select v-model="form.role">
                <option value="doctor">Médecin</option>
                <option value="receptionist">Réceptionniste</option>
                <option value="patient">Patient</option>
            </select>

            <button type="submit">
                Créer le compte
            </button>
        </form>

        <div v-if="createdUser" class="result">
            <h4>Identifiants créés :</h4>
            <p>Email : {{ createdUser.email }}</p>
            <p>Mot de passe : {{ createdUser.password }}</p>
        </div>
    </div>
</template>


<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 350px;
    }

    .result {
        margin-top: 20px;
        padding: 12px;
        background: #f3f4f6;
        border-radius: 8px;
    }
</style>
