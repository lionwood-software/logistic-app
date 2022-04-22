import { RouteRecordRaw } from "vue-router";
import { routePrivateProfile } from "@/router/routes/private/RoutePrivateProfile";
import { routePrivateSearch } from "@/router/routes/private/RoutePrivateSearch";

export const routesPrivate: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Private",
    component: () => import("@/app/private/Private.vue"),
    children: [
      ...routePrivateSearch,
      ...routePrivateProfile,
    ],
  },
];
