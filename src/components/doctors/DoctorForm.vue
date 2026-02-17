<template>
  <div class="doctor-management-container">
    <section class="medical-card registration-panel">
      <h2 class="card-title">
        {{ isEditing ? 'Modifier le profil' : 'Enregistrer un nouveau Praticien' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="medical-form">
        <div class="form-group">
          <label for="name">Nom complet</label>
          <input
            id="name"
            v-model="form.name"
            placeholder="Dr. Nom Prénom"
            :class="{ 'input-error': errors.name }"
          />
          <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="speciality">Spécialité</label>
          <input
            id="speciality"
            v-model="form.speciality"
            placeholder="ex: Cardiologue"
            :class="{ 'input-error': errors.speciality }"
          />
          <span class="error-text" v-if="errors.speciality">{{ errors.speciality }}</span>
        </div>

        <div class="form-group">
          <label for="phone">Ligne directe</label>
          <input
            id="phone"
            v-model="form.phone"
            placeholder="ex: 0123456789"
            :class="{ 'input-error': errors.phone }"
          />
          <span class="error-text" v-if="errors.phone">{{ errors.phone }}</span>
        </div>

        <div class="form-group availability-toggle">
          <label>Actuellement disponible</label>
          <label class="switch">
            <input type="checkbox" v-model="form.available" />
            <span class="slider round"></span>
          </label>
        </div>

        <div class="form-actions">
          <button v-if="isEditing" type="button" @click="resetForm" class="btn btn-ghost">
            Annuler
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Enregistrer les modifications' : 'Ajouter au registre' }}
          </button>
        </div>
      </form>
    </section>

    <section class="medical-card directory-panel">
      <div class="header-actions">
        <h2 class="card-title">Annuaire du personnel</h2>

        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher une spécialité ou un nom..."
            class="input"
          />
        </div>
      </div>

      <div class="doctor-grid">
        <div v-for="doctor in filteredDoctors" :key="doctor.id" class="doctor-card">
          <div class="doctor-status-bar" :class="doctor.status"></div>

          <div class="doctor-body">
            <h3 class="doctor-name">{{ doctor.name }}</h3>
            <span class="speciality-badge">{{ doctor.speciality }}</span>

            <div class="contact-info"><span class="icon">📞</span> {{ doctor.phone }}</div>

            <div class="status-indicator">
              <span class="dot" :class="doctor.status"></span>
              {{ doctor.status === 'available' ? 'Disponible' : 'Indisponible' }}
            </div>
          </div>

          <div class="doctor-actions">
            <button @click="editDoctor(doctor)" class="btn-icon" title="Éditer">✏️</button>
            <button @click="deleteDoctor(doctor.id)" class="btn-icon delete" title="Supprimer">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredDoctors.length === 0" class="empty-message">
        {{
          doctors.length === 0
            ? 'Aucun médecin enregistré.'
            : 'Aucun résultat pour cette recherche.'
        }}
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
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useDoctors } from '@/composables/useDoctors'

const { doctors, addDoctor, updateDoctor, deleteDoctor } = useDoctors()

// Logique de recherche
const searchQuery = ref('')
const filteredDoctors = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return doctors.value.filter(
    (d) => d.name.toLowerCase().includes(query) || d.speciality.toLowerCase().includes(query),
  )
})

const form = reactive({
  name: '',
  speciality: '',
  phone: '',
  available: true,
})

const errors = reactive({
  name: '',
  speciality: '',
  phone: '',
})

const isEditing = ref(false)
let editingId = null

function validate() {
  let isValid = true
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  if (!form.name) {
    errors.name = 'Le nom est requis'
    isValid = false
  }
  if (!form.speciality) {
    errors.speciality = 'La spécialité est requise'
    isValid = false
  }
  if (!form.phone) {
    errors.phone = 'Le téléphone est requis'
    isValid = false
  } else {
    const phonePattern = /^[0-9]{8,15}$/
    if (!phonePattern.test(form.phone)) {
      errors.phone = 'Téléphone invalide (8 à 15 chiffres)'
      isValid = false
    }
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

// Exemple d'utilisation dans handleSubmit :
function handleSubmit() {
  if (!validate()) return
  try {
    if (isEditing.value) {
      updateDoctor(editingId, form)
      addNotification('Profil médecin mis à jour')
    } else {
      addDoctor(form)
      addNotification('Nouveau médecin enregistré avec succès')
    }
    resetForm()
  } catch (error) {
    addNotification(error.message, 'error')
  }
}

function editDoctor(doctor) {
  Object.assign(form, {
    name: doctor.name,
    speciality: doctor.speciality,
    phone: doctor.phone,
    available: doctor.status === 'available',
  })
  editingId = doctor.id
  isEditing.value = true
}

function resetForm() {
  form.name = ''
  form.speciality = ''
  form.phone = ''
  form.available = true
  editingId = null
  isEditing.value = false
}
</script>

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

.notification.success {
  border-left-color: #22c55e;
}
.notification.error {
  border-left-color: #ef4444;
}

.noti-icon {
  font-size: 1.2rem;
}
.noti-message {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e293b;
  flex: 1;
}
.noti-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #94a3b8;
  cursor: pointer;
}

/* Animations Vue (TransitionGroup) */
.toast-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.toast-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
/* On réutilise la structure précédente avec l'ajout de la recherche */

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.card-title {
  margin-bottom: 0;
  border: none;
  padding: 0;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 300px;
}
.search-icon {
  font-size: 0.9rem;
  margin-right: 0.5rem;
  opacity: 0.5;
}

.search-box input {
  background: transparent;
  border: none;
  font-size: 0.85rem;
  width: 100%;
  padding: 0;
  height: 30px;
}

.search-box input:focus {
  box-shadow: none;
  border: none;
}

/* Reste des styles identiques au composant précédent */
.doctor-management-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
}
.medical-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
}
.doctor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
.doctor-card {
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
}
.speciality-badge {
  font-size: 0.75rem;
  color: #3b82f6;
  background: #eff6ff;
  padding: 2px 8px;
  border-radius: 4px;
}
.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
}
.btn-ghost {
  background: #f1f5f9;
  color: #475569;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
}
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.available {
  background: #22c55e;
}
.dot.unavailable {
  background: #94a3b8;
}

.doctor-management-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Inter', system-ui, sans-serif;
}

.medical-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
}

/* Formulaire */
.medical-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

input {
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
}

.input-error {
  border-color: #ef4444;
}
.error-text {
  color: #ef4444;
  font-size: 0.75rem;
}

/* Switch Toggle */
.availability-toggle {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #22c55e;
}
input:checked + .slider:before {
  transform: translateX(22px);
}

/* Grille Docteurs */
.doctor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.doctor-card {
  position: relative;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.doctor-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.doctor-status-bar {
  height: 4px;
  width: 100%;
}
.doctor-status-bar.available {
  background: #22c55e;
}
.doctor-status-bar.unavailable {
  background: #94a3b8;
}

.doctor-body {
  padding: 1.25rem;
}

.doctor-name {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #1e293b;
}

.speciality-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b82f6;
  background: #eff6ff;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.contact-info {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #475569;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.available {
  background: #22c55e;
}
.dot.unavailable {
  background: #94a3b8;
}

.doctor-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem;
  background: #f8fafc;
  gap: 0.5rem;
}

/* Boutons */
.btn {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}
.btn-ghost {
  background: #f1f5f9;
  color: #475569;
}

.btn-icon {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-icon.delete:hover {
  color: #ef4444;
  border-color: #ef4444;
}

.empty-message {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
}

@media (max-width: 900px) {
  .doctor-management-container {
    grid-template-columns: 1fr;
  }
}
</style>
