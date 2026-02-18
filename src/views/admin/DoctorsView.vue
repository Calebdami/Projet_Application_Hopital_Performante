<script setup>
    import { ref } from 'vue'
    import { useDoctors } from '@/composables/useDoctors'

    import DoctorForm from '@/components/doctors/DoctorForm.vue'
    import DoctorsTable from '@/components/doctors/DoctorsTable.vue'
    import { usePatients } from '@/composables/usePatients'

    const { patients } = usePatients()

    const { doctors, addDoctor, updateDoctor, deleteDoctor } = useDoctors(patients)

    const editMode = ref(false)
    const selectedDoctor = ref(null)

    function saveDoctor(data) {
    if (editMode.value) {
        updateDoctor(selectedDoctor.value.id, data)
    } else {
        addDoctor(data)
    }

    editMode.value = false
    selectedDoctor.value = null
    }

    function startEdit(doctor) {
    editMode.value = true
    selectedDoctor.value = doctor
    }

    function removeDoctor(id) {
    deleteDoctor(id)
    }
</script>

<template>
    <div class="space-y-6 animate-fade-in">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div class="flex items-center gap-4">
                <div class="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">Corps Médical</h2>
                    <p class="text-sm text-slate-500 font-medium">Gestion des praticiens et spécialités</p>
                </div>
            </div>

            <div class="flex items-center px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100">
                <span class="text-indigo-700 text-sm font-bold">{{ doctors.length }} Médecins actifs</span>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 items-start">
        
            <div class="w-full lg:flex-[0_0_70%] transition-all duration-300">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div class="bg-slate-900 px-6 py-4 flex items-center justify-between">
                        <h3 class="text-white font-medium flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            {{ editMode ? 'Modifier le profil' : 'Ajouter un nouveau praticien' }}
                        </h3>
                        <span class="text-[10px] text-indigo-300 font-mono uppercase tracking-widest bg-indigo-900/50 px-2 py-1 rounded">Secrétariat RH</span>
                    </div>

                    <div class="p-6 lg:p-8 bg-gradient-to-b from-white to-slate-50/30">
                        <DoctorForm
                        :editMode="editMode"
                        :modelValue="selectedDoctor"
                        @submit="saveDoctor"
                        />
                    </div>
                </div>
            </div>

            <div class="w-full lg:flex-[0_0_30%] sticky top-6">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
                    <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                        <h3 class="font-bold text-slate-700 text-sm uppercase tracking-tight">Liste du personnel</h3>
                        <button class="text-indigo-600 hover:text-indigo-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>

                    <div class="overflow-y-auto p-2 custom-scrollbar">
                        <DoctorsTable
                        :doctors="doctors"
                        @edit="startEdit"
                        @delete="removeDoctor"
                        />
                    </div>
                    
                    <div class="p-4 bg-slate-50 border-t border-slate-100">
                        <p class="text-[10px] text-slate-400 text-center italic">
                            Dernière mise à jour : Aujourd'hui à 14:30
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
    .animate-fade-in {
        animation: slideIn 0.4s ease-out forwards;
    }

    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-10px); }
        to { opacity: 1; transform: translateX(0); }
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 10px;
    }
</style>