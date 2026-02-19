<template>
    <header
        class="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 flex justify-between items-center sticky top-0 z-50 shadow-2xl shadow-cyan-950/10">
        <div class="flex items-center gap-4">
            <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 font-bold">
                {{ currentUser?.name?.charAt(0).toUpperCase() }}
            </div>

            <div class="flex flex-col">
                <div class="flex items-center gap-2">
                    <strong class="text-white tracking-wide">{{ currentUser?.name }}</strong>
                    <span v-if="currentUser?.role === 'doctor'"
                        class="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/30 font-mono">
                        ID: {{ currentUser?.id }}
                    </span>
                </div>
                <small class="text-slate-500 uppercase text-[10px] font-bold tracking-[0.2em]">
                    {{ currentUser?.role }}
                </small>
            </div>
        </div>

        <button @click="handleLogout"
            class="group flex items-center gap-2 bg-transparent hover:bg-red-500/10 text-slate-400 hover:text-red-400 py-2 px-4 rounded-lg border border-slate-700 hover:border-red-500/50 transition-all duration-300">
            <span class="text-sm font-semibold uppercase tracking-wider">Déconnexion</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </button>
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
/* Adieu le CSS lourd, tout est dans Tailwind */
</style>