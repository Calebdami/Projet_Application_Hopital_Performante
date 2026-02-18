<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        
        <form 
        @submit.prevent="handleLogin" 
        class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
        >
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-800">Espace Médical</h2>
            <p class="text-slate-500 text-sm mt-2">Veuillez vous identifier pour accéder au portail</p>
        </div>

        <div class="space-y-5">
            <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Adresse Email</label>
            <input 
                v-model="email" 
                type="email" 
                placeholder="nom@clinique.fr" 
                required
                class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-slate-400"
            />
            </div>

            <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Mot de passe</label>
            <input 
                v-model="password" 
                type="password" 
                placeholder="••••••••" 
                required
                class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-slate-400"
            />
            </div>

            <button 
            type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-300 shadow-md shadow-blue-200 active:transform active:scale-[0.98]"
            >
            Se connecter
            </button>

            <p 
            v-if="error" 
            class="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100 text-center animate-pulse"
            >
            {{ error }}
            </p>
        </div>

        <div class="mt-8 text-center border-t border-slate-100 pt-6">
            <p class="text-xs text-slate-400 italic">
            Accès sécurisé réservé au personnel autorisé.
            </p>
        </div>
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

        const user = JSON.parse(localStorage.getItem('currentUser'))
        if (user.role === 'admin') router.push('/dashboard')
        if (user.role === 'doctor') router.push('/doctor/dashboard')
        if (user.role === 'receptionist') router.push('/reception/dashboard')
        if (user.role === 'patient') router.push('/patients')
    }

</script>

