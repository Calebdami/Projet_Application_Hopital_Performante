<template>
    <form @submit.prevent="submitForm" class="form">
        <!-- ========================= --><!-- 1. TITRE --><!-- ========================= -->
        <h3>Inscription Réceptionniste</h3>

        <!-- ========================= --><!-- 2. IDENTITÉ --><!-- ========================= -->
        <section>
            <h4>Identité</h4>
            <input
                v-model="form.name"
                placeholder="Nom complet"
                required
            />
        </section>

        <!-- ========================= --><!-- 3. CONTACT --><!-- ========================= -->
        <section>
            <h4>Contact</h4>
            <input
                v-model="form.email"
                type="email"
                placeholder="Email"
                required
            />
            <input
                v-model="form.phone"
                placeholder="Téléphone"
                required
            />
        </section>

        <!-- ========================= --><!-- 4. IDENTIFIANTS --><!-- ========================= -->
        <section>
            <h4>Identifiants de connexion</h4>
            <input
                v-model="form.password"
                type="password"
                placeholder="Mot de passe"
                required
            />
        </section>

        <!-- ========================= --><!-- 5. HORAIRES --><!-- ========================= -->
        <section>
            <h4>Horaires</h4>
            <select v-model="form.shift">
                <option value="morning">Matin</option>
                <option value="evening">Soir</option>
            </select>
        </section>

        <button type="submit">
            Créer Réceptionniste
        </button>
    </form>
</template>

<script setup>
    import { reactive } from 'vue'

    const emit = defineEmits(['submit'])

    const form = reactive({
        name: '',
        email: '',
        password: '',
        phone: '',
        shift: 'morning',
        role: 'receptionist'
    })

    function submitForm() {
        emit('submit', { ...form })
    }
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 400px;
    }

    section {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
    }

    input,
    select {
        width: 100%;
        margin-top: 6px;
        margin-bottom: 10px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    button {
        padding: 10px 16px;
        border: none;
        background: #111827;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
    }
</style>
