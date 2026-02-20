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
    <div v-if="patient" class="max-w-4xl mx-auto p-4 md:p-6 animate-fade-in">
        <button @click="goBack" class="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-bold text-sm uppercase tracking-widest">Retour au listing</span>
        </button>

        <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            
            <header class="relative p-6 md:p-8 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex flex-col md:flex-row items-center gap-6">
                <div class="relative">
                    <div class="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-200 overflow-hidden">
                        <img v-if="patient.photoIP" :src="patient.photoIP" class="w-full h-full object-cover" />
                        <span v-else>{{ patient.firstName.charAt(0) }}{{ patient.lastName.charAt(0) }}</span>
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
                        <span class="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-blue-50 border-blue-200 text-blue-700">
                           Statut: {{ patient.status }}
                        </span>
                        <span class="text-slate-400 text-sm font-medium">IP: #{{ patient.numeroIP }}</span>
                        <span class="text-slate-400 text-sm font-medium">• Né(e) le {{ formatDate(patient.birthday) }}</span>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm min-w-[140px]">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Localisation</span>
                    <p class="text-2xl font-black text-blue-600 leading-none">{{ patient.roomNumber ? 'Ch. ' + patient.roomNumber : 'Non assigné' }}</p>
                    <span class="text-[9px] text-slate-400 uppercase font-bold">{{ patient.modeArrivee }}</span>
                </div>
            </header>

            <div class="p-6 md:p-8 space-y-8">
                
                <section>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="h-1 w-8 bg-red-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Données Médicales</h4>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-between">
                            <div>
                                <span class="text-[10px] font-bold text-rose-400 uppercase tracking-widest block">Groupe Sanguin</span>
                                <span class="text-2xl font-black text-rose-600">{{ patient.bloodGroup || 'N/A' }}</span>
                            </div>
                            <div class="h-10 w-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold animate-pulse">!</div>
                        </div>
                        <div class="bg-slate-900 p-4 rounded-2xl flex flex-col justify-center">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Allergies Signalées</span>
                            <p class="text-sm font-bold" :class="patient.allergies ? 'text-rose-400' : 'text-emerald-400'">
                                {{ patient.allergies || 'AUCUNE ALLERGIE CONNUE' }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
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

                <section>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="h-1 w-8 bg-emerald-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Contact & Profil</h4>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                        <div class="space-y-1">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Profession</span>
                            <p class="text-sm font-bold text-slate-800">{{ patient.profession || 'Non renseigné' }}</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Téléphone</span>
                            <p class="text-sm font-bold text-slate-800">{{ patient.phone || 'N/A' }}</p>
                        </div>
                        <div class="space-y-1 overflow-hidden">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                            <p class="text-sm font-bold text-slate-800 truncate">{{ patient.email || 'N/A' }}</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Langues</span>
                            <div class="flex flex-wrap gap-1">
                                <span v-for="lang in patient.languages" :key="lang" class="text-[9px] bg-slate-100 px-2 py-0.5 rounded font-bold uppercase">{{ lang }}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl">
                    <h4 class="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Personne de Confiance</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-blue-400 uppercase">Nom Complet</p>
                                <p class="text-sm font-bold text-slate-800">{{ patient.personneDeConfiance || 'N/A' }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-blue-400 uppercase">Téléphone</p>
                                <p class="text-sm font-bold text-slate-800">{{ patient.numeroDePersonneConfiance || 'N/A' }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-blue-400 uppercase">Lien de Parenté</p>
                                <p class="text-sm font-bold text-slate-800">{{ patient.lienDeParente || 'N/A' }}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <footer class="bg-slate-50 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100">
                <div class="flex flex-wrap justify-center md:justify-start gap-8">
                    <div class="flex flex-col">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Praticien Responsable</span>
                        <span class="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 mt-1 rounded-full border border-blue-100 text-center">DR. ID #{{ patient.doctorId }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Prise en Charge</span>
                        <span class="text-xs font-black text-slate-700 mt-1 uppercase">{{ patient.priseEnCharge }}</span>
                    </div>
                </div>
                
                <div class="text-right flex flex-col items-center md:items-end">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Enregistré le {{ formatDate(patient.createdAt) }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span class="text-[9px] font-bold text-slate-400 uppercase">Dossier Médical Informatisé Actif</span>
                    </div>
                </div>
            </footer>
        </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-20 text-slate-400">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl text-slate-300 shadow-inner">?</div>
        <p class="font-bold italic">Le dossier de ce patient est introuvable ou a été archivé.</p>
        <button @click="goBack" class="mt-4 text-blue-600 font-bold hover:underline transition-all">Retour à la liste des patients</button>
    </div>
</template>

<style scoped>
    .animate-fade-in {
        animation: fadeIn 0.4s ease-out forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>