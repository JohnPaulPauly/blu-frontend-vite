import {createRouter, createWebHashHistory} from 'vue-router'

import {DashboardView, AboutView, RegisterView, LoginView, AccessMapView} from "@/views";

const routes = [
    { path: '/', name: "dashboard", component: DashboardView },
    { path: '/register', name: "register", component: RegisterView },
    { path: '/about', name: "about", component: AboutView },
    { path: '/login', name: "login", component: LoginView },
    { path: '/accessmap', name: "accessmap", component: AccessMapView}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router