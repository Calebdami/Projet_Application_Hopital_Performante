<script setup>
    import { defineProps, defineEmits } from 'vue'

    // Props : la liste des patients
    const props = defineProps({
        patients: {
            type: Array,
            default: () => []
        }
    })
    // Déclaration des événements émis vers le parent
    const emit = defineEmits(['view', 'edit', 'delete'])
    
</script>

<template>
    <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-50 border-b border-slate-200">
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Patient</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Genre</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Statut</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
                <tr 
                v-for="patient in patients" 
                :key="patient.id"
                class="hover:bg-blue-50/50 transition-colors duration-150 group"
                >
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <div class="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                {{ patient.firstName[0] }}{{ patient.lastName[0] }}
                            </div>
                            <div>
                                <div class="text-sm font-bold text-slate-800">{{ patient.firstName }} {{ patient.lastName }}</div>
                                <div class="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">ID: {{ patient.id.toString().slice(0,8) }}</div>
                            </div>
                        </div>
                    </td>

                    <td class="px-6 py-4">
                        <span class="text-sm text-slate-600 flex items-center gap-1">
                        <span v-if="patient.gender === 'male'" class="text-blue-500">♂</span>
                        <span v-else class="text-pink-500">♀</span>
                            {{ patient.gender === 'male' ? 'Homme' : 'Femme' }}
                        </span>
                    </td>

                    <td class="px-6 py-4">
                        <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold leading-4 tracking-tight"
                        :class="{
                            'bg-emerald-100 text-emerald-700': patient.status === 'Sorti(e)',
                            'bg-amber-100 text-amber-700': patient.status === 'En attente',
                            'bg-blue-100 text-blue-700': patient.status === 'Hospitalise(e)'
                        }"
                        >
                            {{ patient.status }}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <router-link 
                                :to="{ name: 'PatientDetail', params: { id: patient.id } }"
                                class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Détails"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </router-link>
                            <button 
                                @click="$emit('edit', patient)"
                                class="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                                title="Modifier"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>

                            <button 
                                @click="$emit('delete', patient.id)"
                                class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Supprimer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="patients.length === 0" class="p-12 text-center text-slate-400">
            Aucun patient enregistré pour le moment.
        </div>
    </div>
</template>
