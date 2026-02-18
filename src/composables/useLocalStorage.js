import { ref, watch, toRaw } from 'vue'

function parseStorage(key, defaultValue) {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue
  } catch {
    return defaultValue
  }
}

export function useLocalStorage(key, defaultValue = []) {
  const data = ref(parseStorage(key, defaultValue))

  watch(data, (newVal) => {
    localStorage.setItem(key, JSON.stringify(toRaw(newVal)))
  }, { deep: true })

  return data
}
