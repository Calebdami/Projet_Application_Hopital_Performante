<script setup>
    import { useRouter } from 'vue-router'
    import { useAuth } from '@/composables/useAuth'
    import AppSidebar from '@/components/layout/AppSidebar.vue'

    const router = useRouter()
    const { currentUser, logout } = useAuth()

    function handleLogout() {
        logout()
        router.push('/login')
    }
</script>

<template>
    <div class="layout">
        <aside class="sidebar">
            <app-sidebar/>
        </aside>

        <main class="content">
            <header class="header">
                <span>{{ currentUser?.name }}</span>
                <span>{{ currentUser?.role }}</span>
                <button @click="handleLogout">Déconnexion</button>
            </header>

            <router-view />
        </main>
    </div>
</template>


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
