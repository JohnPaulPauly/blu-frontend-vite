import {createRouter, createWebHashHistory} from 'vue-router'

import {DashboardView, AboutView, RegisterView, LoginView, AccessMapView} from "@/views";
import NavBar from "@/components/NavBar.vue";
import practice from "@/components/practice.vue";

//sets web path for each view
const routes = [
    { path: '/', name: "dashboard", component: DashboardView },
    { path: '/register', name: "register", component: RegisterView },
    { path: '/about', name: "about", component: AboutView },
    { path: '/login', name: "login", component: LoginView },
    { path: '/accessmap', name: "accessmap", component: AccessMapView},
    {path: '/navbar', name: "navbar", component: NavBar},
    { path: '/practice', name: "practice", component: practice },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router