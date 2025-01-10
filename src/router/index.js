import { createRouter, createWebHashHistory } from "vue-router";
import PostsView from "@/views/PostsView.vue";
import UsersView from "@/views/UsersView.vue";
import UploadsView from "@/views/UploadsView.vue";
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
    path: "/uploads",
    name: "uploads",
    component: UploadsView,
    meta: { requiresAuth: true }, // Only accessible when authenticated
  },
  {
    path: "/posts",
    name: "posts",
    component: PostsView,
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
  // Safely check if the cookie exists before trying to parse it
  const userData = Cookies.get("userData");

  let isAuthenticated = false;
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      isAuthenticated = !!parsedData.access_token; // Check if access_token exists
    } catch (e) {
      console.error("Error parsing userData:", e); // Log the error for debugging
      isAuthenticated = false;
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirect to login page
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/"); // Redirect to home page
  } else {
    next();
  }
});

export default router;
