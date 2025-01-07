import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap CSS and JS globally
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import SweetAlert2 globally
import Swal from "sweetalert2";

// Import Axios globally
import axios from "axios";

// Import js-cookie globally
import Cookies from "js-cookie";

// Create Vue app instance
const app = createApp(App);

// Provide Swal, axios, and Cookies globally (optional)
app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$cookies = Cookies;

// Check if the "userData" cookie exists before parsing it
const userData = Cookies.get("userData");
app.config.globalProperties.$authToken = userData ? JSON.parse(userData)?.access_token : null;
app.config.globalProperties.$userName = userData ? JSON.parse(userData)?.name : null;

app.config.globalProperties.$apiKey = 'kdsldnsjdnsjkndjksndjFaJ0kfG9m8sW08yTXiC0tPmsN6964';

// Use the router
app.use(router);

// Mount the app
app.mount('#app');
