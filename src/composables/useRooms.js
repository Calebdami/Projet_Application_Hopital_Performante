import { useLocalStorage } from './useLocalStorage'

export function useRooms() {
  const rooms = useLocalStorage('rooms', [])

  function addRoom(room) {
    // Vérifie numéro unique
    if (rooms.value.some(r => r.number === room.number)) {
      throw new Error('Numéro de chambre déjà existant')
    }

    rooms.value.push({
      ...room,
      patients: [],
      status: room.status || 'free',
    })
  }

  function updateRoom(number, updatedRoom) {
    const index = rooms.value.findIndex(r => r.number === number)
    if (index !== -1) {
      rooms.value[index] = { ...rooms.value[index], ...updatedRoom }
    }
  }

  function deleteRoom(number) {
    rooms.value = rooms.value.filter(r => r.number !== number)
  }

  function findRoom(number) {
    return rooms.value.find(r => r.number === number)
  }

  function assignPatient(number, patientId) {
    const room = findRoom(number)
    if (!room) throw new Error('Chambre inexistante')
    if (room.patients.includes(patientId)) return

    if (room.patients.length >= room.capacity) {
      throw new Error('Chambre pleine')
    }

    room.patients.push(patientId)
    room.status = room.patients.length > 0 ? 'occupied' : 'free'
  }

  function removePatient(number, patientId) {
    const room = findRoom(number)
    if (!room) return

    room.patients = room.patients.filter(id => id !== patientId)
    room.status = room.patients.length === 0 ? 'free' : 'occupied'
  }

  function availablePlaces(number) {
    const room = findRoom(number)
    return room ? room.capacity - room.patients.length : 0
  }

  return {
    rooms,
    addRoom,
    updateRoom,
    deleteRoom,
    findRoom,
    assignPatient,
    removePatient,
    availablePlaces
  }
}
