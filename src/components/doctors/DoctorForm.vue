<template>
    <form @submit.prevent="handleSubmit"
        class="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col gap-5">

        <h3 class="text-xl font-bold uppercase tracking-wider text-cyan-400 border-l-4 border-cyan-500 pl-3 mb-2">
            {{ editMode ? 'Modifier' : 'Ajouter' }} Médecin
        </h3>

        <div class="flex flex-col gap-4">
            <input v-model="form.name" placeholder="Nom complet" required
                class="bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600" />

            <input v-model="form.speciality" placeholder="Spécialité (ex: Cardiologie)" required
                class="bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600" />

            <input v-model="form.phone" placeholder="Téléphone professionnel" required
                class="bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600" />
        </div>

        <label class="flex items-center gap-3 cursor-pointer group">
            <div class="relative">
                <input type="checkbox" v-model="form.available" class="sr-only peer" />
                <div
                    class="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all">
                </div>
            </div>
            <span class="text-sm font-medium text-slate-400 group-hover:text-emerald-400 transition-colors">
                Personnel disponible
            </span>
        </label>

        <button type="submit"
            class="mt-2 w-full py-3 px-6 rounded-lg font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-lg"
            :class="editMode
                ? 'bg-amber-600/20 text-amber-500 border border-amber-500/50 hover:bg-amber-500 hover:text-white shadow-amber-900/20'
                : 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white shadow-cyan-900/20'">
            {{ editMode ? 'Mettre à jour la fiche' : 'Enregistrer le profil' }}
        </button>
    </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
    modelValue: Object,
    editMode: Boolean
})

const emit = defineEmits(['submit'])

const form = reactive({
    name: '',
    speciality: '',
    phone: '',
    available: true
})

watch(
    () => props.modelValue,
    (val) => {
        if (val) Object.assign(form, val)
    },
    { immediate: true }
)

function handleSubmit() {
    emit('submit', { ...form })
}
</script>

<style scoped>
/* Les styles ont été migrés vers les classes Tailwind pour plus de performance */
</style>