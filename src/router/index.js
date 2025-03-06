import {createRouter, createWebHashHistory} from 'vue-router'

import {DashboardView, AboutView, LoginView, AccessMapView, UserVerificationView, VerificationConfirmedView, PathHistoryView, AdminView} from "@/views";
import MapQueueView from "@/views/MapQueueView.vue";
import PairDeviceView from "@/views/PairDeviceView.vue";
import LandingView from "@/views/LandingView.vue";
import DashboardAdminView from "@/views/DashboardAdminView.vue";
import UserProfileView from "@/views/UserProfileView.vue"
import RegisterView from "@/views/RegisterView.vue"

const routes = [
    { path: '/dashboard', name: "dashboard", component: DashboardView },
    { path: '/register', name: "register", component: RegisterView },
    { path: '/about', name: "about", component: AboutView },
    { path: '/login', name: "login", component: LoginView },
    { path: '/accessmap', name: "accessmap", component: AccessMapView},
    // {path: '/navbar', name: "navbar", component: NavBar},
    { path: '/userverification', name: "userverification", component: UserVerificationView },
    { path: '/verificationconfirmed', name: "verificationconfirmed", component: VerificationConfirmedView },
    { path: '/mapqueue', name: "mapqueue", component: MapQueueView},
    { path: '/pathhistory', name: "pathhistory", component: PathHistoryView},
    { path: '/pairdevice', name: "pairdevice", component : PairDeviceView},
    { path: '/', name: "landing", component: LandingView},
    { path: '/admin', name: "admin", component: AdminView},
    { path: '/admindashboard', name: "admindashboard", component: DashboardAdminView},
    { path: '/profile', name: "profile", component: UserProfileView}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router