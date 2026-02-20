import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref([]);
    
    function addNotification(message, type = 'info', duration = 1000) {
        const id = Date.now();
        notifications.value.push({
            id,
            message,
            type
        });
        setTimeout(() => {
            removeNotification(id)
        }, duration)
    }  
    function removeNotification(id) {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }
    function success(message) {
        addNotification(message, 'success')
    }
    function error(message) {
        addNotification(message, 'error')
    }
    function warning(message) {
        addNotification(message, 'warning')
    }
    function info(message) {
        addNotification(message, 'info')
    }
    return {
        notifications,
        addNotification,
        removeNotification,
        success, 
        error,
        warning,
        info,
    }
})