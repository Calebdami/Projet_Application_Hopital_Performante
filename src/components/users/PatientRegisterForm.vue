<template>
    <form @submit.prevent="submitForm" class="form">

        <!-- ========================= --><!-- 1. IDENTITÉ DU PATIENT --><!-- ========================= -->
        <section>
            <h3>Identité</h3>

            <input v-model="form.firstName" placeholder="Prénom" required />
            <input v-model="form.lastName" placeholder="Nom" required />
            <input v-model="form.birthday" type="date" />
            <select v-model="form.gender">
                <option value="male">Homme</option>
                <option value="female">Femme</option>
            </select>

            <input type="file" accept="image/*" @change="handlePhoto" />
            <input v-model="form.numeroIP" placeholder="Numéro IP" type="number" />
        </section>

        <!-- ========================= --><!-- 2. CONTACT --><!-- ========================= -->
        <section>
            <h3>Contact</h3>

            <input v-model="form.phone" placeholder="Téléphone" />
            <input v-model="form.email" type="email" placeholder="Email" />
        </section>

        <!-- ========================= --><!-- 3. LANGUES --><!-- ========================= -->
        <section>
            <h3>Langues parlées</h3>

            <label><input type="checkbox" value="francais" v-model="form.languages" /> Français</label>
            <label><input type="checkbox" value="fon" v-model="form.languages" /> Fon</label>
            <label><input type="checkbox" value="goun" v-model="form.languages" /> Goun</label>
            <label><input type="checkbox" value="yoruba" v-model="form.languages" /> Yoruba</label>
            <label><input type="checkbox" value="autres" v-model="form.languages" /> Autres</label>
        </section>

        <!-- ========================= --><!-- 4. INFOS MÉDICALES --><!-- ========================= -->
        <section>
            <h3>Informations médicales</h3>

            <select v-model="form.bloodGroup">
                <option value="">-- Groupage et Rhésus --</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>

            <input v-model="form.allergies" placeholder="Allergies" />
            <input v-model="form.antecedantMajeurs" placeholder="Antécédents majeurs" />
            <input v-model="form.medicamentEnCours" placeholder="Médicaments en cours" />
        </section>

        <!-- ========================= --><!-- 5. PROFESSION & ARRIVÉE --><!-- ========================= -->
        <section>
            <h3>Informations administratives</h3>

            <select v-model="form.profession">
                <option value="">-- Profession --</option>
                <option>Enseignant(e)</option>
                <option>Étudiant(e)</option>
                <option>Commerçant(e)</option>
                <option>Agriculteur</option>
                <option>Chauffeur</option>
                <option>Fonctionnaire</option>
                <option>Entrepreneur</option>
                <option>Employé de bureau</option>
                <option>Infirmier(e)</option>
                <option>Aide-soignant(e)</option>
                <option>Pharmacien(ne)</option>
                <option>Assistant(e) social(e)</option>
                <option>Électricien(ne)</option>
                <option>Maçon</option>
                <option>Mécanicien(ne)</option>
                <option>Autres</option>
            </select>

            <select v-model="form.modeArrivee">
                <option value="">-- Mode d'arrivée --</option>
                <option>Ambulance</option>
                <option>Par ses propres moyens</option>
                <option>Urgences</option>
            </select>

            <select v-model="form.priseEnCharge">
                <option value="">-- Prise en charge --</option>
                <option value="oui">Avec prise en charge</option>
                <option value="non">Sans prise en charge</option>
            </select>
        </section>

        <!-- ========================= --><!-- 6. PERSONNE DE CONFIANCE --><!-- ========================= -->
        <section>
            <h3>Personne de confiance</h3>

            <input v-model="form.personneDeConfiance" placeholder="Nom" />
            <input v-model="form.numeroDePersonneConfiance" type="number" placeholder="Téléphone" />
            <input v-model="form.lienDeParente" placeholder="Lien de parenté" />
        </section>

        <button type="submit">Créer Patient</button>
    </form>
</template>

<script setup>
    import { reactive } from 'vue'

    const emit = defineEmits(['submit'])

    const form = reactive({
        firstName: '',
        lastName: '',
        phone: '',
        gender: 'male',
        bloodGroup: '',
        birthday: '',
        numeroIP: '',
        photoIP: '',
        email: '',
        allergies: '',
        antecedantMajeurs: '',
        medicamentEnCours: '',
        personneDeConfiance: '',
        numeroDePersonneConfiance: '',
        lienDeParente: '',
        priseEnCharge: '',
        profession: '',
        modeArrivee: '',
        languages: [],
        role: 'patient'
    })

    function handlePhoto(event) {
        const file = event.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            form.photoIP = reader.result
        }
        reader.readAsDataURL(file)
    }

    function submitForm() {
        emit('submit', { ...form })
    }
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    section {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    input,
    select {
        width: 100%;
        margin-top: 6px;
        margin-bottom: 10px;
        padding: 8px;
    }
</style>
