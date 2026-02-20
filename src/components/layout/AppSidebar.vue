<script setup>
    import { useRouter } from 'vue-router'
    import { computed } from 'vue'
    import { useAuth } from '@/composables/useAuth'

    const { logout } = useAuth()
    const { currentUser } = useAuth()
    const router = useRouter()

    const isAdmin = computed(() => currentUser.value?.role === 'admin');
    const isReceptionist = computed(() => currentUser.value?.role === 'receptionist');
    const isDoctor = computed(() => currentUser.value?.role === 'doctor');

    // Helper pour les classes actives
    const activeClass = "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20";
    const inactiveClass = "text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200";

    function handleLogout() {
        logout()
        router.push('/login')
    }
</script>

<template>
    <aside class="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-40">
        <div class="p-6 flex items-center gap-3">
            <div class="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </div>
            <span class="text-xl font-black text-white tracking-tighter">SMR<span class="text-indigo-500">PRO</span></span>
        </div>

        <div class="px-6 mb-8">
            <div class="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <p class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{{ currentUser?.role }}</p>
                <p class="text-sm font-bold text-slate-200 truncate">{{ currentUser?.name || 'Utilisateur' }}</p>
            </div>
        </div>

        <nav class="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            
            <router-link v-if="isAdmin" to="/dashboard" :class="[$route.path === '/dashboard' ? activeClass : inactiveClass, 'nav-link']">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Tableau de bord</span>
            </router-link>
            <router-link v-if="isReceptionist" to="/reception/dashboard" :class="[$route.path === '/reception/dashboard' ? activeClass : inactiveClass, 'nav-link']">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Dashboard</span>
            </router-link>
            <router-link v-if="isDoctor" to="/doctor/dashboard" :class="[$route.path === '/doctor/dashboard' ? activeClass : inactiveClass, 'nav-link']">
                <i class="pi pi-th-large"></i> <span>Ma Station</span>
            </router-link>

            <div class="pt-4 pb-2 px-2">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Patientèle</p>
            </div>

            <router-link v-if="isAdmin" to="/patients" active-class="bg-indigo-600 text-white" class="nav-link text-slate-400 hover:bg-slate-800">
                <i class="pi pi-users"></i> <span>Liste Patients</span>
            </router-link>
            <router-link v-if="isDoctor" to="/doctor/patients" active-class="bg-indigo-600 text-white" class="nav-link text-slate-400 hover:bg-slate-800">
                <i class="pi pi-users"></i> <span>Mes Patients</span>
            </router-link>
            <router-link v-if="isReceptionist" to="/reception/patients" active-class="bg-indigo-600 text-white" class="nav-link text-slate-400 hover:bg-slate-800">
                <i class="pi pi-users"></i> <span>Admissions</span>
            </router-link>

            <div class="pt-4 pb-2 px-2">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Organisation</p>
            </div>

            <router-link v-if="isAdmin" to="/doctors" active-class="bg-indigo-600 text-white" class="nav-link text-slate-400 hover:bg-slate-800">
                <i class="pi pi-user-md"></i> <span>Annuaire Médecins</span>
            </router-link>

            <router-link v-if="isAdmin" to="/appointments" active-class="bg-indigo-600 text-white" class="nav-link text-slate-400 hover:bg-slate-800">
                <i class="pi pi-calendar"></i> <span>Planning Global</span>
            </router-link>
            <router-link v-if="isDoctor" to="/doctor/appointments" active-class="bg-indigo-600 text-white" class="nav-link text-slate-400 hover:bg-slate-800">
                <i class="pi pi-calendar"></i> <span>Mes RDV</span>
            </router-link>

            <router-link v-if="isAdmin || isReceptionist" :to="isAdmin ? '/rooms' : '/reception/rooms'" active-class="bg-indigo-600 text-white" class="nav-link text-slate-400 hover:bg-slate-800">
                <i class="pi pi-building"></i> <span>Gestion Chambres</span>
            </router-link>

            <div v-if="isAdmin" class="pt-4 pb-2 px-2 border-t border-slate-800 mt-4">
                <p class="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Sécurité</p>
            </div>

            <router-link v-if="isAdmin" to="/users" active-class="bg-amber-600 text-white" class="nav-link text-slate-400 hover:bg-slate-800">
                <i class="pi pi-user-plus"></i> <span>Gestion Comptes</span>
            </router-link>
        </nav>

        <div class="p-4 border-t border-slate-800">
            <button @click="handleLogout" class="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all font-bold text-sm">
                <i class="pi pi-sign-out"></i> <span>Déconnexion</span>
            </button>
        </div>
    </aside>
</template>

<style scoped>
    /* Utilisation de PrimeIcons pour les icônes (i.pi) ou tu peux remplacer par des SVG */
    @reference "../../assets/styles/main.css";
    .nav-link {
        @apply flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200;
    }

    .nav-link i {
        @apply text-lg;
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #334155;
        border-radius: 10px;
    }
</style>