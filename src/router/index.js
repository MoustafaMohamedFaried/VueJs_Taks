import { createRouter, createWebHashHistory } from "vue-router";
import UsersView from "@/views/UsersView.vue";

const routes = [
  {
    path: "/",
    name: "users",
    component: UsersView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
