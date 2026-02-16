<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-card">
            <h2>Connexion</h2>

            <input v-model="email" type="email" placeholder="Email" required/>

            <input v-model="password" type="password" placeholder="Mot de passe" required/>

            <button type="submit">Se connecter </button>

            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuth } from '@/composables/useAuth'

    const router = useRouter()
    const { login } = useAuth()

    const email = ref('')
    const password = ref('')
    const error = ref('')

    function handleLogin() {
        const success = login(email.value, password.value)

        if (!success) {
            error.value = 'Identifiants incorrects'
            return
        }

        router.push('/dashboard')
    }
</script>

<style scoped>
    .login-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f3f4f6;
    }

    .login-card {
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 320px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .error {
        color: red;
        font-size: 0.9rem;
    }
</style>
