<script setup>
    import { ref } from 'vue'
    import { useAppointments } from '@/composables/useAppointments'

    import AppointmentForm from '@/components/appointments/AppointmentForm.vue'
    import AppointmentsTable from '@/components/appointments/AppointmentsTable.vue'

    const {
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment
    } = useAppointments()

    const editMode = ref(false)
    const selectedAppointment = ref(null)

    function saveAppointment(data) {
        try {
            if (editMode.value) {
                updateAppointment(selectedAppointment.value.id, data)
            } else {
                addAppointment(data)
            }

            editMode.value = false
            selectedAppointment.value = null
        } catch (err) {
            alert(err.message)
        }
    }

    function startEdit(appt) {
        editMode.value = true
        selectedAppointment.value = appt
    }

    function removeAppointment(id) {
        deleteAppointment(id)
    }
</script>

<template>
    <div class="space-y-8 animate-fade-in">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex items-center gap-4">
                <div class="p-3 bg-teal-500 rounded-xl shadow-lg shadow-teal-100 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Planning des Rendez-vous</h2>
                    <p class="text-sm text-slate-500 font-medium flex items-center gap-1">
                        <span class="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                        Gestion des consultations en temps réel
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div class="text-right hidden sm:block">
                    <p class="text-xs text-slate-400 uppercase font-bold tracking-widest">Aujourd'hui</p>
                    <p class="text-sm font-bold text-teal-600">{{ appointments.length }} Consultations</p>
                </div>
            </div>
        </div>

        <section class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
            <div class="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {{ editMode ? 'Édition de créneau' : 'Programmation' }}
                </span>
                <div class="flex gap-1">
                    <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                </div>
            </div>
            <div class="p-6">
                <AppointmentForm
                :editMode="editMode"
                :modelValue="selectedAppointment"
                @submit="saveAppointment"
                />
            </div>
        </section>

        <section class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-white to-slate-50">
                <h3 class="font-bold text-slate-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Liste des passages prévus
                </h3>
                <div class="flex gap-2">
                    <span class="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-500 shadow-sm">
                        Filtre : Tous
                    </span>
                </div>
            </div>
        
            <div class="p-0 sm:p-2"> <AppointmentsTable
                :appointments="appointments"
                @edit="startEdit"
                @delete="removeAppointment"
                />
            </div>
        </section>
    </div>
</template>

<style scoped>
    .animate-fade-in {
        animation: fadeIn 0.4s ease-out forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Effet de focus subtil sur les sections au survol */
    section {
        transition: transform 0.2s ease-in-out;
    }
    section:hover {
        border-color: #99f6e4; /* teal-200 */
    }
</style>