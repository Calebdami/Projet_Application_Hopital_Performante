<script setup>
    import { reactive, watch, computed } from 'vue'
    import { useRooms } from '@/composables/useRooms'
    import { useDoctors } from '@/composables/useDoctors' // si tu as un composable doctor

    const availableDoctors = computed(() => doctors.value.filter((d) => d.available));
    const emit = defineEmits(['submit']);
    const props = defineProps({
        modelValue: Object,
        editMode: Boolean,
    })
    let form = reactive({
        status: 'En attente',
        firstName: '',
        lastName: '',
        phone: '',
        room: '',
        room: '',
        doctorId: '',
        roomNumber: '',
        gender: 'male',
        bloodGroup: '',
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
    })

    const { rooms } = useRooms()
    const { doctors } = useDoctors()
    // Chambres avec places disponibles
    const availableRooms = computed(() => rooms.value.filter((room) => room.patients.length < room.capacity))

    watch(
        () => props.modelValue,
        (val) => {
            if (val) Object.assign(form, val)
        },
        { immediate: true },
    )

    function handleSubmit() {
    emit('submit', { ...form })
        if (!props.editMode) resetForm()
    }
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-8 bg-white p-1">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-4">
            <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span class="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                {{ editMode ? 'Modifier la fiche' : 'Ajouter un' }} Patient
            </h3>
            <div class="w-full sm:w-auto">
                <label class="text-[10px] font-bold uppercase text-slate-400 block mb-1">État actuel</label>
                <select v-model="form.status" 
                class="w-full sm:w-48 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="Hospitalise(e)">Hospitalisé(e)</option>
                    <option value="Sorti(e)">Sorti(e)</option>
                    <option value="En attente">En attente</option>
                </select>
            </div>
        </div>

        <section class="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 class="text-sm font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Identité & État Civil
            </h3>   
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Prénom</label>
                    <input v-model="form.firstName" placeholder="Jean" required class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Nom</label>
                    <input v-model="form.lastName" placeholder="Dupont" required class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Date de naissance</label>
                    <input v-model="form.birthday" type="date" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Genre</label>
                    <select v-model="form.gender" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Numéro IP</label>
                    <input v-model="form.numeroIP" placeholder="000000" type="number" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono" />
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Photo d'identité</label>
                    <input type="file" accept="image/*" @change="handlePhoto" class="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section class="p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">Contact</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input v-model="form.phone" placeholder="Téléphone" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input v-model="form.email" type="email" placeholder="Email" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
            </section>

            <section class="p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">Langues parlées</h3>
                <div class="flex flex-wrap gap-4 pt-2">
                    <label v-for="lang in ['francais', 'fon', 'goun', 'yoruba', 'autres']" :key="lang" class="inline-flex items-center cursor-pointer group">
                        <input type="checkbox" :value="lang" v-model="form.languages" class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                        <span class="ml-2 text-sm text-slate-600 group-hover:text-blue-600 capitalize">{{ lang }}</span>
                    </label>
                </div>
            </section>
        </div>

        <section class="p-5 rounded-2xl border-2 border-red-50 bg-red-50/10 space-y-4">
            <h3 class="text-sm font-bold text-red-600 uppercase tracking-wider flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.509.336l-2.736-.547a2 2 0 00-1.022.547l-2.34 2.34a1 1 0 001.14 1.607L4.63 18.5a2 2 0 011.022-.547l2.387-.477a6 6 0 013.86-.517l.673-.337a4 4 0 002.509-.336l2.736.547a2 2 0 011.022.547l2.34 2.34a1 1 0 001.14-1.607l-2.34-2.34z" /></svg>
                Dossier Médical Critique
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select v-model="form.bloodGroup" class="w-full px-4 py-2 rounded-lg border border-slate-200 font-bold text-red-600 bg-white">
                    <option value="">-- Groupage et Rhésus --</option>
                    <option v-for="grp in ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']" :key="grp" :value="grp">{{ grp }}</option>
                </select>
                <input v-model="form.allergies" placeholder="Allergies connues" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-red-500 outline-none" />
                <input v-model="form.antecedantMajeurs" placeholder="Antécédents majeurs" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-red-500 outline-none" />
                <input v-model="form.medicamentEnCours" placeholder="Médicaments en cours" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-red-500 outline-none" />
            </div>
        </section>

        <section class="p-5 rounded-2xl border border-slate-200 bg-white shadow-inner space-y-4">
            <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Affectations & Administration</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="space-y-1">
                    <label class="text-[10px] font-bold text-slate-400 uppercase">Médecin responsable</label>
                    <select v-model="form.doctorId" required class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                        <option value="">-- Sélectionner --</option>
                        <option v-for="doc in availableDoctors" :key="doc.id" :value="doc.id">Dr. {{ doc.lastName }} ({{ doc.speciality }})</option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-bold text-slate-400 uppercase">Chambre assignée</label>
                    <select class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                        <option :value="null">-- Non assignée --</option>
                        <option v-for="room in availableRooms" :key="room.id" :value="room.id">Chambre {{ room.number }} ({{ room.capacity - room.patients.length }} dispos)</option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-bold text-slate-400 uppercase">Mode d'arrivée</label>
                    <select v-model="form.modeArrivee" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                        <option value="">-- Mode --</option>
                        <option>Ambulance</option>
                        <option>Par ses propres moyens</option>
                        <option>Urgences</option>
                    </select>
                </div>
            </div>
        </section>

        <section class="p-5 rounded-2xl border border-blue-100 bg-blue-50/30 space-y-4">
            <h3 class="text-sm font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">Accompagnant / Confiance</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input v-model="form.personneDeConfiance" placeholder="Nom complet" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-blue-500 outline-none" />
                <input v-model="form.numeroDePersonneConfiance" type="number" placeholder="Téléphone" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-blue-500 outline-none font-mono" />
                <input v-model="form.lienDeParente" placeholder="Lien (ex: Épouse, Frère)" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-blue-500 outline-none" />
            </div>
        </section>

        <div class="pt-4">
            <button type="submit" 
                class="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                {{ editMode ? 'Mettre à jour le dossier' : 'Valider l\'admission' }}
            </button>
        </div>
    </form>
</template>