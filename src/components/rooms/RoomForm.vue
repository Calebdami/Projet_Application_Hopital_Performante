<template>
  <div class="room-management-layout">
    <section class="medical-card side-panel">
      <h2 class="card-title">{{ isEditing ? 'Modifier la chambre' : 'Ajouter une chambre' }}</h2>

      <form @submit.prevent="handleSubmit" class="vertical-form">
        <div class="form-group">
          <label>Numéro de chambre</label>
          <input
            v-model="form.number"
            placeholder="ex: A-101"
            :class="{ 'input-error': errors.number }"
          />
          <span class="error-text" v-if="errors.number">{{ errors.number }}</span>
        </div>

        <div class="form-group">
          <label>Capacité (lits)</label>
          <input
            type="number"
            v-model.number="form.capacity"
            min="1"
            :class="{ 'input-error': errors.capacity }"
          />
          <span class="error-text" v-if="errors.capacity">{{ errors.capacity }}</span>
        </div>

        <div class="form-group">
          <label>État actuel</label>
          <select v-model="form.status">
            <option value="free">Libre (Disponible)</option>
            <option value="occupied">Occupée</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div class="form-group">
          <label>Affectation patient</label>
          <select v-model="form.patientId">
            <option value="">Sélectionner un patient</option>
            <option
              v-for="p in patients"
              :key="p.id"
              :value="p.id"
              :disabled="isPatientAssigned(p.id)"
            >
              {{ p.firstName }} {{ p.lastName }}
              <span v-if="isPatientAssigned(p.id)"> (Déjà assigné)</span>
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button v-if="isEditing" type="button" @click="resetForm" class="btn btn-ghost">
            Annuler
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Mettre à jour' : 'Créer la chambre' }}
          </button>
        </div>
      </form>
    </section>

    <section class="medical-card main-panel">
      <div class="header-with-filter">
        <h2 class="card-title">Inventaire</h2>

        <div class="filter-bar">
          <button
            v-for="status in ['all', 'free', 'occupied', 'maintenance']"
            :key="status"
            @click="filterStatus = status"
            :class="['filter-btn', { active: filterStatus === status }]"
          >
            {{ status === 'all' ? 'Toutes' : status }}
          </button>
        </div>
      </div>

      <div class="room-grid">
        <div v-for="room in filteredRooms" :key="room.id" class="room-item-card">
          <div class="room-header">
            <span class="room-number">Chambre {{ room.number }}</span>
            <span :class="['status-dot', room.status]"></span>
          </div>

          <div class="room-body">
            <div class="info-row">
              <span class="label">Occupation :</span>
              <span class="value">{{ room.patients?.length || 0 }} / {{ room.capacity }}</span>
            </div>

            <div class="patient-tags" v-if="room.patients && room.patients.length">
              <span v-for="name in getPatientNames(room.patients)" :key="name" class="patient-tag">
                {{ name }}
              </span>
            </div>
          </div>

          <div class="room-footer">
            <button @click="editRoom(room)" class="btn-text">Modifier</button>
            <button @click="deleteRoom(room.number)" class="btn-text delete">Supprimer</button>
          </div>
        </div>
      </div>

      <div v-if="filteredRooms.length === 0" class="empty-state">
        Aucune chambre ne correspond à ce critère.
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRooms } from '@/composables/useRooms'
import { usePatients } from '@/composables/usePatients'

const { rooms, addRoom, updateRoom, deleteRoom } = useRooms()
const { patients } = usePatients()

// Logique de filtrage
const filterStatus = ref('all')
const filteredRooms = computed(() => {
  if (filterStatus.value === 'all') return rooms.value
  return rooms.value.filter((room) => room.status === filterStatus.value)
})

const form = reactive({
  number: '',
  capacity: 3,
  status: 'free',
  patients: [],
})

const errors = reactive({
  number: '',
  capacity: '',
})

const isEditing = ref(false)
let editingId = null

function validate() {
  let isValid = true
  Object.keys(errors).forEach((k) => (errors[k] = ''))
  if (!form.number) {
    errors.number = 'Numéro requis'
    isValid = false
  }
  if (!form.capacity || form.capacity < 1) {
    errors.capacity = 'Capacité invalide'
    isValid = false
  }
  return isValid
}

function handleSubmit() {
  if (!validate()) return
  isEditing.value ? updateRoom(editingId, form) : addRoom(form)
  resetForm()
}

function editRoom(room) {
  Object.assign(form, room)
  editingId = room.id
  isEditing.value = true
}

function resetForm() {
  form.number = ''
  form.capacity = 3
  form.status = 'free'
  form.patients = []
  editingId = null
  isEditing.value = false
}

function getPatientNames(patientIds) {
  return patientIds.map((id) => {
    const p = patients.value.find((p) => p.id === id)
    return p ? `${p.firstName} ${p.lastName}` : 'Inconnu'
  })
}

function isPatientAssigned(patientId) {
  return rooms.value.some((r) => r.patients?.includes(patientId))
}
</script>

<style scoped>
/* On conserve les styles précédents et on ajoute ceux du filtre */

.header-with-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
}

.card-title {
  margin-bottom: 0;
  border: none;
}

.filter-bar {
  display: flex;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 8px;
}

.filter-btn {
  padding: 4px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s;
}

.filter-btn.active {
  background: white;
  color: #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
  font-style: italic;
}

/* Styles restants de la réponse précédente... */
.room-management-layout {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.medical-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}
.side-panel {
  flex: 1;
}
.main-panel {
  flex: 2;
}
.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.room-item-card {
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  padding: 1rem;
  background: #f8fafc;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.status-dot.free {
  background: #22c55e;
}
.status-dot.occupied {
  background: #ef4444;
}
.status-dot.maintenance {
  background: #f59e0b;
}
.patient-tag {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-right: 4px;
}
.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-ghost {
  background: #f1f5f9;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.room-management-layout {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Inter', system-ui, sans-serif;
  align-items: flex-start;
}

.medical-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.side-panel {
  flex: 1;
  min-width: 320px;
}
.main-panel {
  flex: 2;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Formulaire */
.vertical-form {
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

input,
select {
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
}

input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Grille de chambres */
.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.room-item-card {
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  padding: 1rem;
  background: #f8fafc;
  transition: transform 0.2s;
}

.room-item-card:hover {
  transform: translateY(-2px);
  border-color: #cbd5e1;
}

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.room-number {
  font-weight: 700;
  color: #1e293b;
}

/* Statuts par points */
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.status-dot.free {
  background: #22c55e;
}
.status-dot.occupied {
  background: #ef4444;
}
.status-dot.maintenance {
  background: #f59e0b;
}

.info-row {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.patient-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.patient-tag {
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #475569;
}

.room-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
}

.btn-text {
  background: none;
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  color: #3b82f6;
  cursor: pointer;
  padding: 0;
}

.btn-text.delete {
  color: #ef4444;
}

/* Boutons principaux */
.btn {
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
}

.btn-ghost {
  background: #f1f5f9;
  color: #475569;
  border: none;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
}

.input-error {
  border-color: #ef4444 !important;
}
</style>
