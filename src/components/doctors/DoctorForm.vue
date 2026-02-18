<template>
    <form @submit.prevent="handleSubmit" class="form">
        <h3>{{ editMode ? 'Modifier' : 'Ajouter' }} Médecin</h3>

        <!-- ===================== -->
        <!-- 1. ÉTAT CIVIL -->
        <!-- ===================== -->
        <section>
            <h3>1. État Civil et Contact</h3>

            <input v-model="form.title" placeholder="Titre (Dr., Pr.)" />
            <input v-model="form.name" placeholder="Nom complet" required />

            <input type="file" accept="image/*" @change="handlePhoto" />

            <input v-model="form.phone" placeholder="Téléphone professionnel" />
            <input v-model="form.email" type="email" placeholder="Email institutionnel" required />

            <label>Langues parlées :</label>
            <div>
                <label><input type="checkbox" value="francais" v-model="form.languages" /> Français</label>
                <label><input type="checkbox" value="fon" v-model="form.languages" /> Fon</label>
                <label><input type="checkbox" value="goun" v-model="form.languages" /> Goun</label>
                <label><input type="checkbox" value="yoruba" v-model="form.languages" /> Yoruba</label>
                <label><input type="checkbox" value="autres" v-model="form.languages" /> Autres</label>
            </div>
        </section>

        <!-- ===================== -->
        <!-- 2. QUALIFICATIONS -->
        <!-- ===================== -->
        <section>
            <h3>2. Qualifications</h3>

            <input v-model="form.rpps" placeholder="Numéro d'Ordre / RPPS" />
            <input v-model="form.speciality" placeholder="Spécialité principale" required />
            <input v-model="form.subSpeciality" placeholder="Sous-spécialités" />
            <textarea v-model="form.diplomas" placeholder="Diplômes et certifications"></textarea>
        </section>

        <!-- ===================== -->
        <!-- 3. AFFECTATION -->
        <!-- ===================== -->
        <section>
            <h3>3. Affectation et Rôle</h3>

            <input v-model="form.department" placeholder="Service d'affectation" />
            <input v-model="form.grade" placeholder="Grade / Fonction" />
            <input v-model="form.officeNumber" placeholder="Numéro de bureau" />
            <label for="">Mot de Passe</label>
            <input v-model="form.passeword" type="password" placeholder="****" required>
            <label>Signature numérique :</label>
            <input type="file" accept="image/*" @change="handleSignature" />
        </section>

        <!-- ===================== -->
        <!-- 4. DISPONIBILITÉS -->
        <!-- ===================== -->
        <section>
            <h3>4. Gestion du Temps</h3>

            <select v-model="form.contractType">
                <option value="full-time">Temps plein</option>
                <option value="part-time">Temps partiel</option>
                <option value="on-call">Garde uniquement</option>
            </select>

            <input v-model="form.consultationHours" placeholder="Horaires de consultation" />

            <label>
                <input type="checkbox" v-model="form.onCall" />
                Disponible pour les gardes
            </label>
        </section>

        <!-- ===================== -->
        <!-- 5. PARAMÈTRES SYSTÈME -->
        <!-- ===================== -->
        <section>
            <h3>5. Paramètres Système</h3>

            <input v-model="form.username" placeholder="Identifiant de connexion" />
            <input type="password" v-model="form.password" placeholder="Mot de passe" />

            <input type="number" v-model="form.patientQuota" placeholder="Quota patients / jour" />

            <select v-model="form.acl">
                <option value="standard">Accès standard</option>
                <option value="advanced">Accès avancé</option>
                <option value="admin-medical">Admin médical</option>
            </select>
        </section>

        <!-- ===================== -->
        <!-- 6. DIVERS -->
        <!-- ===================== -->
        <section>
            <h3>6. Divers</h3>

            <textarea v-model="form.requiredEquipment" placeholder="Matériel spécifique requis"></textarea>
            <textarea v-model="form.bio" placeholder="Biographie courte"></textarea>
        </section>

        <label>
            <input type="checkbox" v-model="showBankInfo" /> Ajouter mes informations bancaires
        </label>

        <section v-if="showBankInfo">
            <h3>Informations bancaires</h3>

            <!-- Banque principale -->
            <input
                v-model="form.bankName"
                type="text"
                placeholder="Nom de la banque"
            />

            <!-- Numéro de compte -->
            <input
                v-model="form.accountNumber"
                type="text"
                placeholder="Numéro de compte"
            />

            <!-- IBAN (si applicable) -->
            <input
                v-model="form.iban"
                type="text"
                placeholder="IBAN"
            />

            <!-- SWIFT/BIC -->
            <input
                v-model="form.swift"
                type="text"
                placeholder="SWIFT/BIC"
            />

            <!-- Type de compte -->
            <select v-model="form.accountType">
                <option value="">-- Type de compte --</option>
                <option value="checking">Compte courant</option>
                <option value="savings">Compte épargne</option>
            </select>
        </section>

        <label>
            Disponible
            <input type="checkbox" v-model="form.available" />
        </label>

        <button type="submit">
            {{ editMode ? 'Mettre à jour' : 'Créer' }}
        </button>
    </form>
</template>

<script setup>
    import { ref, reactive, watch } from 'vue'

    const props = defineProps({
        modelValue: Object,
        editMode: Boolean
    })

    const emit = defineEmits(['submit'])
    let showBankInfo = ref(true);
    const form = reactive({
        title: '',
        name: '',
        photo: '',
        phone: '',
        email: '',
        languages: [],

        rpps: '',
        speciality: '',
        subSpeciality: '',
        diplomas: '',

        department: '',
        grade: '',
        officeNumber: '',
        signature: '',

        contractType: 'full-time',
        consultationHours: '',
        onCall: false,

        username: '',
        password: '',
        patientQuota: 20,
        acl: 'standard',

        requiredEquipment: '',
        bio: '',

        bankName: '',
        accountNumber: '',
        iban: '',
        swift: '',
        accountType: '',
        available: true
    })

    watch(
        () => props.modelValue,
        (val) => {
            if (val) Object.assign(form, val)
        },
        { immediate: true }
    )

    function handlePhoto(e) {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => form.photo = reader.result
        reader.readAsDataURL(file)
    }

    function handleSignature(e) {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => form.signature = reader.result
        reader.readAsDataURL(file)
    }

    function handleSubmit() {
        emit('submit', { ...form })
    }
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    section {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    input,
    textarea,
    select {
        width: 100%;
        margin-top: 6px;
        margin-bottom: 10px;
        padding: 8px;
    }
</style>
