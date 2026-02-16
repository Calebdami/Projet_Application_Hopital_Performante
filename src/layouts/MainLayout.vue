        <script setup>
        import { computed } from 'vue'
        import { useRouter } from 'vue-router'
        import { useAuth } from '@/composables/useAuth'
        
        const router = useRouter()
        const { currentUser, logout } = useAuth()
        
        const role = computed(() => currentUser.value?.role)
        
        function handleLogout() {
          logout()
          router.push('/login')
        }
        </script>
<template>
  <div class="layout">
    <aside class="sidebar">
      
      <h2 class="logo">Hospital</h2>

      <!-- ADMIN -->
      <template v-if="role === 'admin'">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/patients">Patients</router-link>
        <router-link to="/doctors">Médecins</router-link>
        <router-link to="/appointments">Rendez-vous</router-link>
        <router-link to="/rooms">Chambres</router-link>
      </template>

      <!-- DOCTOR -->
      <template v-else-if="role === 'doctor'">
        <router-link to="/doctor/dashboard">Dashboard</router-link>
        <router-link to="/doctor/patients">Mes Patients</router-link>
        <router-link to="/doctor/appointments">Mes Rendez-vous</router-link>
      </template>

      <!-- RECEPTIONIST -->
      <template v-else-if="role === 'receptionist'">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/patients">Patients</router-link>
        <router-link to="/appointments">Rendez-vous</router-link>
        <router-link to="/rooms">Chambres</router-link>
      </template>

    </aside>

    <main class="content">
      <header class="header">
        <div>
          <strong>{{ currentUser?.name }}</strong>
          <span class="role">({{ role }})</span>
        </div>

        <button class="logout-btn" @click="handleLogout">
          Déconnexion
        </button>
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

.logo {
  margin-bottom: 15px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
  transition: 0.2s;
}

.sidebar a.router-link-active {
  background: #374151;
}

.sidebar a:hover {
  background: #374151;
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
  align-items: center;
}

.role {
  margin-left: 6px;
  color: #6b7280;
  font-size: 14px;
}

.logout-btn {
  background: #ef4444;
  border: none;
  padding: 6px 14px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
</style>
