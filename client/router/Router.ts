import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routesPublic } from "@/router/routes/RoutesPublic";
import { routesPrivate } from "@/router/routes/RoutesPrivate";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/login",
  },
  ...routesPublic,
  ...routesPrivate,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
