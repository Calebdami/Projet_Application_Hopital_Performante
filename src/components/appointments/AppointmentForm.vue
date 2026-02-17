<script setup>
import { reactive, ref } from 'vue'
import { usePatients } from '@/composables/usePatients' //importation des fonctions utilitaires concernant les patients
import { useDoctors } from '@/composables/useDoctors' //importation des fonctions utilitaires concernant les doctors
import { useAppointments } from '@/composables/useAppointments' //importation des fonctions utilitaires concernant les Rendez-vous

const { patients } = usePatients() // importation du localStorage des patients venant des fonctions utilitaires de usePatients
const { doctors } = useDoctors() // importation du localStorage des docteurs venant des fonctions utilitaires de useDoctors
// importation du localStorage des RDV, de l'ajout des RDV, de la mise à jour des RDV et de la suppression des RDV venant des fonctions utilitaires de useAppointments
const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments()

const today = new Date().toISOString().split('T')[0] //Cette ligne sert à récupérer la date d’aujourd’hui au format compatible avec un <input type="date">
//1️⃣ new Date() Crée un objet Date avec la date et l’heure actuelles.
//2️⃣ .toISOString() Transforme la date en format ISO standard : 2026-02-17T13:32:10.123Z
//3️⃣ .split('T') On coupe la chaîne au niveau du T.
//4️⃣ [0] On prend uniquement la première partie :

const form = reactive({
  //Définition des données du formulaire
  patientId: '',
  doctorId: '',
  date: '',
  startTime: '',
  endTime: '',
  status: 'pending',
})

const errors = reactive({
  //Définition des ereurs à afficher en cas des données qui ne sont pas renseignés
  patientId: '',
  doctorId: '',
  date: '',
  startTime: '',
  endTime: '',
})

const isEditing = ref(false) //Etat réactif Vue. false → on est en mode ajout && true → on est en mode modification
let editingId = null //Sert à stocker l’id de l’élément en cours de modification.

function validate() {
  //Permet de voir les cases requis
  let isValid = true
  Object.keys(errors).forEach((k) => (errors[k] = ''))

  if (!form.patientId) {
    errors.patientId = 'Patient requis'
    isValid = false
  }
  if (!form.doctorId) {
    errors.doctorId = 'Médecin requis'
    isValid = false
  }
  if (!form.date) {
    errors.date = 'Date requise'
    isValid = false
  }
  if (!form.startTime) {
    errors.startTime = 'Heure de début requise'
    isValid = false
  }
  if (!form.endTime) {
    errors.endTime = 'Heure de fin requise'
    isValid = false
  }
  if (form.startTime && form.endTime && form.endTime <= form.startTime) {
    errors.endTime = 'L’heure de fin doit être après l’heure de début'
    isValid = false
  }

  return isValid
}

// État pour stocker les notifications
const notifications = ref([])

function addNotification(message, type = 'success') {
  const id = Date.now()
  notifications.value.push({ id, message, type })

  // Suppression automatique après 3 secondes
  setTimeout(() => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }, 3000)
}

function handleSubmit() {
  // On vérifie que le formulaire est valide.
  // validate() retourne true ou false
  // Si c’est false, on arrête immédiatement la fonction
  if (!validate()) return

  try {
    const payload = { ...form }
    if (isEditing.value) {
      updateAppointment(editingId, payload)
      addNotification('Rendez-vous modifié avec succès')
    } else {
      addAppointment(payload)
      addNotification('Rendez-vous ajouté avec succès')
    }
    resetForm()
  } catch (error) {
    addNotification(error.message, 'error')
  }
}

function editAppointment(appt) {
  Object.assign(form, appt)
  editingId = appt.id
  isEditing.value = true
}

function resetForm() {
  form.patientId = ''
  form.doctorId = ''
  form.date = ''
  form.startTime = ''
  form.endTime = ''
  form.status = 'pending'
  editingId = null
  isEditing.value = false
}

function getPatientName(id) {
  const p = patients.value.find((p) => p.id === id)
  return p ? `${p.firstName} ${p.lastName}` : 'Inconnu'
}

function getDoctorName(id) {
  const d = doctors.value.find((d) => d.id === id)
  return d ? `${d.name} (${d.speciality})` : 'Inconnu'
}
</script>

<template>
  <div class="appointment-manager">
    <section class="medical-card">
      <h2 class="card-title">
        {{ isEditing ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="grid-form">
        <div class="form-group">
          <label>Patient</label>
          <select v-model.number="form.patientId" :class="{ 'input-error': errors.patientId }">
            <option disabled value="">Sélectionner un patient</option>
            <option v-for="p in patients" :key="p.id" :value="p.id">
              {{ p.firstName }} {{ p.lastName }}
            </option>
          </select>
          <span class="error-text" v-if="errors.patientId">{{ errors.patientId }}</span>
        </div>

        <div class="form-group">
          <label>Médecin</label>
          <select v-model.number="form.doctorId" :class="{ 'input-error': errors.doctorId }">
            <option disabled value="">Sélectionner un médecin</option>
            <option
              v-for="d in doctors"
              :key="d.id"
              :value="d.id"
              :disabled="d.status === 'unavailable'"
            >
              {{ d.name }} — {{ d.speciality }}
              {{ d.status === 'unavailable' ? '(Indisponible)' : '' }}
            </option>
          </select>
          <span class="error-text" v-if="errors.doctorId">{{ errors.doctorId }}</span>
        </div>

        <div class="form-group">
          <label>Date</label>
          <input
            type="date"
            v-model="form.date"
            :min="today"
            :class="{ 'input-error': errors.date }"
          />
          <span class="error-text" v-if="errors.date">{{ errors.date }}</span>
        </div>

        <div class="form-group">
          <label>Statut</label>
          <select v-model="form.status">
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>

        <div class="form-group">
          <label>Heure de début</label>
          <input
            type="time"
            v-model="form.startTime"
            :class="{ 'input-error': errors.startTime }"
          />
          <span class="error-text" v-if="errors.startTime">{{ errors.startTime }}</span>
        </div>

        <div class="form-group">
          <label>Heure de fin</label>
          <input type="time" v-model="form.endTime" :class="{ 'input-error': errors.endTime }" />
          <span class="error-text" v-if="errors.endTime">{{ errors.endTime }}</span>
        </div>

        <div class="form-actions">
          <button v-if="isEditing" type="button" @click="resetForm" class="btn btn-ghost">
            Annuler
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Enregistrer les modifications' : 'Confirmer le rendez-vous' }}
          </button>
        </div>
      </form>
    </section>

    <section class="medical-card">
      <h2 class="card-title">Agenda des rendez-vous</h2>
      <div class="appointment-list">
        <div v-for="appt in appointments" :key="appt.id" class="appointment-item">
          <div class="appt-details">
            <strong>{{ getPatientName(appt.patientId) }}</strong>
            <span class="appt-meta">avec Dr. {{ getDoctorName(appt.doctorId) }}</span>
            <span class="appt-time"
              >📅 {{ appt.date }} | 🕒 {{ appt.startTime }} - {{ appt.endTime }}</span
            >
          </div>

          <div class="appt-status-group">
            <span :class="['status-badge', appt.status]">{{ appt.status }}</span>
            <div class="appt-actions">
              <button @click="editAppointment(appt)" class="btn-icon" title="Modifier">✏️</button>
              <button @click="deleteAppointment(appt.id)" class="btn-icon delete" title="Supprimer">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div>
    <TransitionGroup name="toast" tag="div" class="notification-container">
      <div v-for="n in notifications" :key="n.id" :class="['notification', n.type]">
        <span class="noti-icon">{{ n.type === 'success' ? '✅' : '⚠️' }}</span>
        <span class="noti-message">{{ n.message }}</span>
        <button
          @click="notifications = notifications.filter((notif) => notif.id !== n.id)"
          class="noti-close"
        >
          ×
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* Conteneur fixe en haut à droite */
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Style des bulles de notification */
.notification {
  min-width: 280px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 4px solid #3b82f6;
  animation: slideIn 0.3s ease-out;
}

.notification.success { border-left-color: #22c55e; }
.notification.error { border-left-color: #ef4444; }

.noti-icon { font-size: 1.2rem; }
.noti-message { font-size: 0.9rem; font-weight: 500; color: #1e293b; flex: 1; }
.noti-close { 
  background: none; border: none; font-size: 1.2rem; color: #94a3b8; cursor: pointer; 
}

/* Animations Vue (TransitionGroup) */
.toast-enter-from { opacity: 0; transform: translateX(50px); }
.toast-leave-to { opacity: 0; transform: scale(0.9); }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
/* Conteneur principal */
.appointment-manager {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
  background-color: #f8fafc;
}

/* Cartes épurées */
.medical-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
}

.card-title {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
}

/* Formulaire en grille */
.grid-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

/* Inputs & Selects */
input,
select {
  padding: 0.6rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #334155;
  transition: all 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: #ef4444 !important;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.2rem;
}

/* Boutons */
.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.btn-ghost {
  background: transparent;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.btn:hover {
  opacity: 0.9;
}

/* Liste des RDV */
.appointment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s;
}

.appointment-item:hover {
  background-color: #f8fafc;
}

.appt-details {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.appt-meta {
  font-size: 0.9rem;
  color: #64748b;
}

.appt-time {
  font-size: 0.85rem;
  color: #3b82f6;
  font-weight: 500;
}

.appt-status-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Badges de statut */
.status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  text-transform: uppercase;
  background: #f1f5f9;
}

.status-badge.confirmed {
  background: #dcfce7;
  color: #166534;
}
.status-badge.pending {
  background: #fef9c3;
  color: #854d0e;
}
.status-badge.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.appt-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  filter: grayscale(1);
  opacity: 0.5;
}

.btn-icon:hover {
  opacity: 1;
  filter: grayscale(0);
  background: #f1f5f9;
}
</style>
