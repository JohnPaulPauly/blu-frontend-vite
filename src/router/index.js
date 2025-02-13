import {createRouter, createWebHashHistory} from 'vue-router'

import {DashboardView, AboutView, RegisterView, LoginView, AccessMapView} from "@/views";
import NavBar from "@/components/NavBar.vue";

const routes = [
    { path: '/', name: "dashboard", component: DashboardView },
    { path: '/register', name: "register", component: RegisterView },
    { path: '/about', name: "about", component: AboutView },
    { path: '/login', name: "login", component: LoginView },
    { path: '/accessmap', name: "accessmap", component: AccessMapView},
    {path: '/navbar', name: "navbar", component: NavBar}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router