<script setup>
    import { reactive } from 'vue'

    const emit = defineEmits(['submit'])

    const form = reactive({
        name: '',
        email: '',
        password: '',
        phone: '',
        shift: 'morning',
        role: 'receptionist'
    })

    function submitForm() {
        emit('submit', { ...form })
    }
</script>

<template>
  <div class="max-w-xl mx-auto">
    <form @submit.prevent="submitForm" class="bg-white shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-100 overflow-hidden">
      
      <div class="bg-indigo-600 p-6 text-white flex items-center gap-4">
        <div class="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-black tracking-tight">Nouvelle Réception</h2>
          <p class="text-indigo-100 text-xs">Création d'un compte agent d'accueil</p>
        </div>
      </div>

      <div class="p-6 space-y-6">
        
        <section class="space-y-3">
          <label class="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
            Identité
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input v-model="form.name" placeholder="Nom complet de l'agent" required class="input-field pl-11" />
          </div>
        </section>

        <section class="space-y-3">
          <label class="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Contact Professionnel</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input v-model="form.email" type="email" placeholder="Email (Identifiant)" required class="input-field" />
            <input v-model="form.phone" placeholder="Numéro de poste / Mobile" required class="input-field" />
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section class="space-y-3">
            <label class="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Sécurité</label>
            <input v-model="form.password" type="password" placeholder="Mot de passe provisoire" required class="input-field font-mono" />
          </section>

          <section class="space-y-3">
            <label class="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Service / Shift</label>
            <div class="relative">
              <select v-model="form.shift" class="input-field appearance-none">
                <option value="morning">🌅 Équipe du Matin</option>
                <option value="evening">🌇 Équipe du Soir</option>
                <option value="night">🌙 Équipe de Nuit</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </section>
        </div>

        <div class="pt-4">
          <button type="submit" class="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3">
            Enregistrer l'agent
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
    @reference "../../assets/styles/main.css";

    .input-field {
    @apply w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 
            focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none 
            transition-all placeholder:text-slate-300 text-sm font-medium;
    }
</style>