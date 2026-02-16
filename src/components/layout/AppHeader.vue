<template>
    <header class="header">
        <div>
            <strong>{{ currentUser?.name }}</strong>
            <small>({{ currentUser?.role }})</small>
        </div>

        <button @click="handleLogout">Déconnexion</button>
    </header>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { useAuth } from '@/composables/useAuth'

    const router = useRouter()
    const { currentUser, logout } = useAuth()

    function handleLogout() {
        logout()
        router.push('/login')
    }
</script>

<style scoped>
    .header {
        height: 60px;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }

    button {
        padding: 8px 14px;
        border: none;
        background: #111827;
        color: white;
        border-radius: 6px;
        cursor: pointer;
    }
</style>
