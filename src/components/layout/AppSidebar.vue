<template>
    <aside class="sidebar">
        <h2 class="logo">🏥 Hospital</h2>

        <nav>
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/patients">Patients</router-link>

            <router-link v-if="isAdmin" to="/doctors">Médecins</router-link>

            <router-link to="/appointments">Rendez-vous</router-link>

            <router-link v-if="isAdmin || isReceptionist" to="/rooms">Chambres</router-link>

            <router-link v-if="isAdmin"  to="/users">Utilisateurs</router-link>
        </nav>
    </aside>
</template>

<script setup>
    import { computed } from 'vue'
    import { useAuth } from '@/composables/useAuth'

    const { currentUser } = useAuth()

    const isAdmin = computed(() => currentUser.value?.role === 'admin')
    const isReceptionist = computed(() => currentUser.value?.role === 'receptionist')
</script>

<style scoped>
    .sidebar {
        width: 220px;
        background: #111827;
        color: white;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 20px;
    }

    .logo {
        font-size: 1.2rem;
        font-weight: bold;
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    a {
        color: white;
        text-decoration: none;
        padding: 8px;
        border-radius: 6px;
    }

    a.router-link-active {
        background: #374151;
    }
</style>
