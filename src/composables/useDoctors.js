import { ref, computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useDoctors(patients) {
  const doctors = useLocalStorage('doctors', [])

  // Ajouter un médecin
  function addDoctor(doctor) {
    doctors.value.push({
      id: crypto.randomUUID(),
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      speciality: doctor.speciality,
      phone: doctor.phone,
      available: doctor.available ?? true,
      createdAt: new Date().toISOString(),
    })
  }

  // Mettre à jour un médecin
  function updateDoctor(id, updatedDoctor) {
    const index = doctors.value.findIndex(d => d.id === id)
    if (index === -1) return
    doctors.value[index] = { ...doctors.value[index], ...updatedDoctor }
  }

  // Supprimer un médecin (sécurisé)
  function deleteDoctor(id) {
    const hasPatients = patients.value.some(p => p.doctorId === id)
    if (hasPatients) {
      throw new Error('Impossible de supprimer : médecin assigné à des patients')
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
