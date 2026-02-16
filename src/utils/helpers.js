// Générer un ID unique
export function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

// Formater date pour affichage
export function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

// Filtrer une liste par plusieurs critères
export function filterList(list, filters = {}) {
  return list.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true
      return item[key]?.toString().toLowerCase().includes(filters[key].toString().toLowerCase())
    })
  })
}

// Vérifier doublons par clé
export function hasDuplicate(list, key, value) {
  return list.some((item) => item[key] === value)
}
