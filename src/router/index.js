import {createRouter, createWebHashHistory} from 'vue-router'

import {
    DashboardView,
    AboutView,
    RegisterView,
    LoginView,
    AccessMapView,
    AdminView,
    UserProfileView,
    UserVerificationView, VerificationConfirmedView
} from "@/views";
import NavBar from "@/components/NavBar.vue";
import practice from "@/components/practice.vue";
import registerDeviceView from "@/views/RegisterDeviceView.vue";

const routes = [
    { path: '/dashboard', name: "dashboard", component: DashboardView },
    { path: '/register', name: "register", component: RegisterView },
    { path: '/about', name: "about", component: AboutView },
    { path: '/login', name: "login", component: LoginView },
    { path: '/', name: "landing", component: practice },
    { path: '/accessmap', name: "accessmap", component: AccessMapView},
    { path: '/navbar', name: "navbar", component: NavBar},
    { path: '/adminview', name: "adminview", component: AdminView},
    { path: '/profile', name: "profile", component: UserProfileView},
    { path: '/userverification', name: "userverification", component: UserVerificationView },
    { path: '/verificationconfirmed', name: "verificationconfirmed", component: VerificationConfirmedView },
    { path: '/registerdevice', name: "registerdevice", component: registerDeviceView}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router