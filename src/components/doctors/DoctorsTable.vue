<template>
    <div class="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-800/50 border-b border-slate-700">
                    <th class="p-4 text-xs font-bold uppercase tracking-widest text-cyan-400">ID</th>
                    <th class="p-4 text-xs font-bold uppercase tracking-widest text-cyan-400">Médecin</th>
                    <th class="p-4 text-xs font-bold uppercase tracking-widest text-cyan-400">Spécialité</th>
                    <th class="p-4 text-xs font-bold uppercase tracking-widest text-cyan-400">Contact</th>
                    <th class="p-4 text-xs font-bold uppercase tracking-widest text-cyan-400">Statut</th>
                    <th class="p-4 text-xs font-bold uppercase tracking-widest text-cyan-400 text-center">Actions</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-slate-800/50">
                <tr v-for="doctor in doctors" :key="doctor.id" class="hover:bg-cyan-950/20 transition-colors group">
                    <td class="p-4 text-slate-500 font-mono text-sm">#{{ doctor.id }}</td>
                    <td class="p-4 font-semibold text-white">{{ doctor.name }}</td>
                    <td class="p-4">
                        <span class="text-slate-300 bg-slate-800 px-2 py-1 rounded text-xs border border-slate-700">
                            {{ doctor.speciality }}
                        </span>
                    </td>
                    <td class="p-4 text-slate-400 text-sm italic">{{ doctor.phone }}</td>
                    <td class="p-4">
                        <span :class="doctor.available
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'"
                            class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border">
                            {{ doctor.available ? '● Disponible' : '○ Occupé' }}
                        </span>
                    </td>
                    <td class="p-4">
                        <div class="flex justify-center gap-3">
                            <button @click="$emit('edit', doctor)"
                                class="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white border border-cyan-500/20 transition-all active:scale-90"
                                title="Modifier">
                                ✏️
                            </button>
                            <button @click="$emit('delete', doctor.id)"
                                class="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all active:scale-90"
                                title="Supprimer">
                                🗑️
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
defineProps({
    doctors: {
        type: Array,
        default: () => []
    }
})
</script>

<style scoped>
/* Plus besoin de CSS custom, tout est géré par Tailwind */
</style>