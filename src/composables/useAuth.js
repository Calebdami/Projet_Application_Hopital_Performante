import { ref, computed } from 'vue'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null)

/* =========================
   INIT ADMIN PAR DÉFAUT
========================= */
function initAdmin() {
  const users = JSON.parse(localStorage.getItem('users')) || []

  if (!users.length) {
    const admin = {
      id: Date.now(),
      name: 'Admin',
      email: 'admin@hospital.com',
      password: '1234',
      role: 'admin',
    }
    localStorage.setItem('users', JSON.stringify([admin]))
  }
}

initAdmin()

/* =========================
   AUTH
========================= */

function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || []

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) return false

  currentUser.value = user
  localStorage.setItem('currentUser', JSON.stringify(user))

  return true
}

function logout() {
  currentUser.value = null
  localStorage.removeItem('currentUser')
}

/* =========================
   ADMIN CREATE USER
========================= */

function createUser(newUser) {
  const users = JSON.parse(localStorage.getItem('users')) || []

  const exists = users.some((u) => u.email === newUser.email)
  if (exists) throw new Error('Email déjà utilisé')

  users.push({
    id: Date.now(),
    ...newUser,
  })
  localStorage.setItem('users', JSON.stringify(users))
}

const isAuthenticated = computed(() => !!currentUser.value)

export function useAuth() {
  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    createUser,
  }
}
