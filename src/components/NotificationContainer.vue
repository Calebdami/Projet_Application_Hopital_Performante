<script setup>
    import { useNotificationStore } from '@/stores/notificationStore';
    import { storeToRefs } from 'pinia';

    const store = useNotificationStore();
    const { notifications } = storeToRefs(store);
</script>

<template>
    <div class="notification-container">
        <div
            v-for="n in notifications"
            :key="n.id"
            :class="['notification', n.type]"
        >
            {{ n.message }}
        </div>
    </div>
</template>

<style scoped>
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 9999;
    }

    .notification {
        padding: 12px 16px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        animation: fadeIn 0.3s ease;
    }

    .success { background: #16a34a; }
    .error { background: #dc2626; }
    .warning { background: #f59e0b; }
    .info { background: #2563eb; }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
