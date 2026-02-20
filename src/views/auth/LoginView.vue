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

<template>
    <div class="min-h-screen flex items-center justify-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-900 to-slate-900 px-4 relative overflow-hidden">
        
        <div class="absolute top-0 -left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute bottom-0 -right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <form 
            @submit.prevent="handleLogin" 
            class="w-full max-w-md bg-white/95 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 relative z-10 transition-all duration-500 hover:shadow-indigo-500/10"
        >
            <div class="text-center mb-10">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-indigo-600 to-blue-500 text-white rounded-3xl rotate-3 shadow-xl mb-6 transition-transform hover:rotate-0 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h1 class="text-3xl font-black text-slate-900 tracking-tighter">
                    SMT <span class="text-indigo-600">PRO</span>
                </h1>
                <p class="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Système de Management Total</p>
            </div>

            <div class="space-y-6">
                <div class="group">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Identifiant Email</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                        </span>
                        <input 
                            v-model="email" 
                            type="email" 
                            placeholder="nom@smt-pro.com" 
                            required
                            class="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 text-sm font-medium"
                        />
                    </div>
                </div>

                <div class="group">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mot de passe</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </span>
                        <input 
                            v-model="password" 
                            type="password" 
                            placeholder="••••••••" 
                            required
                            class="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 text-sm font-medium"
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    class="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                    <span>Accéder à ma session</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>

                <transition name="slide-up">
                    <p 
                        v-if="error" 
                        class="text-xs font-bold text-rose-600 bg-rose-50 p-4 rounded-xl border border-rose-100 text-center flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
                        {{ error }}
                    </p>
                </transition>
            </div>

            <div class="mt-10 text-center border-t border-slate-50 pt-8">
                <p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Portail Sécurisé SMT-PRO v4.0
                </p>
            </div>
        </form>
    </div>
</template>

<style scoped>
    /* Animation pour les blobs décoratifs */
    .animate-blob {
        animation: blob 7s infinite;
    }
    .animation-delay-2000 {
        animation-delay: 2s;
    }

    @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
    }

    /* Transitions pour l'erreur */
    .slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
    .slide-up-enter-from { opacity: 0; transform: translateY(10px); }
    .slide-up-leave-to { opacity: 0; transform: translateY(-10px); }
</style>