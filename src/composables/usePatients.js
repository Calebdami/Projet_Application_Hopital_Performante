import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = []) {
    const data = ref(JSON.parse(localStorage.getItem(key)) || defaultValue)
    watch(data, (newVal) => { localStorage.setItem(key, JSON.stringify(newVal)) }, { deep: true })
    return data
}