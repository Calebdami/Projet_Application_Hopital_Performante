<script setup>
    import { ref, watch } from 'vue'
    import { useAuth } from '@/composables/useAuth'

    import ReceptionistRegisterForm from '@/components/users/ReceptionistRegisterForm.vue'
    import PatientRegisterForm from '@/components/users/PatientRegisterForm.vue'
    import DoctorRegisterForm from '@/components/users/DoctorRegisterForm.vue'
    import { useNotificationStore } from '@/stores/notificationStore'
    const notify = useNotificationStore();
    const { createUser } = useAuth();

    const role = ref('doctor')

    function createUsers(data) {
        try {
            watch(role, (newRole) => {
                data[newRole] = role.value
                createUser(data)
            })
            notify.success('Utilisateur créé avec sucecc')
        } catch (err) {
            notify.info(err.message)
        }
    }
</script>

<template>
    <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div class="text-center space-y-2">
            <div class="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-2xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            </div>
            <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">Inscription Utilisateur</h2>
            <p class="text-slate-500 max-w-md mx-auto">Choisissez le type de profil pour configurer les accès et les permissions au sein de l'établissement.</p>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <label class="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider text-center">
                Type de compte à créer
            </label>
        
            <div class="relative max-w-md mx-auto">
                <select 
                v-model="role"
                class="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-4 px-6 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer font-semibold shadow-inner"
                >
                    <option value="doctor">🩺 Médecin / Praticien</option>
                    <option value="receptionist">💼 Réceptionniste / Accueil</option>
                    <option value="patient">👤 Patient (Dossier Médical)</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </div>

        <div class="transition-all duration-500 ease-in-out">
            <div v-if="role" class="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-white overflow-hidden">
                <div 
                class="px-8 py-4 flex items-center gap-3"
                :class="{
                    'bg-blue-600': role === 'doctor',
                    'bg-indigo-600': role === 'receptionist',
                    'bg-emerald-600': role === 'patient'
                }"
                >
                    <span class="text-white font-bold text-sm uppercase tracking-widest">
                        Configuration du profil : {{ role }}
                    </span>
                </div>

                <div class="p-8 lg:p-10">
                    <transition name="form-slide" mode="out-in">
                        <DoctorRegisterForm
                        v-if="role === 'doctor'"
                        :key="'doctor'"
                        @submit="createUsers"
                        />

                        <ReceptionistRegisterForm
                        v-else-if="role === 'receptionist'"
                        :key="'receptionist'"
                        @submit="createUsers"
                        />

                        <PatientRegisterForm
                        v-else-if="role === 'patient'"
                        :key="'patient'"
                        @submit="createUsers"
                        />
                    </transition>
                </div>
            </div>
        
            <div v-else class="text-center p-12 border-2 border-dashed border-slate-200 rounded-3xl">
                <p class="text-slate-400 italic">Veuillez sélectionner un rôle pour afficher le formulaire correspondant.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Animation de transition entre les formulaires */
    .form-slide-enter-active, .form-slide-leave-active {
        transition: all 0.3s ease;
    }
    .form-slide-enter-from {
        opacity: 0;
        transform: translateX(20px);
    }
    .form-slide-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }
</style>