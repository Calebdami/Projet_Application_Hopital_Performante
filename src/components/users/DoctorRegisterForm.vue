<script setup>
    import { reactive, ref } from 'vue'

    const emit = defineEmits(['submit'])
    let showBankInfo = ref(true);
    const form = reactive({
        role: 'doctor',

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
        accountType: ''
    })

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

    function submitForm() { emit('submit', { ...form }) }
</script>

<template>
    <div class="max-w-5xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-8 bg-white shadow-2xl shadow-slate-200/50 rounded-3xl border border-slate-100 p-8">
            <div class="border-b border-slate-100 pb-6">
                <h2 class="text-3xl font-black text-slate-800 tracking-tight">Enregistrement Praticien</h2>
                <p class="text-slate-400 text-sm mt-1">Créez un nouveau compte utilisateur et un profil médical complet.</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="space-y-6">
                    <section class="space-y-4">
                        <h3 class="text-indigo-600 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px]">01</span>
                            État Civil & Contact
                        </h3>                   
                        <div class="flex gap-4">
                            <input v-model="form.title" placeholder="Dr/Pr" class="input-field w-24" />
                            <input v-model="form.name" placeholder="Nom complet" required class="input-field flex-1 font-bold" />
                        </div>
                        <div class="group relative border-2 border-dashed border-slate-200 rounded-2xl p-4 transition-colors hover:border-indigo-300">
                            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 text-center">Photo de profil</label>
                            <input type="file" accept="image/*" @change="handlePhoto" class="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                        </div>
                        <input v-model="form.phone" placeholder="Téléphone pro" class="input-field" />
                        <input v-model="form.email" type="email" placeholder="Email institutionnel" required class="input-field" />
                        <div class="bg-slate-50 rounded-2xl p-4 space-y-3">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-tighter">Langues parlées</label>
                            <div class="flex flex-wrap gap-x-6 gap-y-2">
                                <label v-for="lang in ['Français', 'Fon', 'Goun', 'Yoruba']" :key="lang" class="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" :value="lang.toLowerCase()" v-model="form.languages" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                    <span class="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">{{ lang }}</span>
                                </label>
                            </div>
                        </div>
                    </section>
                    <section class="space-y-4 pt-4 border-t border-slate-50">
                        <h3 class="text-indigo-600 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px]">02</span>
                            Paramètres Système
                        </h3>
                        <div class="grid grid-cols-2 gap-4">
                            <input v-model="form.username" placeholder="Identifiant unique" class="input-field bg-slate-50 border-transparent focus:bg-white" />
                            <input v-model="form.password" type="password" placeholder="Mot de passe" class="input-field bg-slate-50 border-transparent focus:bg-white" />
                        </div>
                        <select v-model="form.acl" class="input-field">
                            <option value="standard">Accès Standard</option>
                            <option value="advanced">Accès Avancé (Spécialiste)</option>
                            <option value="admin-medical">Administrateur Médical</option>
                        </select>
                    </section>
                </div>

                <div class="space-y-6">
                <section class="space-y-4">
                    <h3 class="text-indigo-600 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px]">03</span>
                        Expertise Médicale
                    </h3>
                    <input v-model="form.rpps" placeholder="Numéro RPPS / Ordre" class="input-field" />
                    <input v-model="form.speciality" placeholder="Spécialité principale" required class="input-field" />
                    <textarea v-model="form.diplomas" placeholder="Diplômes et certifications notables..." rows="3" class="input-field resize-none"></textarea>
                </section>
                <section class="space-y-4 pt-4 border-t border-slate-50">
                    <h3 class="text-indigo-600 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px]">04</span>
                        Gestion du Temps
                    </h3>
                    <select v-model="form.contractType" class="input-field font-bold">
                        <option value="full-time">Temps plein (Salarié)</option>
                        <option value="part-time">Temps partiel / Vacataire</option>
                        <option value="on-call">Garde uniquement</option>
                    </select>
                    <input v-model="form.consultationHours" placeholder="Plages horaires (ex: Lun-Ven 08h-16h)" class="input-field" />
                    <div class="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <span class="text-xs font-bold text-emerald-800 uppercase">Astreintes de garde</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.onCall" class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                    </div>
                </section>
                <div class="pt-4">
                    <button type="button" @click="showBankInfo = !showBankInfo" class="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2">
                        {{ showBankInfo ? '− Masquer les infos bancaires' : '+ Ajouter les informations de paiement' }}
                    </button>
                    <div v-if="showBankInfo" class="mt-4 grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl animate-in fade-in slide-in-from-top-2">
                        <input v-model="form.bankName" placeholder="Banque" class="input-field text-xs" />
                        <input v-model="form.accountNumber" placeholder="Compte n°" class="input-field text-xs" />
                        <input v-model="form.iban" placeholder="IBAN" class="input-field text-xs col-span-2" />
                    </div>
                </div>
                </div>
            </div>
            <div class="pt-8 border-t border-slate-100 flex items-center justify-between">
                <p class="text-xs text-slate-400 italic">Tous les champs marqués d'une étoile sont obligatoires.</p>
                <button type="submit" class="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all hover:shadow-xl hover:shadow-indigo-200 active:scale-95">
                    Finaliser l'inscription
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
    @reference "../../assets/styles/main.css";

    .input-field {
        @apply w-full px-5 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 
            focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none 
            transition-all placeholder:text-slate-300 text-sm;
    }
</style>