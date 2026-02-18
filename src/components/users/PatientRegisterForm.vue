<script setup>
    import { reactive } from 'vue'

    const emit = defineEmits(['submit'])

    const form = reactive({
        firstName: '',
        lastName: '',
        phone: '',
        gender: 'male',
        bloodGroup: '',
        passeword: '',
        birthday: '',
        numeroIP: '',
        photoIP: '',
        email: '',
        allergies: '',
        antecedantMajeurs: '',
        medicamentEnCours: '',
        personneDeConfiance: '',
        numeroDePersonneConfiance: '',
        lienDeParente: '',
        priseEnCharge: '',
        profession: '',
        modeArrivee: '',
        languages: [],
        role: 'patient'
    })

    function handlePhoto(event) {
        const file = event.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            form.photoIP = reader.result
        }
        reader.readAsDataURL(file)
    }

    function submitForm() {
        emit('submit', { ...form })
    }
</script>

<template>
    <div class="max-w-4xl mx-auto p-2 md:p-6">
        <form @submit.prevent="submitForm" class="bg-white shadow-2xl shadow-blue-900/10 rounded-3xl border border-slate-100 overflow-hidden">
        
        <div class="bg-slate-900 p-8 text-white">
            <h2 class="text-2xl font-black flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Admission Nouveau Patient
            </h2>
            <p class="text-slate-400 text-sm mt-1">Veuillez renseigner les informations pour créer le dossier médical.</p>
        </div>

        <div class="p-6 md:p-8 space-y-10">
            
            <section class="space-y-4">
            <div class="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-black">01</span>
                <h3 class="font-bold text-slate-700 uppercase tracking-wider text-sm">Identité du Patient</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Prénom</label>
                <input v-model="form.firstName" placeholder="Jean" required class="input-field" />
                </div>
                <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Nom</label>
                <input v-model="form.lastName" placeholder="Dupont" required class="input-field" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Date de naissance</label>
                <input v-model="form.birthday" type="date" class="input-field" />
                </div>
                <div>
                <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Genre</label>
                <select v-model="form.gender" class="input-field">
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                </select>
                </div>
                <div>
                <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Numéro IP</label>
                <input v-model="form.numeroIP" placeholder="123456" type="number" class="input-field" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label class="block text-[10px] font-black text-slate-400 uppercase mb-2">Photo d'identité</label>
                <input type="file" accept="image/*" @change="handlePhoto" class="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white file:text-slate-700 file:shadow-sm" />
                </div>
                <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Mot de passe portail patient</label>
                <input v-model="form.passeword" type="password" placeholder="••••••••" required class="input-field" />
                </div>
            </div>
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section class="space-y-4">
                <div class="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-black">02</span>
                <h3 class="font-bold text-slate-700 uppercase tracking-wider text-sm">Contact</h3>
                </div>
                <input v-model="form.phone" placeholder="Téléphone (ex: +229...)" class="input-field" />
                <input v-model="form.email" type="email" placeholder="Adresse email" class="input-field" />
            </section>

            <section class="space-y-4">
                <div class="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-black">03</span>
                <h3 class="font-bold text-slate-700 uppercase tracking-wider text-sm">Langues</h3>
                </div>
                <div class="flex flex-wrap gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <label v-for="lang in ['Français', 'Fon', 'Goun', 'Yoruba', 'Autres']" :key="lang" class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-400 transition-colors">
                    <input type="checkbox" :value="lang.toLowerCase()" v-model="form.languages" class="rounded text-blue-600" />
                    <span class="text-xs font-bold text-slate-600">{{ lang }}</span>
                </label>
                </div>
            </section>
            </div>

            <section class="space-y-4 bg-rose-50/30 p-6 rounded-3xl border border-rose-100">
            <div class="flex items-center gap-2 mb-4 border-b border-rose-100 pb-2">
                <span class="bg-rose-100 text-rose-600 px-2 py-1 rounded text-xs font-black">04</span>
                <h3 class="font-bold text-rose-700 uppercase tracking-wider text-sm">Informations Médicales</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="md:col-span-1">
                <label class="text-[10px] font-black text-rose-400 uppercase ml-1">Groupe Sanguin</label>
                <select v-model="form.bloodGroup" class="input-field border-rose-200 focus:ring-rose-500">
                    <option value="">-- Sél. --</option>
                    <option v-for="group in ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']" :key="group" :value="group">{{ group }}</option>
                </select>
                </div>
                <div class="md:col-span-3">
                <label class="text-[10px] font-black text-rose-400 uppercase ml-1">Allergies connues</label>
                <input v-model="form.allergies" placeholder="Ex: Pénicilline, Arachides..." class="input-field border-rose-200 focus:ring-rose-500" />
                </div>
            </div>
            <textarea v-model="form.antecedantMajeurs" placeholder="Antécédents majeurs (Chirurgies, maladies chroniques...)" class="input-field min-h-[80px]"></textarea>
            <input v-model="form.medicamentEnCours" placeholder="Traitements médicamenteux actuels" class="input-field" />
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section class="space-y-4">
                <div class="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-black">05</span>
                <h3 class="font-bold text-slate-700 uppercase tracking-wider text-sm">Administratif</h3>
                </div>
                <select v-model="form.profession" class="input-field">
                <option value="">-- Profession --</option>
                <option v-for="prof in ['Enseignant(e)', 'Commerçant(e)', 'Agriculteur', 'Fonctionnaire', 'Autres']" :key="prof">{{ prof }}</option>
                </select>
                <div class="grid grid-cols-2 gap-4">
                <select v-model="form.modeArrivee" class="input-field text-xs">
                    <option value="">Mode d'arrivée</option>
                    <option>Ambulance</option>
                    <option>Propres moyens</option>
                    <option>Urgences</option>
                </select>
                <select v-model="form.priseEnCharge" class="input-field text-xs">
                    <option value="">Prise en charge</option>
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                </select>
                </div>
            </section>

            <section class="space-y-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div class="flex items-center gap-2 mb-4 border-b border-blue-100 pb-2">
                <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-black">06</span>
                <h3 class="font-bold text-blue-700 uppercase tracking-wider text-sm">Urgence / Confiance</h3>
                </div>
                <input v-model="form.personneDeConfiance" placeholder="Nom du contact d'urgence" class="input-field bg-white" />
                <div class="grid grid-cols-2 gap-4">
                <input v-model="form.numeroDePersonneConfiance" type="number" placeholder="Téléphone" class="input-field bg-white" />
                <input v-model="form.lienDeParente" placeholder="Lien (Parent, Ami...)" class="input-field bg-white" />
                </div>
            </section>
            </div>

            <div class="pt-6">
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg">
                Valider l'Admission
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    @apply w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 text-sm font-medium;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
</style>