<script setup>
import { reactive, ref, computed } from 'vue'
import { usePatients } from '@/composables/usePatients'
import { useRooms } from '@/composables/useRooms'
import { useDoctors } from '@/composables/useDoctors'

const { rooms, availablePlaces, assignPatient, removePatient } = useRooms()
const { patients, addPatient, updatePatient, deletePatient } = usePatients()
const {doctors} = useDoctors()

const availableDoctors = computed(() =>
  doctors.value.filter(d => d.available)
)


const form = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  phone: '',
  bloodGroup: '',
  status: '',
  doctorId: '',
  roomNumber: '',
})

const isEditing = ref(false)
let editingId = null

function handleSubmit() {
  if (isEditing.value) {
    updatePatient(editingId, form)
  } else {
    const newPatient = addPatient(form)
    if (form.roomNumber) {
      assignPatient(form.roomNumber, newPatient.id)
    }
  }
  resetForm()
}

function handleDelete(patient) {
  if (patient.roomNumber) {
    removePatient(patient.roomNumber, patient.id)
  }
  deletePatient(patient.id)
}

function editPatient(patient) {
  Object.assign(form, patient)
  editingId = patient.id
  isEditing.value = true
}

function resetForm() {
  Object.keys(form).forEach((key) => (form[key] = ''))
  editingId = null
  isEditing.value = false
}
</script>

<template>
  <div class="medical-container">
    <section class="card">
      <h2 class="section-title">{{ isEditing ? 'Modifier la fiche' : 'Admission Patient' }}</h2>
      <form @submit.prevent="handleSubmit" class="medical-form">
        <div class="form-grid">
          <div class="field">
            <label>Prénom</label>
            <input v-model="form.firstName" type="text" placeholder="ex: Jean" required />
          </div>

          <div class="field">
            <label>Nom</label>
            <input v-model="form.lastName" type="text" placeholder="ex: Dupont" required />
          </div>

          <div class="field">
            <label>Sexe</label>
            <select v-model="form.gender" required>
              <option value="" disabled>Choisir...</option>
              <option value="male">Masculin</option>
              <option value="female">Féminin</option>
            </select>
          </div>

          <div class="field">
            <label>Téléphone</label>
            <input v-model="form.phone" type="tel" placeholder="01 02 03 04 05" required />
          </div>

          <div class="field">
            <label>Groupe Sanguin</label>
            <select v-model="form.bloodGroup" required>
              <option value="" disabled>Sélectionner</option>
              <option
                v-for="group in ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']"
                :key="group"
              >
                {{ group }}
              </option>
            </select>
          </div>

          <div class="field">
            <label>Statut</label>
            <select v-model="form.status" required>
              <option value="" disabled>Sélectionner</option>
              <option value="inpatient">Hospitalisé</option>
              <option value="outpatient">Ambulatoire</option>
            </select>
          </div>

          <select v-model="form.doctorId">
            <option disabled value="">Choisir un médecin</option>

            <option v-for="doctor in availableDoctors" :key="doctor.id" :value="doctor.id">
              {{ doctor.name }}
            </option>
          </select>

          <div class="field">
            <label>Chambre</label>
            <select v-model="form.roomNumber">
              <option value="">Sans affectation</option>
              <option
                v-for="room in rooms"
                :key="room.number"
                :value="room.number"
                :disabled="availablePlaces(room.number) === 0 || room.status === 'maintenance'"
              >
                Chambre {{ room.number }} ({{ availablePlaces(room.number) }} places)
              </option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="resetForm" class="btn-secondary">Annuler</button>
          <button type="submit" class="btn-primary">
            {{ isEditing ? 'Mettre à jour' : 'Enregistrer le patient' }}
          </button>
        </div>
      </form>
    </section>

    <section class="card">
      <h2 class="section-title">Registre des Patients</h2>
      <div class="patient-list">
        <div v-for="patient in patients" :key="patient.id" class="patient-item">
          <div class="patient-info">
            <span class="patient-name">{{ patient.firstName }} {{ patient.lastName }}</span>
            <span class="patient-badge" :class="patient.status">{{ patient.status }}</span>
          </div>
          <div class="patient-actions">
            <button @click="editPatient(patient)" class="btn-icon" title="Modifier">✏️</button>
            <button @click="handleDelete(patient)" class="btn-icon delete" title="Supprimer">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.medical-container {
  max-width: 900px;
  margin: 2rem auto;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2c3e50;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #edf2f7;
  color: #1a202c;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

input,
select {
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3498db;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-primary {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  background: #f1f5f9;
  color: #64748b;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.patient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.patient-name {
  font-weight: 500;
}

.patient-badge {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 12px;
  margin-left: 10px;
  background: #e2e8f0;
}

.patient-badge.inpatient {
  background: #dcfce7;
  color: #166534;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  font-size: 1.1rem;
  filter: grayscale(1);
  opacity: 0.6;
}

.btn-icon:hover {
  opacity: 1;
  filter: grayscale(0);
}
</style>
