import { useLocalStorage } from './useLocalStorage'
import { useAppointments } from './useAppointments'

export function useDoctors() {
  const doctors = useLocalStorage('doctors', []) //impplémentation du localStorage des doctors

  function addDoctor(doctor) {
    doctors.value.push({
      id: Date.now(),
      status: doctor.available ? 'available' : 'unavailable',
      ...doctor,
    })
  }

  function updateDoctor(id, updatedDoctor) {
    const index = doctors.value.findIndex(d => d.id === id)
    if (index === -1) return

    const oldDoctor = doctors.value[index]
    const newStatus = updatedDoctor.available !== undefined
      ? (updatedDoctor.available ? 'available' : 'unavailable')
      : oldDoctor.status

    doctors.value[index] = { ...oldDoctor, ...updatedDoctor, status: newStatus }

    // Si médecin devient indisponible, annuler ses RDV non annulés
    if (newStatus === 'unavailable') {
      const { appointments } = useAppointments()
      appointments.value.forEach(appt => {
        if (appt.doctorId === id && appt.status !== 'cancelled') {
          appt.status = 'cancelled'
        }
      })
    }
  }

  function deleteDoctor(id) {
    doctors.value = doctors.value.filter(d => d.id !== id)
  }

  function findDoctor(id) {
    return doctors.value.find(d => d.id === id)
  }

  return {
    doctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    findDoctor,
  }
}
