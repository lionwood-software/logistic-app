import { RouteRecordRaw } from "vue-router";

export const routePrivateProfile: Array<RouteRecordRaw> = [
  {
    path: "profile",
    name: "ProfileLayout",
    component: () => import("@/app/private/pages/profile/ProfileLayout.vue"),
    children: [
      {
        path: "",
        name: "Profile",
        component: () => import("@/app/private/pages/profile/pages/my-profile/MyProfile.vue"),
      },
      {
        path: "company",
        name: "Company",
        component: () =>
          import("@/app/private/pages/profile/pages/my-profile/pages/CompanyInfo.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () =>
          import("@/app/private/pages/profile/pages/my-profile/pages/ContactInfo.vue"),
      },
    ],
  },
];
