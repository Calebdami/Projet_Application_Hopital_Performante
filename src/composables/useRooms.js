import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useRooms() {

    // Stockage persistant des chambres
    const rooms = useLocalStorage('rooms', [])

    // ==============================
    // Vérifie que le numéro est unique
    // ==============================
    function isRoomNumberUnique(number) {
        return !rooms.value.some(room => room.number === number)
    }

    // ==============================
    // Ajouter une chambre
    // ==============================
    function addRoom(room) {

        if (!isRoomNumberUnique(room.number)) {
            alert('Numéro de chambre déjà existant')
        }

        rooms.value.push({
            id: crypto.randomUUID(), // meilleur que Date.now()
            number: room.number,
            capacity: Number(room.capacity),
            patients: [], // tableau vide au départ
            status: 'free'
        })
    }

    // ==============================
    // Mettre à jour une chambre
    // ==============================
    function updateRoom(id, updatedRoom) {
        const room = findRoom(id)

        if (!room) return

        room.number = updatedRoom.number
        room.capacity = Number(updatedRoom.capacity)

        updateRoomStatus(room)
    }

    // ==============================
    // Supprimer une chambre
    // ==============================
    function deleteRoom(id) {
        rooms.value = rooms.value.filter(r => r.id !== id)
    }

    // ==============================
    // Trouver une chambre
    // ==============================
    function findRoom(id) {
        return rooms.value.find(r => r.id === id)
    }

    // ==============================
    // Affecter un patient
    // ==============================
    function assignPatient(roomId, patientId) {

        const room = findRoom(roomId)
        if (!room) return

        // Vérifie si la chambre est pleine
        if (room.patients.length >= room.capacity) {
            throw new Error('Chambre complète')
        }

        // Evite doublon
        if (!room.patients.includes(patientId)) {
            room.patients.push(patientId)
        }

        updateRoomStatus(room)
    }

    // ==============================
    // Libérer un patient
    // ==============================
    function removePatient(roomId, patientId) {

        const room = findRoom(roomId)
        if (!room) return

        room.patients = room.patients.filter(id => id !== patientId)

        updateRoomStatus(room)
    }

    // ==============================
    // Met à jour automatiquement le statut
    // ==============================
    function updateRoomStatus(room) {

        if (room.patients.length === 0) {
            room.status = 'free'
        } else if (room.patients.length < room.capacity) {
            room.status = 'partially-occupied'
        } else {
            room.status = 'occupied'
        }
    }

    return {
        rooms,
        addRoom,
        updateRoom,
        deleteRoom,
        findRoom,
        assignPatient,
        removePatient
    }
}
