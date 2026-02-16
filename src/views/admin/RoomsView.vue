<template>
    <div>
        <h2>Chambres</h2>

        <RoomForm
            :editMode="editMode"
            :modelValue="selectedRoom"
            @submit="saveRoom"
        />

        <RoomsTable
            :rooms="rooms"
            @edit="startEdit"
            @delete="removeRoom"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRooms } from '@/composables/useRooms'

    import RoomForm from '@/components/rooms/RoomForm.vue'
    import RoomsTable from '@/components/rooms/RoomsTable.vue'

    const { rooms, addRoom, updateRoom, deleteRoom } = useRooms()

    const editMode = ref(false)
    const selectedRoom = ref(null)

    function saveRoom(data) {
        if (editMode.value) {
            updateRoom(selectedRoom.value.id, data)
        } else {
            addRoom(data)
        }

        editMode.value = false
        selectedRoom.value = null
    }

    function startEdit(room) {
        editMode.value = true
        selectedRoom.value = room
    }

    function removeRoom(id) {
        deleteRoom(id)
    }
</script>
