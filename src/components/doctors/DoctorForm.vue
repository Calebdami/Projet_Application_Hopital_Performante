<script setup>
    import { ref, reactive, watch } from 'vue'

    const props = defineProps({
        modelValue: Object,
        editMode: Boolean
    })

    const emit = defineEmits(['submit'])
    let showBankInfo = ref(false); // Mis à false par défaut pour ne pas encombrer

    // État réactif avec les 29 informations
    const form = reactive({
        // 1-6 : État Civil & Contact
        title: '',
        name: '',
        photo: '',
        phone: '',
        email: '',
        languages: [],

        // 7-10 : Expertise
        rpps: '',
        speciality: '',
        subSpeciality: '',
        diplomas: '',

        // 11-14 : Affectation
        department: '',
        grade: '',
        officeNumber: '',
        signature: '',

        // 15-17 : Contrat
        contractType: 'full-time',
        consultationHours: '',
        onCall: false,

        // 18-21 : Système
        username: '',
        password: '',
        patientQuota: 20,
        acl: 'standard',

        // 22-23 : Profil Bio
        requiredEquipment: '',
        bio: '',

        // 24-29 : Paiement & Statut
        bankName: '',
        accountNumber: '',
        iban: '',
        swift: '',
        accountType: '',
        available: true
    })

    // Surveillance pour le mode édition
    watch(
        () => props.modelValue,
        (val) => {
            if (val) Object.assign(form, val)
        },
        { immediate: true }
    )

    // Fonctions de gestion de fichiers (Photo & Signature)
    function handlePhoto(e) {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => form.photo = reader.result
        reader.readAsDataURL(file)
    }

    function handleSignature(e) {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => form.signature = reader.result
        reader.readAsDataURL(file)
    }

    function handleSubmit() {
        emit('submit', { ...form })
    }
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-1">
        <div class="border-b border-slate-100 pb-4 mb-6">
            <h2 class="text-2xl font-black text-slate-800 flex items-center gap-3">
                <span class="p-2 bg-indigo-600 text-white rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </span>
                {{ editMode ? 'Modifier le Profil' : 'Nouveau Praticien' }}
            </h2>
        </div>

        <section class="p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                <span class="flex items-center justify-center w-5 h-5 bg-indigo-100 rounded-full text-[10px]">1</span>
                Identité & Contact
            </h3>
            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex-shrink-0">
                    <div class="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group">
                        <img v-if="form.photo" :src="form.photo" class="w-full h-full object-cover" />
                        <span v-else class="text-slate-400 text-[10px] text-center px-2">Photo de profil</span>
                        <input type="file" @change="handlePhoto" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                </div>
                <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="md:col-span-1">
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Titre</label>
                        <input v-model="form.title" placeholder="Dr, Pr, etc." class="input-field" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nom complet</label>
                        <input v-model="form.name" required class="input-field font-bold" />
                    </div>
                    <div class="md:col-span-1">
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Téléphone</label>
                        <input v-model="form.phone" class="input-field" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email institutionnel</label>
                        <input v-model="form.email" type="email" required class="input-field" />
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <label class="block text-[10px] font-bold text-slate-400 uppercase">Langues parlées</label>
                <div class="flex flex-wrap gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <label v-for="lang in ['Français', 'Anglais', 'Fon', 'Yoruba', 'Autre']" :key="lang" class="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" :value="lang.toLowerCase()" v-model="form.languages" class="w-4 h-4 text-indigo-600 rounded border-slate-300" />
                        <span class="text-xs text-slate-600 font-medium">{{ lang }}</span>
                    </label>
                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section class="p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 class="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span class="flex items-center justify-center w-5 h-5 bg-indigo-100 rounded-full text-[10px]">2</span>
                    Expertise Médicale
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="label-small">RPPS / Ordre</label>
                        <input v-model="form.rpps" class="input-field font-mono" placeholder="1010..." />
                    </div>
                    <div>
                        <label class="label-small">Spécialité</label>
                        <input v-model="form.speciality" required class="input-field" placeholder="Ex: Cardiologie" />
                    </div>
                </div>
                <div>
                    <label class="label-small">Sous-spécialité / Expertise</label>
                    <input v-model="form.subSpeciality" class="input-field" placeholder="Ex: Rythmologie" />
                </div>
                <div>
                    <label class="label-small">Diplômes</label>
                    <textarea v-model="form.diplomas" rows="2" class="input-field text-xs"></textarea>
                </div>
            </section>

            <section class="p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 class="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span class="flex items-center justify-center w-5 h-5 bg-indigo-100 rounded-full text-[10px]">3</span>
                    Logistique & Signature
                </h3>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="label-small">Service</label>
                        <input v-model="form.department" class="input-field" />
                    </div>
                    <div>
                        <label class="label-small">Grade</label>
                        <input v-model="form.grade" class="input-field" />
                    </div>
                    <div>
                        <label class="label-small">Bureau</label>
                        <input v-model="form.officeNumber" class="input-field" />
                    </div>
                    <div>
                        <label class="label-small">Matériel Requis</label>
                        <input v-model="form.requiredEquipment" class="input-field" placeholder="Ex: Écho-doppler" />
                    </div>
                </div>
                <div class="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <label class="block text-[10px] font-bold text-amber-600 uppercase mb-1">Signature Numérique</label>
                    <div class="flex items-center gap-4">
                        <div v-if="form.signature" class="h-10 w-20 bg-white rounded border border-amber-200 overflow-hidden">
                            <img :src="form.signature" class="w-full h-full object-contain" />
                        </div>
                        <input type="file" @change="handleSignature" accept="image/*" class="text-[10px] text-amber-700 w-full file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-white file:text-amber-700" />
                    </div>
                </div>
            </section>
        </div>

        <section class="p-6 rounded-2xl border border-slate-900 bg-slate-900 text-white space-y-6">
            <h3 class="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span class="flex items-center justify-center w-5 h-5 bg-indigo-900 rounded-full text-[10px]">4</span>
                Système & Planning
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="md:col-span-1">
                    <label class="label-small text-slate-400">Type de contrat</label>
                    <select v-model="form.contractType" class="input-field-dark">
                        <option value="full-time">Temps plein</option>
                        <option value="part-time">Temps partiel</option>
                        <option value="freelance">Vacataire</option>
                    </select>
                </div>
                <div class="md:col-span-1">
                    <label class="label-small text-slate-400">Quota Patients/Jour</label>
                    <input v-model.number="form.patientQuota" type="number" class="input-field-dark" />
                </div>
                <div class="md:col-span-1">
                    <label class="label-small text-slate-400">Identifiant (Login)</label>
                    <input v-model="form.username" class="input-field-dark" />
                </div>
                <div class="md:col-span-1">
                    <label class="label-small text-slate-400">Mot de passe</label>
                    <input v-model="form.password" type="password" class="input-field-dark" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="label-small text-slate-400">Horaires de consultation</label>
                    <input v-model="form.consultationHours" placeholder="Lun-Ven: 08h-16h" class="input-field-dark" />
                </div>
                <div>
                    <label class="label-small text-slate-400">Niveau d'accès (ACL)</label>
                    <select v-model="form.acl" class="input-field-dark">
                        <option value="standard">Standard</option>
                        <option value="admin">Administrateur</option>
                        <option value="head">Chef de Service</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="label-small text-slate-400">Biographie courte / Notes</label>
                <textarea v-model="form.bio" rows="2" class="input-field-dark text-xs"></textarea>
            </div>

            <div class="flex flex-wrap gap-6 pt-4 border-t border-slate-800">
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" v-model="form.onCall" class="w-5 h-5 rounded border-slate-700 bg-slate-800 text-indigo-500" />
                    <span class="text-xs font-bold text-slate-300">Garde & Astreintes</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" v-model="form.available" class="w-5 h-5 rounded border-slate-700 bg-slate-800 text-emerald-500" />
                    <span class="text-xs font-bold text-slate-300">Compte Actif</span>
                </label>
            </div>
        </section>

        <div class="space-y-4">
            <button type="button" @click="showBankInfo = !showBankInfo" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 w-full hover:bg-white transition-all">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-emerald-100 text-emerald-600 rounded-lg italic font-black text-xs italic">RIB</div>
                    <span class="font-bold text-slate-700 text-sm italic">Informations de facturation & Bancaires</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 transition-transform" :class="{'rotate-180': showBankInfo}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            <transition name="slide">
                <section v-if="showBankInfo" class="p-6 rounded-2xl border-2 border-dashed border-slate-200 space-y-4 bg-slate-50/50">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="md:col-span-1">
                            <label class="label-small">Banque</label>
                            <input v-model="form.bankName" class="input-field bg-white" />
                        </div>
                        <div class="md:col-span-1">
                            <label class="label-small">Type de compte</label>
                            <input v-model="form.accountType" placeholder="Courant, Épargne..." class="input-field bg-white" />
                        </div>
                        <div class="md:col-span-1">
                            <label class="label-small">N° de compte</label>
                            <input v-model="form.accountNumber" class="input-field bg-white" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="label-small uppercase">IBAN</label>
                            <input v-model="form.iban" class="input-field bg-white font-mono" />
                        </div>
                        <div>
                            <label class="label-small uppercase">SWIFT / BIC</label>
                            <input v-model="form.swift" class="input-field bg-white font-mono" />
                        </div>
                    </div>
                </section>
            </transition>
        </div>

        <div class="pt-8 border-t border-slate-100 flex items-center justify-between">
            <p class="text-xs text-slate-400 italic">Tous les champs marqués d'une étoile sont obligatoires.</p>
            <button type="submit" class="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all hover:shadow-xl hover:shadow-indigo-200 active:scale-95">
                Finaliser l'inscription
            </button>
        </div>
    </form>
</template>

<style scoped>
    @reference "../../assets/styles/main.css";

    .input-field {
        @apply w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-sm shadow-sm;
    }

    .input-field-dark {
        @apply w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-sm placeholder:text-slate-500;
    }

    .label-small {
        @apply block text-[9px] font-black text-slate-400 uppercase mb-1 tracking-wider;
    }

    .slide-enter-active, .slide-leave-active { transition: all 0.3s ease-out; }
    .slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>

        