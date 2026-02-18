<script setup>
    import { useRouter } from 'vue-router'
    import { useAuth } from '@/composables/useAuth'
    import AppSidebar from '@/components/layout/AppSidebar.vue'

    const router = useRouter()
    const { currentUser, logout } = useAuth();

    function handleLogout() {
        logout()
        router.push('/login')
    }
</script>

<template>
    <div class="flex min-h-screen bg-slate-50 font-sans text-slate-700">
        
        <aside class="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 shadow-2xl transition-all duration-300">
            <div class="p-6 flex items-center gap-3 border-b border-slate-800">
                <div class="bg-blue-600 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.509.336l-2.736-.547a2 2 0 00-1.022.547l-2.34 2.34a1 1 0 001.14 1.607L4.63 18.5a2 2 0 011.022-.547l2.387-.477a6 6 0 013.86-.517l.673-.337a4 4 0 002.509-.336l2.736.547a2 2 0 011.022.547l2.34 2.34a1 1 0 001.14-1.607l-2.34-2.34z" />
                    </svg>
                </div>
                <span class="font-bold text-white tracking-wide uppercase text-sm">Clinique Pro</span>
            </div>

            <nav class="flex-1 p-4 space-y-2">
                <app-sidebar />
            </nav>

            <div class="p-4 border-t border-slate-800 flex items-center gap-2 text-xs opacity-50">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Serveur Médical Actif
            </div>
        </aside>

        <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
        
            <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shadow-sm z-20">
                
                <div class="flex items-center gap-4">
                    <button class="lg:hidden p-2 hover:bg-slate-100 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <h1 class="hidden sm:block font-medium text-slate-500">Tableau de bord</h1>
                </div>

                <div class="flex items-center gap-3 sm:gap-6">
                    <div class="flex flex-col items-end leading-tight">
                        <span class="text-sm font-bold text-slate-800">{{ currentUser?.name }}</span>
                        <div class="flex items-center gap-1">
                            <span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter"
                                    :class="currentUser?.role === 'doctor' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'">
                                {{ currentUser?.role }}
                            </span>
                            <small v-if="currentUser?.role == 'doctor'" class="text-[10px] text-slate-400 font-mono">
                                ID: {{ currentUser?.id }}
                            </small>
                        </div>
                    </div>
                    <button 
                        @click="handleLogout" 
                        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span class="hidden md:inline"> Se deconnecter</span>
                    </button>
                </div>
            </header>
            <section class="flex-1 overflow-y-auto p-4 sm:p-8 animate-fade-in">
                <div class="max-w-7xl mx-auto"><router-view /></div>
            </section>
        </main>
    </div>
</template>

<style scoped>
    /* Petite animation d'entrée pour le contenu */
    .animate-fade-in {
        animation: fadeIn 0.4s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Scrollbar personnalisée pour un look propre */
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
</style>
