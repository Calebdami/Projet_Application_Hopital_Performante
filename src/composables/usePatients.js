import { useLocalStorage } from './useLocalStorage'
import { useDoctors } from './useDoctors'

export function usePatients() {
  const patients = useLocalStorage('patients', []) //impplémentation du localStorage des patients
  const { doctors } = useDoctors()

  function assignDoctor(patientId, doctorId) {
    const doctor = doctors.value.find(d => d.id === doctorId)

    if (!doctor) {
      throw new Error('Médecin inexistant')
    }

    if (!doctor.available) {
      throw new Error('Médecin indisponible')
    }

    const patient = patients.value.find(p => p.id === patientId)
    if (!patient) {
      throw new Error('Patient inexistant')
    }

    patient.doctorId = doctorId
  }

  function addPatient(patient) {
    const newPatient = {
      id: Date.now(),
      ...patient,
    }

    patients.value.push(newPatient)
    return newPatient
  }

  function updatePatient(id, updatedPatient) {
    const index = patients.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      patients.value[index] = { ...patients.value[index], ...updatedPatient }
    }
  }

  function deletePatient(id) {
    patients.value = patients.value.filter((p) => p.id !== id)
  }

  function findPatient(id) {
    return patients.value.find((p) => p.id === id)
  }

  return {
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    findPatient,
    assignDoctor
  }
}
