import { createRouter, createWebHistory } from 'vue-router';

import MainLayout from '@/layouts/MainLayout.vue';
import LoginView from '@/views/auth/LoginView.vue';
import AdminDashboard from '@/views/admin/Dashboard.vue';
import PatientsView from '@/views/admin/PatientsView.vue';
import DoctorsView from '@/views/admin/DoctorsView.vue';
import RoomsView from '@/views/admin/RoomsView.vue';
import UnauthorizedView from '@/views/shared/UnauthorizedView.vue';
import AppointmentView from '@/views/admin/AppointmentsView.vue';
import UsersView from '@/views/admin/UsersView.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const routes = [
    {
        path: '/login',
        component: AuthLayout,
        children: [{ path: '', component: LoginView }]
    },

    {
        path: '/',
        component: MainLayout,
        meta: { requiresAuth: true },
        children: [
            { path: 'dashboard', component: AdminDashboard },
            { path: 'patients', component: PatientsView },
            { path: 'doctors', component: DoctorsView, meta: { role: 'admin' } },
            { path: 'appointments', component: AppointmentView },
            { path: 'rooms', component: RoomsView }
        ]
    },

    {
        path: '/unauthorized',
        component: UnauthorizedView
    },

    {
        path: '/users',
        component: UsersView,
        meta: { role: 'admin' }
    },

    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));

//     if (to.meta.requiresAuth && !currentUser) {
//         return next('/login')
//     }

//     if (to.meta.role && currentUser?.role !== to.meta.role) {
//         return next('/unauthorized')
//     }

//     next()
// })

export default router