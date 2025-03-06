import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router/'
import store from './store/';
import './assets/tailwind.css';

// Restore token on page load
const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

