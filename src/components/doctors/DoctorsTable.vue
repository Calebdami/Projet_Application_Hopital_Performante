<script setup>
    import { defineProps, defineEmits } from 'vue'
    import { useRouter } from 'vue-router'

    const props = defineProps({
        doctors: {
            type: Array,
            default: () => [],
        },
        patients: {
            type: Array,
            default: () => [],
        },
    })

    const emit = defineEmits(['edit', 'delete']);
    const router = useRouter()

    // Fonction pour naviguer vers le profil détaillé
    const viewDetails = (id) => {
        router.push(`/doctors/${id}`) // Ajuste le chemin selon ta configuration de route
    }
</script>

<template>
    <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-50/50 border-b border-slate-200">
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Praticien</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">ID / RPPS</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Expertise</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Statut</th>
                    <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Gestion</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr 
                    v-for="doctor in doctors" 
                    :key="doctor.id"
                    class="hover:bg-indigo-50/30 transition-all duration-200 group"
                >
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <div class="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xs shadow-inner uppercase">
                                {{ doctor.name ? doctor.name.split(' ').map(n => n[0]).join('').slice(0, 1): 'M' }}
                            </div>
                            <div>
                                <div class="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                    {{ doctor.name ? doctor.name[0].toUpperCase()+doctor.name.slice(1): 'Medecin' }}
                                </div>
                                <div class="text-[10px] font-medium text-indigo-500 uppercase">{{ doctor.title || 'Médecin' }}</div>
                            </div>
                        </div>
                    </td>

                    <td class="px-6 py-4">
                        <div class="flex flex-col">
                            <span class="text-xs font-mono text-slate-500 font-bold">
                                {{ doctor.rpps || 'Non renseigné' }}
                            </span>
                            <span class="text-[9px] text-slate-400 uppercase tracking-tighter">ID: #{{ doctor.id.toString().padStart(4, '0') }}</span>
                        </div>
                    </td>

                    <td class="px-6 py-4">
                        <div class="flex flex-col">
                            <span class="text-sm font-semibold text-slate-700">{{ doctor.speciality }}</span>
                            <span class="text-[10px] text-slate-400 italic">{{ doctor.department || 'Service général' }}</span>
                        </div>
                    </td>

                    <td class="px-6 py-4">
                        <div class="flex items-center gap-2">
                            <span 
                                class="relative flex h-2 w-2"
                                :class="doctor.available ? 'text-emerald-500' : 'text-slate-300'"
                            >
                                <span v-if="doctor.available" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                            </span>
                            <span class="text-[11px] font-bold uppercase tracking-tighter" :class="doctor.available ? 'text-emerald-700' : 'text-slate-400'">
                                {{ doctor.available ? 'En service' : 'Indisponible' }}
                            </span>
                        </div>
                    </td>

                    <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                @click="viewDetails(doctor.id)"
                                class="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Voir la fiche"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>

                            <button 
                                @click="$emit('edit', doctor)"
                                class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Modifier le profil"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>     

                            <button 
                                @click="$emit('delete', doctor.id)"
                                class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Supprimer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div v-if="doctors.length === 0" class="p-10 text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
            <p class="text-slate-400 text-sm italic">Aucun médecin enregistré dans l'annuaire.</p>
        </div>
    </div>
</template>

<style scoped>
    @reference "../../assets/styles/main.css";

    .overflow-x-auto {
        scrollbar-width: thin;
        scrollbar-color: #e2e8f0 transparent;
    }
</style>