<script setup>
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { usePatients } from '@/composables/usePatients'
    import { formatDate } from '@/utils/helpers'

    const route = useRoute()
    const router = useRouter()

    const { patients } = usePatients()

    const patient = computed(() => patients.value.find(p => p.id == route.params.id))

    function goBack() { router.back() }
</script>

<template>
    <div v-if="patient" class="max-w-3xl mx-auto p-4 md:p-6 animate-fade-in">
        <button 
        @click="goBack" 
        class="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-bold text-sm uppercase tracking-widest">Retour au listing</span>
        </button>

        <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <header class="relative p-6 md:p-8 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex flex-col md:flex-row items-center gap-6">
                <div class="relative">
                    <div class="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-200">
                        {{ patient.firstName.charAt(0) }}{{ patient.lastName.charAt(0) }}
                    </div>
                    <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100">
                        <span class="text-lg">{{ patient.gender === 'male' ? '♂' : '♀' }}</span>
                    </div>
                </div>
                <div class="text-center md:text-left flex-1">
                    <h2 class="text-3xl font-extrabold text-slate-800 leading-tight">
                        {{ patient.firstName }} {{ patient.lastName }}
                    </h2>
                    <div class="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-2">
                        <span 
                        class="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border"
                        :class="{
                            'bg-amber-50 border-amber-200 text-amber-700': patient.status.toLowerCase().includes('attente'),
                            'bg-emerald-50 border-emerald-200 text-emerald-700': patient.status.toLowerCase().includes('sorti'),
                            'bg-blue-50 border-blue-200 text-blue-700': patient.status.toLowerCase().includes('hospitalise')
                        }"
                        >
                            {{ patient.status }}
                        </span>
                        <span class="text-slate-400 text-sm font-medium">ID: #{{ patient.numeroIP || patient.id.toString().slice(-6) }}</span>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm min-w-[120px]">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Localisation</span>
                    <p class="text-2xl font-black text-blue-600">Ch. {{ patient.roomNumber || 'N/A' }}</p>
                </div>
            </header>

            <div class="p-6 md:p-8 space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-between">
                        <div>
                            <span class="text-[10px] font-bold text-rose-400 uppercase tracking-widest block">Groupe Sanguin</span>
                            <span class="text-2xl font-black text-rose-600">{{ patient.bloodGroup }}</span>
                        </div>
                        <div class="h-10 w-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">!</div>
                    </div>
                    <div class="bg-slate-900 p-4 rounded-2xl">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Allergies Signalées</span>
                        <p class="text-sm font-bold" :class="patient.allergies ? 'text-rose-400' : 'text-emerald-400'">
                            {{ patient.allergies || 'AUCUNE ALLERGIE CONNUE' }}
                        </p>
                    </div>
                </div>
                <section>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="h-1 w-8 bg-blue-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Historique Médical</h4>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase block mb-1">Antécédents Majeurs</label>
                            <p class="text-slate-700 font-medium leading-relaxed">{{ patient.antecedantMajeurs || 'Aucun antécédent répertorié.' }}</p>
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase block mb-1">Traitements Actuels</label>
                            <p class="text-slate-700 font-medium leading-relaxed">{{ patient.medicamentEnCours || 'Pas de traitement en cours.' }}</p>
                        </div>
                    </div>
                </section>

                <section class="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
                    <div class="space-y-1">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Profession</span>
                        <p class="text-sm font-bold text-slate-800">{{ patient.profession || 'N/A' }}</p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Téléphone</span>
                        <p class="text-sm font-bold text-slate-800">{{ patient.phone || 'N/A' }}</p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Langues</span>
                        <p class="text-sm font-bold text-slate-800 capitalize">{{ patient.languages.join(', ') }}</p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Prise en charge</span>
                        <p class="text-sm font-bold" :class="patient.priseEnCharge === 'oui' ? 'text-emerald-600' : 'text-slate-400'">
                            {{ patient.priseEnCharge === 'oui' ? 'Vérifiée ✅' : 'Non ❌' }}
                        </p>
                    </div>
                </section>
            </div>

            <footer class="bg-slate-50 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex items-center gap-2">
                    <span class="text-[10px] font-bold text-slate-400 uppercase">Praticien responsable :</span>
                    <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">ID #{{ patient.doctorId }}</span>
                </div>
                <p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Admis le {{ formatDate(patient.createdAt) }}
                </p>
            </footer>
        </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-20 text-slate-400">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl text-slate-300">?</div>
            <p class="font-bold italic">Le dossier de ce patient est introuvable ou a été archivé.</p>
        <button @click="goBack" class="mt-4 text-blue-600 font-bold underline">Retour à la liste</button>
    </div>
</template>

<style scoped>
    .animate-fade-in {
        animation: fadeIn 0.4s ease-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.98); }
        to { opacity: 1; transform: scale(1); }
    }
</style>
