import { useLocalStorage } from './useLocalStorage'

export function useRooms() {
    const rooms = useLocalStorage('rooms', [])

    function addRoom(room) {
        rooms.value.push({
            id: Date.now(),
            status: 'free',
            ...room
        })
    }

    function updateRoom(id, updatedRoom) {
        const index = rooms.value.findIndex(r => r.id === id)
        if (index !== -1) {
            rooms.value[index] = { ...rooms.value[index], ...updatedRoom }
        }
    }

    function deleteRoom(id) {
        rooms.value = rooms.value.filter(r => r.id !== id)
    }

    function findRoom(id) {
        return rooms.value.find(r => r.id === id)
    }

    function assignPatient(roomId, patientId) {
        const room = findRoom(roomId)
        if (room) {
            room.patientId = patientId
            room.status = 'occupied'
        }
    }

    function freeRoom(roomId) {
        const room = findRoom(roomId)
        if (room) {
            room.patientId = null
            room.status = 'free'
        }
    }

    return {
        rooms,
        addRoom,
        updateRoom,
        deleteRoom,
        findRoom,
        assignPatient,
        freeRoom
    }
}
