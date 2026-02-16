<template>
    <div class="layout">
        <aside class="sidebar">
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/patients">Patients</router-link>
            <router-link to="/doctors">Médecins</router-link>
            <router-link to="/appointments">Rendez-vous</router-link>
            <router-link to="/rooms">Chambres</router-link>
        </aside>

        <main class="content">
            <header class="header">
                <span>{{ currentUser?.name }}</span>
                <button @click="handleLogout">Déconnexion</button>
            </header>

            <router-view />
        </main>
    </div>
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
    .layout {
        display: flex;
        min-height: 100vh;
    }

    .sidebar {
        width: 220px;
        background: #1f2937;
        color: white;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 12px;
    }

    .sidebar a {
        color: white;
        text-decoration: none;
    }

    .content {
        flex: 1;
        background: #f9fafb;
    }

    .header {
        background: white;
        padding: 16px;
        display: flex;
        justify-content: space-between;
    }
</style>
