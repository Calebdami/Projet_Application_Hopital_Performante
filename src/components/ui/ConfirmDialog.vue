<script setup>
    defineProps({
        show: Boolean,
        title: String,
        message: String,
        confirmText: { type: String, default: 'Confirmer' },
        cancelText: { type: String, default: 'Annuler' },
        variant: { type: String, default: 'indigo' } // 'rose' pour les suppressions
    })

    defineEmits(['confirm', 'cancel'])
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
        <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-pop">
                <div class="p-6">
                    <h3 class="text-lg font-bold text-slate-800">{{ title }}</h3>
                    <p class="text-sm text-slate-500 mt-2">{{ message }}</p>
                </div>
                <div class="flex border-t border-slate-100">
                    <button @click="$emit('cancel')" class="flex-1 px-4 py-3 text-sm font-bold text-slate-400 hover:bg-slate-50 transition-colors">
                        {{ cancelText }}
                    </button>
                    <button @click="$emit('confirm')" :class="`flex-1 px-4 py-3 text-sm font-bold text-white bg-${variant}-600 hover:bg-${variant}-700 transition-colors`">
                        {{ confirmText }}
                    </button>
                </div>
            </div>
        </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
    .fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
    .fade-enter-from, .fade-leave-to { opacity: 0; }
    .animate-pop { animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    @keyframes pop { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
</style>