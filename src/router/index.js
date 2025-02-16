import {createRouter, createWebHashHistory} from 'vue-router'

import {DashboardView, AboutView, RegisterView, LoginView, AccessMapView, VerificationConfirmedView} from "@/views";

const routes = [
    { path: '/', name: "dashboard", component: DashboardView },
    { path: '/register', name: "register", component: RegisterView },
    { path: '/about', name: "about", component: AboutView },
    { path: '/login', name: "login", component: LoginView },
    { path: '/accessmap', name: "accessmap", component: AccessMapView},
    // {path: '/navbar', name: "navbar", component: NavBar},
    // { path: '/userverification', name: "userverification", component: UserVerificationView },
    { path: '/verificationconfirmed', name: "verificationconfirmed", component: VerificationConfirmedView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router