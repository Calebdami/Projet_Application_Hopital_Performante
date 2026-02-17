<template>
    <div>
        <h2>Inscription utilisateur</h2>

        <select v-model="role">
            <option value="doctor">Médecin</option>
            <option value="receptionist">Réceptionniste</option>
            <option value="patient">Patient</option>
        </select>

        <!-- FORMULAIRE DYNAMIQUE -->
        <DoctorRegisterForm
            v-if="role === 'doctor'"
            @submit="createUsers"
        />

        <ReceptionistRegisterForm
            v-if="role === 'receptionist'"
            @submit="createUsers"
        />

        <PatientRegisterForm
            v-if="role === 'patient'"
            @submit="createUsers"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useAuth } from '@/composables/useAuth'

    import DoctorRegisterForm from '@/components/users/DoctorRegisterForm.vue'
    import ReceptionistRegisterForm from '@/components/users/ReceptionistRegisterForm.vue'
    import PatientRegisterForm from '@/components/users/PatientRegisterForm.vue'

    const { createUser } = useAuth();

    const role = ref('doctor')

    function createUsers(data) {
        try {
            createUser(data)
            alert('Utilisateur créé')
        } catch (err) {
            alert(err.message)
        }
    }
</script>
