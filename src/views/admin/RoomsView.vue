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

<template>
    <div class="space-y-8 animate-fade-in">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-slate-100 pb-6">
            <div class="flex items-center gap-4">
                <div class="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-100 text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-3xl font-black text-slate-800 tracking-tight uppercase">Chambres</h2>
                    <p class="text-slate-500 font-medium italic">Inventaire et état d'occupation des unités de soin</p>
                </div>
            </div>

            <div class="bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-md">
                <span class="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
                {{ rooms.length }} Unités répertoriées
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:border-amber-200">
            <div class="px-8 py-5 bg-gradient-to-r from-amber-50 to-transparent flex items-center gap-3 border-b border-slate-100">
                <div class="w-8 h-1 bg-amber-400 rounded-full"></div>
                <h3 class="font-bold text-slate-700 uppercase text-xs tracking-widest">
                    {{ editMode ? 'Modification de l\'unité' : 'Ajout d\'une nouvelle chambre' }}
                </h3>
            </div>
            <div class="p-8">
                <RoomForm
                :editMode="editMode"
                :modelValue="selectedRoom"
                @submit="saveRoom"
                />
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 class="font-bold text-slate-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    État actuel des chambres
                </h3>
            </div>

            <div class="p-4 sm:p-6 overflow-x-auto">
                <RoomsTable
                class="min-w-full"
                :rooms="rooms"
                @edit="startEdit"
                @delete="removeRoom"
                />
            </div>
        </div>

        <div class="flex items-center justify-center gap-8 py-4 opacity-40">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                <span class="w-3 h-3 bg-emerald-500 rounded-full"></span> Disponible
            </div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                <span class="w-3 h-3 bg-red-500 rounded-full"></span> Occupée
            </div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                <span class="w-3 h-3 bg-amber-500 rounded-full"></span> Maintenance
            </div>
        </div>
    </div>
</template>

<style scoped>
    .animate-fade-in {
        animation: slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* On prépare le style pour les lignes de la table que vous m'enverrez sûrement après */
    :deep(tr) {
        transition: all 0.2s ease;
    }
    :deep(tr:hover) {
        background-color: #fffbeb !important; /* amber-50 */
    }
</style>