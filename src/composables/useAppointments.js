import { useLocalStorage } from './useLocalStorage'
import { useDoctors } from './useDoctors'

export function useAppointments() {
  const appointments = useLocalStorage('appointments', [])
  const { doctors } = useDoctors()

  function isOverlapping(newAppt, existingAppt) {
    if (
      newAppt.date !== existingAppt.date ||
      newAppt.doctorId !== existingAppt.doctorId ||
      existingAppt.status === 'cancelled'
    ) {
      return false
    }

    if (!existingAppt.startTime || !existingAppt.endTime) return false

    const newStart = new Date(`${newAppt.date}T${newAppt.startTime}`)
    const newEnd = new Date(`${newAppt.date}T${newAppt.endTime}`)
    const existingStart = new Date(`${existingAppt.date}T${existingAppt.startTime}`)
    const existingEnd = new Date(`${existingAppt.date}T${existingAppt.endTime}`)

    return newStart < existingEnd && newEnd > existingStart
  }

  function addAppointment(appointment) {
    const doctor = doctors.value.find(d => d.id === Number(appointment.doctorId))
    if (!doctor || doctor.status === 'unavailable') {
      throw new Error('Ce médecin est indisponible')
    }

    const conflict = appointments.value.some(appt => isOverlapping(appointment, appt))
    if (conflict) {
      throw new Error('Ce médecin a déjà un rendez-vous dans cet intervalle')
    }

    appointments.value.push({
      id: Date.now(),
      status: 'pending',
      ...appointment,
    })
  }

  function updateAppointment(id, updatedAppointment) {
    const index = appointments.value.findIndex(a => a.id === id)
    if (index === -1) return

    const updatedFull = { ...appointments.value[index], ...updatedAppointment }

    const doctor = doctors.value.find(d => d.id === Number(updatedFull.doctorId))
    if (!doctor || doctor.status === 'unavailable') {
      throw new Error('Modification impossible : médecin indisponible')
    }

    const conflict = appointments.value.some(
      appt => appt.id !== id && isOverlapping(updatedFull, appt)
    )
    if (conflict) {
      throw new Error('Modification impossible : conflit détecté')
    }

    appointments.value[index] = updatedFull
  }

  function deleteAppointment(id) {
    appointments.value = appointments.value.filter(a => a.id !== id)
  }

  function findAppointment(id) {
    return appointments.value.find(a => a.id === id)
  }

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    findAppointment,
  }
}
