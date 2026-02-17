import { ref, computed } from 'vue'

const currentUser = ref(
    JSON.parse(localStorage.getItem('currentUser')) || null
)

/* =========================
   INIT ADMIN
========================= */
function initAdmin() {
    const users = JSON.parse(localStorage.getItem('users')) || []

    if (!users.length) {
        users.push({
            id: Date.now(),
            name: 'Administrateur',
            email: 'admin@hospital.com',
            password: '1234',
            role: 'admin'
        })

        localStorage.setItem('users', JSON.stringify(users))
    }
}

initAdmin()

/* =========================
   LOGIN
========================= */
function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
        u => u.email === email && u.password === password
    )

    if (!user) return false

    currentUser.value = user
    localStorage.setItem('currentUser', JSON.stringify(user))

    return true
}

/* =========================
   LOGOUT
========================= */
function logout() {
    currentUser.value = null
    localStorage.removeItem('currentUser')
}

/* =========================
   CREATE USER (ADMIN)
========================= */
function createUser(data) {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const exists = users.some(u => u.email === data.email)
    if (exists) throw new Error('Email déjà utilisé')

    const newUser = {
        id: Date.now(),
        ...data
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    return newUser
}

const isAuthenticated = computed(() => !!currentUser.value)

export function useAuth() {
    return {
        currentUser,
        isAuthenticated,
        login,
        logout,
        createUser
    }
}
