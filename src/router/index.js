import { createRouter, createWebHashHistory } from "vue-router";
import UsersView from "@/views/UsersView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    name: "users",
    component: UsersView,
    meta: { requiresAuth: true }, // Only accessible when authenticated
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false, requiresGuest: true }, // Only for unauthenticated users
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { requiresAuth: false, requiresGuest: true }, // Only for unauthenticated users
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  // const isAuthenticated = !!localStorage.getItem("authToken"); // Check if authToken exists (boolean)
  const isAuthenticated = !!Cookies.get("authToken"); // Check if authToken exists (boolean)

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated
    next("/login"); // Redirect to login page
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // If the route is for guests only (e.g., login/register) and the user is authenticated
    next("/"); // Redirect to home page
  } else {
    // Allow navigation
    next();
  }
});

export default router;
