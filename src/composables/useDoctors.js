import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import { useNotificationStore } from '@/stores/notificationStore'

export function useDoctors(patients) {
  const use = useLocalStorage('doctors', []);
  const doctors = useLocalStorage('doctors', [])

  // Ajouter un médecin
  function addDoctor(doctor) {
    doctors.value.push(doctor)
  }

  // Mettre à jour un médecin
  function updateDoctor(id, updatedDoctor) {
    const index = doctors.value.findIndex(d => d.id === id)
    if (index === -1) return
    doctors.value[index] = { ...doctors.value[index], ...updatedDoctor }
  }

  // Supprimer un médecin (sécurisé)
  function deleteDoctor(id) {
    const notify = useNotificationStore()
    const hasPatients = patients.value.some(p => p.doctorId === id)
    if (hasPatients) {
      notify.error('Impossible de supprimer un Medecin assigné à des patients')
      return
    }
    doctors.value = doctors.value.filter(d => d.id !== id)
  }

  // Trouver un médecin
  function findDoctor(id) {
    return doctors.value.find(d => d.id === id)
  }

  // Obtenir les patients d’un médecin
  function getDoctorPatients(doctorId) {
    return computed(() => patients.value.filter(p => p.doctorId === doctorId))
  }

  // Médecins disponibles
  const availableDoctors = computed(() =>
    doctors.value.filter(d => d.available)
  )

  return {
    doctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    findDoctor,
    getDoctorPatients,
    availableDoctors,
  }
}
