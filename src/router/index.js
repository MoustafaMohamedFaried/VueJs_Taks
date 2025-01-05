import { createRouter, createWebHashHistory } from "vue-router";
import UsersView from "@/views/UsersView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";

const routes = [
  {
    path: "/",
    name: "users",
    component: UsersView,
  }, {
    path: "/login",
    name: "login",
    component: LoginView,
  }, {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
