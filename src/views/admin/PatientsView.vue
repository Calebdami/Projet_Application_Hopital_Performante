<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { usePatients } from '@/composables/usePatients'

    import PatientForm from '@/components/patients/PatientForm.vue'
    import PatientsTable from '@/components/patients/PatientsTable.vue'

    const router = useRouter()
    const { patients, addPatient, updatePatient, deletePatient } = usePatients()

    const editMode = ref(false)
    const selectedPatient = ref(null)

    function savePatient(data) {
        if (editMode.value) {
            updatePatient(selectedPatient.value.id, data)
        } else {
            addPatient(data)
        }

        editMode.value = false
        selectedPatient.value = null
    }

    function startEdit(patient) {
        editMode.value = true
        selectedPatient.value = patient
    }

    function removePatient(id) {
        deletePatient(id)
    }

    function goToDetail(id) {
        router.push(`/patients/${id}`)
    }
</script>

<template>
    <div class="space-y-6 animate-fade-in">
        <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Gestion des Patients</h2>
            </div>

            <div class="flex flex-col lg:flex-row gap-8 items-start">
            
                <div class="w-full lg:flex-[0_0_68%] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h3 class="font-semibold text-slate-700 flex items-center gap-2">
                            <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {{ editMode ? 'Modifier la fiche patient' : 'Enregistrer un nouveau patient' }}
                        </h3>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Formulaire SMR</span>
                    </div>
                    
                    <div class="p-6">
                        <PatientForm
                            :editMode="editMode"
                            :modelValue="selectedPatient"
                            @submit="savePatient"
                        />
                    </div>
                </div>

            <div class="w-full lg:flex-[0_0_30%] space-y-4">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 class="font-semibold text-slate-700">Liste Récente</h3>
                    </div>
                    
                    <div class="p-2">
                        <PatientsTable
                        :patients="patients"
                        @edit="startEdit"
                        @delete="removePatient"
                        @view="goToDetail"
                        />
                    </div>
                </div>

                <div class="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <div class="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                        <p class="text-xs text-blue-700 leading-relaxed">
                            Sélectionnez un patient dans la liste pour modifier ses informations ou consulter son dossier complet.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>