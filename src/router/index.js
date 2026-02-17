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
import DoctorPage from '@/views/doctor/DoctorPage.vue';
import DoctorDashboard from '@/views/doctor/DoctorDashboard.vue';
import MyPatientsView from '@/views/doctor/MyPatientsView.vue';
import MyAppointmentsView from '@/views/doctor/MyAppointmentsView.vue';
import ReceptionnistPage from '@/views/receptionist/ReceptionnistPage.vue';
import ReceptionDashboard from '@/views/receptionist/ReceptionDashboard.vue';
import ReceptionPatientsView from '@/views/receptionist/ReceptionPatientsView.vue';
import ReceptionAppointmentsView from '@/views/receptionist/ReceptionAppointmentsView.vue';
import PatientDetailView from '@/views/shared/PatientDetailView.vue';

const routes = [
    { path: '/login', component: AuthLayout, children: [{ path: '', component: LoginView }] },

    { path: '/', component: MainLayout, meta: { requiresAuth: true, role: 'admin' }, children: [
        { path: 'dashboard', component: AdminDashboard },
        { path: 'patients', component: PatientsView },
        { path: 'patients/:id', name: 'PatientDetail', component: PatientDetailView, props: true },
        { path: 'doctors', component: DoctorsView, meta: { role: 'admin' } },
        { path: 'appointments', component: AppointmentView },
        { path: 'rooms', component: RoomsView },
        { path: 'users', component: UsersView},
        ]
    },

    { path: '/doctor', component: DoctorPage, meta: { role: 'doctor' }, children: [
            { path: 'dashboard', component: DoctorDashboard },
            { path: 'patients', component: MyPatientsView },
            { path: 'patients/:id', name: 'PatientDetail', component: PatientDetailView, props: true },
            { path: 'appointments', component: MyAppointmentsView },
        ]
    },

    { path: '/reception', component: ReceptionnistPage,  meta: { role: 'receptionist' }, children: [
            { path: 'dashboard', component: ReceptionDashboard },
            { path: 'patients', component: ReceptionPatientsView },
            { path: 'patients/:id', name: 'PatientDetail', component: PatientDetailView, props: true, meta: { requiresAuth: true, role: 'admin' } },
            { path: 'appointments', component: ReceptionAppointmentsView },
            { path: 'rooms', component: RoomsView },
        ]
    },

    { path: '/unauthorized', component: UnauthorizedView },

    { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (to.meta.requiresAuth && !currentUser) {
        return next('/login')
    }

    if (to.meta.role && currentUser?.role !== to.meta.role) {
        return next('/unauthorized')
    }

    next()
})

export default router