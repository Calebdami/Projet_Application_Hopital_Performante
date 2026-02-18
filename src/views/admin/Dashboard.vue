<script setup>
    import StatsCard from '@/components/dashboard/StatsCard.vue'
    import { usePatients } from '@/composables/usePatients'
    import { useDoctors } from '@/composables/useDoctors'
    import { useAppointments } from '@/composables/useAppointments'
    import { useRooms } from '@/composables/useRooms'

    const { patients } = usePatients()
    const { doctors } = useDoctors()
    const { appointments } = useAppointments()
    const { rooms } = useRooms()
</script>

<template>
    <div class="space-y-8 animate-fade-in">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">
                    Tableau de Bord <span class="text-blue-600 underline decoration-blue-200 underline-offset-8">Admin</span>
                </h2>
                <p class="text-slate-500 mt-2 text-sm font-medium">
                    Aperçu en temps réel des ressources hospitalières.
                </p>
            </div>
            
            <div class="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <span class="text-slate-600 font-semibold text-sm">18 Février 2026</span>
            </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <span class="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
                </div>
                <StatsCard title="Patients" :value="patients.length" class="text-slate-800 font-bold" />
            </div>

            <div class="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span class="text-xs font-medium text-slate-400 italic">En service</span>
                </div>
                <StatsCard title="Médecins" :value="doctors.length" />
            </div>

            <div class="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-rose-200 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="p-3 bg-rose-50 text-rose-600 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span class="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full">Aujourd'hui</span>
                </div>
                <StatsCard title="Rendez-vous" :value="appointments.length" />
            </div>

            <div class="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <span class="text-xs font-bold text-slate-400">Occupation 85%</span>
                </div>
                <StatsCard title="Chambres" :value="rooms.length" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Animation légère pour l'apparition des cartes */
    .animate-fade-in {
        animation: slideUp 0.5s ease-out forwards;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
