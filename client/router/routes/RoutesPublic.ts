import { RouteRecordRaw } from "vue-router";

export const routesPublic: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Public",
    component: () => import("../../app/public/Public.vue"),
    children: [
      {
        path: "",
        component: () => import("../../app/public/pages/auth/AuthLayout.vue"),
        children: [
          {
            path: "login",
            component: () => import("../../app/public/pages/auth/pages/Login.vue"),
            name: "Login",
          },
          {
            path: "register",
            component: () => import("../../app/public/pages/auth/pages/Register.vue"),
            name: "Register",
          },
        ],
      },
      {
        path: "terms-and-conditions",
        component: () => import("../../app/public/pages/TermsAndConditions.vue"),
        name: "TermsAndConditions",
      },
    ],
  },
];
