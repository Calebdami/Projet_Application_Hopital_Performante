import { useLocalStorage } from './useLocalStorage'

export function usePatients() {
  const patients = useLocalStorage('patients', [])

  function addPatient(patient) {
    patients.value.push({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...patient,
    })
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
  }
}
