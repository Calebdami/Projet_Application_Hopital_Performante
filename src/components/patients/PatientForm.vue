<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h3>{{ editMode ? 'Modifier' : 'Ajouter' }} Patient</h3>

    <select v-model="form.status">
      <option value="hospitalized">Hospitalisé</option>
      <option value="discharged">Sorti</option>
      <option value="pending">En attente</option>
    </select>

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

    <section>
      <h3>Affectations</h3>

      <!-- Médecin -->
      <section>
        <h3>Médecin assigné</h3>
        <select v-model="form.doctorId" required>
          <option value="">-- Sélectionner un médecin --</option>
          <option v-for="doc in availableDoctors" :key="doc.id" :value="doc.id">
            {{ doc.firstName }} {{ doc.lastName }} ({{ doc.speciality }})
          </option>
        </select>
<<<<<<< HEAD
      </section>
      <!-- Chambre -->
      <select v-model="form.roomId">
        <option :value="null">-- Assigner une chambre --</option>
        <option v-for="room in availableRooms" :key="room.id" :value="room.id">
          Chambre {{ room.number }} ({{ room.capacity - room.patients.length }} place(s) dispo)
        </option>
      </select>
    </section>

    <!-- ========================= --><!-- 5. PROFESSION & ARRIVÉE --><!-- ========================= -->
    <section>
      <h3>Informations administratives</h3>
=======
        
        <!-- ========================= IDENTITÉ DU PATIENT --><!-- ========================= -->
        <section>
            <h3>Identité</h3>

            <select v-model="form.room">
                <option value="">-- Choix de chambres --</option>
                <option value="oui">OUI</option>
                <option value="non">NON</option>
            </select>
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
>>>>>>> ec3f1cfe98d27bc11875b716e1dd70d1153db07f

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

    <button type="submit">
      {{ editMode ? 'Mettre à jour' : 'Créer' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import { useRooms } from '@/composables/useRooms'
import { useDoctors } from '@/composables/useDoctors' // si tu as un composable doctor


const availableDoctors = computed(() => doctors.value.filter((d) => d.available))

<<<<<<< HEAD
const props = defineProps({
  modelValue: Object,
  editMode: Boolean,
})
=======
    let form = reactive({
        status: 'pending',
        firstName: '',
        lastName: '',
        phone: '',
        room: '',
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
>>>>>>> ec3f1cfe98d27bc11875b716e1dd70d1153db07f

const emit = defineEmits(['submit'])

const { rooms } = useRooms()
const { doctors } = useDoctors()

// Chambres avec places disponibles
const availableRooms = computed(() =>
  rooms.value.filter((room) => room.patients.length < room.capacity),
)

const defaultForm = {
  status: 'pending',
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
  role: 'patient',

  // 🔥 Nouveaux champs métier
  doctorId: null,
  roomId: null,
}

const form = reactive({ ...defaultForm })

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val)
  },
  { immediate: true },
)

function resetForm() {
  Object.assign(form, defaultForm)
}

function handleSubmit() {
  emit('submit', { ...form })
  if (!props.editMode) resetForm()
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

button {
  padding: 8px 14px;
}
</style>
