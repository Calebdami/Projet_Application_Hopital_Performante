import { useLocalStorage } from './useLocalStorage'

export function useDoctors() {
    const doctors = useLocalStorage('doctors', [])

    function addDoctor(doctor) {
        doctors.value.push({
            id: Date.now(),
            available: true,
            ...doctor
        })
    }

    function updateDoctor(id, updatedDoctor) {
        const index = doctors.value.findIndex(d => d.id === id)
        if (index !== -1) { doctors.value[index] = { ...doctors.value[index], ...updatedDoctor } }
    }

    function deleteDoctor(id) { doctors.value = doctors.value.filter(d => d.id !== id) }

    function findDoctor(id) { return doctors.value.find(d => d.id === id) }

    return {
        doctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        findDoctor
    }
}
