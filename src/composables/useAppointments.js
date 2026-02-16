import { useLocalStorage } from './useLocalStorage'

export function useAppointments() {
    const appointments = useLocalStorage('appointments', [])

    function addAppointment(appointment) {
        // vérifie double réservation
        const conflict = appointments.value.some( a => a.doctorId === appointment.doctorId && a.date === appointment.date && a.time === appointment.time )
        if (conflict) throw new Error('Double réservation détectée')

        appointments.value.push({
            id: Date.now(),
            status: 'pending',
            ...appointment
        })
    }

    function updateAppointment(id, updatedAppointment) {
        const index = appointments.value.findIndex(a => a.id === id)
        if (index !== -1) {
            appointments.value[index] = { ...appointments.value[index], ...updatedAppointment }
        }
    }

    function deleteAppointment(id) { appointments.value = appointments.value.filter(a => a.id !== id) }

    function findAppointment(id) { return appointments.value.find(a => a.id === id) }

    return {
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        findAppointment
    }
}
