import { useLocalStorage } from './useLocalStorage'

export function useUsers() {
    const users = useLocalStorage('users', [])

    function addUser(user) {
        users.push({
            id: Date.now(),
            name: 'Jacky',
            email: 'jacky@hospital.com',
            password: '1234',
            role: 'doctor'
        })
        const exists = users.value.some(u => u.email === user.email)
        if (exists) throw new Error('Email déjà utilisé')

        users.value.push({
            id: Date.now(),
            ...user
        })
    }

    function updateUser(id, updatedUser) {
        const index = users.value.findIndex(u => u.id === id)
        if (index !== -1) { users.value[index] = { ...users.value[index], ...updatedUser } }
    }

    function deleteUser(id) { users.value = users.value.filter(u => u.id !== id) }

    function findUser(id) { return users.value.find(u => u.id === id) }

    return {
        users,
        addUser,
        updateUser,
        deleteUser,
        findUser
    }
}
