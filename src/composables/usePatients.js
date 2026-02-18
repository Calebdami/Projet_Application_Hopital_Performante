import { useLocalStorage } from './useLocalStorage'
import { useDoctors } from './useDoctors'

export function usePatients() {
  const patients = useLocalStorage('patients', [])
  const { doctors, findDoctor, updateDoctor, availableDoctors } = useDoctors(patients)

  function addPatient(patient) {
    if (patient.doctorId) {
      const doctor = findDoctor(patient.doctorId)
      if (!doctor) throw new Error('Médecin introuvable')

      const doctorPatientsCount = patients.value.filter(p => p.doctorId === doctor.id).length

      if (doctorPatientsCount >= 3) {
        throw new Error('Impossible d’ajouter : ce médecin a déjà 3 patients')
      }

      // Si on atteint 3 patients après ajout, rendre le médecin indisponible
      if (doctorPatientsCount + 1 >= 3) {
        updateDoctor(doctor.id, { available: false })
      }
    }

    patients.value.push({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...patient,
    })
  }

  function updatePatient(id, updatedPatient) {
    const index = patients.value.findIndex(p => p.id === id)
    if (index !== -1) {
      patients.value[index] = { ...patients.value[index], ...updatedPatient }
    }
  }

  function deletePatient(id) {
    const patient = patients.value.find(p => p.id === id)
    if (!patient) return

    patients.value = patients.value.filter(p => p.id !== id)

    // Si patient supprimé, vérifier si le médecin peut redevenir disponible
    if (patient.doctorId) {
      const doctor = findDoctor(patient.doctorId)
      if (doctor) {
        const doctorPatientsCount = patients.value.filter(p => p.doctorId === doctor.id).length
        if (doctorPatientsCount < 3) {
          updateDoctor(doctor.id, { available: true })
        }
      }
    }
  }

  function findPatient(id) {
    return patients.value.find(p => p.id === id)
  }

  return {
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    findPatient,
    doctors,
    availableDoctors,
  }
}
