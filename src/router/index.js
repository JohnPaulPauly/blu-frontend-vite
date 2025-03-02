import {createRouter, createWebHashHistory} from 'vue-router'

import {DashboardView, AboutView, RegisterView, LoginView, AccessMapView, UserVerificationView, VerificationConfirmedView, PathHistoryView} from "@/views";
import MapQueueView from "@/views/MapQueueView.vue";
import PairDeviceView from "@/views/PairDeviceView.vue";
import LandingView from "@/views/LandingView.vue";

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
    { path: '/', name: "landing", component: LandingView}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router