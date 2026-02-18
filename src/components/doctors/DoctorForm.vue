<script setup>
    
    import { ref, reactive, watch } from 'vue'

    const props = defineProps({
        modelValue: Object,
        editMode: Boolean
    })

    const emit = defineEmits(['submit'])
    let showBankInfo = ref(true);
    const form = reactive({
        title: '',
        name: '',
        photo: '',
        phone: '',
        email: '',
        languages: [],

        rpps: '',
        speciality: '',
        subSpeciality: '',
        diplomas: '',

        department: '',
        grade: '',
        officeNumber: '',
        signature: '',

        contractType: 'full-time',
        consultationHours: '',
        onCall: false,

        username: '',
        password: '',
        patientQuota: 20,
        acl: 'standard',

        requiredEquipment: '',
        bio: '',

        bankName: '',
        accountNumber: '',
        iban: '',
        swift: '',
        accountType: '',
        available: true
    })

    watch(
        () => props.modelValue,
        (val) => {
            if (val) Object.assign(form, val)
        },
        { immediate: true }
    )

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
        <section class="p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 transition-all hover:border-indigo-200">
            <h3 class="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <span class="flex items-center justify-center w-5 h-5 bg-indigo-100 rounded-full text-[10px]">1</span>
                État Civil & Contact
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="md:col-span-1">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Titre</label>
                    <input v-model="form.title" placeholder="Ex: Pr. ou Dr." class="input-field" />
                </div>
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nom complet</label>
                    <input v-model="form.name" placeholder="Nom et Prénoms" required class="input-field font-bold" />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="form.phone" placeholder="Téléphone pro" class="input-field" />
                <input v-model="form.email" type="email" placeholder="Email institutionnel" required class="input-field" />
            </div>
            <div class="space-y-2">
                <label class="block text-[10px] font-bold text-slate-400 uppercase">Langues parlées</label>
                <div class="flex flex-wrap gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <label v-for="lang in ['francais', 'fon', 'goun', 'yoruba', 'autres']" :key="lang" class="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" :value="lang" v-model="form.languages" class="w-4 h-4 text-indigo-600 rounded border-slate-300" />
                        <span class="text-sm text-slate-600 group-hover:text-indigo-600 capitalize font-medium">{{ lang }}</span>
                    </label>
                </div>
            </div>
        </section>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section class="p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 class="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span class="flex items-center justify-center w-5 h-5 bg-indigo-100 rounded-full text-[10px]">2</span>
                    Expertise & Diplômes
                </h3>
                <input v-model="form.rpps" placeholder="RPPS / Numéro d'Ordre" class="input-field font-mono" />
                <input v-model="form.speciality" placeholder="Spécialité principale" required class="input-field" />
                <textarea v-model="form.diplomas" placeholder="Diplômes et certifications" rows="3" class="input-field"></textarea>
            </section>
            <section class="p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 class="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span class="flex items-center justify-center w-5 h-5 bg-indigo-100 rounded-full text-[10px]">3</span>
                    Affectation Interne
                </h3>
                <input v-model="form.department" placeholder="Service (ex: Cardiologie)" class="input-field" />
                <div class="grid grid-cols-2 gap-4">
                    <input v-model="form.grade" placeholder="Grade" class="input-field" />
                    <input v-model="form.officeNumber" placeholder="Bureau" class="input-field" />
                </div>
                <div class="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <label class="block text-[10px] font-bold text-amber-600 uppercase mb-1">Signature Numérique</label>
                    <input type="file" accept="image/*" @change="handleSignature" class="text-xs text-amber-700 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-white file:shadow-sm" />
                </div>
            </section>
        </div>
        <section class="p-6 rounded-2xl border border-slate-900 bg-slate-900 text-white space-y-4 shadow-xl">
            <h3 class="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span class="flex items-center justify-center w-5 h-5 bg-indigo-900 rounded-full text-[10px]">4</span>
                Gestion & Accès Système
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select v-model="form.contractType" class="input-field-dark">
                <option value="full-time text-slate-800">Temps plein</option>
                <option value="part-time text-slate-800">Temps partiel</option>
                <option value="on-call text-slate-800">Garde uniquement</option>
                </select>
                <input v-model="form.username" placeholder="Identifiant" class="input-field-dark" />
                <input v-model="form.password" type="password" placeholder="Mot de passe" class="input-field-dark" />
            </div>
            <div class="flex flex-wrap gap-6 pt-2 border-t border-slate-800 mt-4">
                <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative inline-flex items-center">
                        <input type="checkbox" v-model="form.onCall" class="sr-only peer">
                        <div class="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </div>
                    <span class="text-sm font-bold text-slate-300">Disponible pour gardes</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative inline-flex items-center">
                        <input type="checkbox" v-model="form.available" class="sr-only peer">
                        <div class="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </div>
                    <span class="text-sm font-bold text-slate-300">Actuellement actif</span>
                </label>
            </div>
        </section>

        <div class="space-y-4">
            <label class="inline-flex items-center cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-200 w-full hover:bg-white transition-all">
                <input type="checkbox" v-model="showBankInfo" class="w-5 h-5 text-indigo-600 rounded" />
                <span class="ml-3 font-bold text-slate-700">Inclure les informations de paiement</span>
            </label>
            <transition name="slide">
                <section v-if="showBankInfo" class="p-6 rounded-2xl border-2 border-dashed border-slate-200 space-y-4 bg-slate-50/50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input v-model="form.bankName" placeholder="Nom de la banque" class="input-field bg-white" />
                        <input v-model="form.accountNumber" placeholder="Numéro de compte" class="input-field bg-white" />
                        <input v-model="form.iban" placeholder="IBAN" class="input-field bg-white" />
                        <input v-model="form.swift" placeholder="SWIFT/BIC" class="input-field bg-white" />
                    </div>
                </section>
            </transition>
        </div>
        <div class="pt-6">
            <button type="submit" class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3">
                {{ editMode ? 'Mettre à jour le profil' : 'Finaliser la création' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </form>
</template>

<style scoped>
    @reference "../../assets/styles/main.css";
    .input-field {
        @apply w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-sm;
    }

    .input-field-dark {
        @apply w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-sm placeholder:text-slate-500;
    }

    .slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
    .slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
