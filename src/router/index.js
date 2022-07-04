import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Army Trak",
    component: Dashboard,
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  {
    path: "/location",
    name: "Map",
    component: () =>
      import(
        /* webpackChunkName: "Map" */ "../views/Map.vue"
      ),
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () =>
      import(
        /* webpackChunkName: "Calendar" */ "../views/Calendar.vue"
      ),
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  {
    path: "/user",
    name: "User Management",
    component: () =>
      import(
        /* webpackChunkName: "User Management" */ "../views/User.vue"
      ),
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  //Unicoms
  {
    path: "/mail",
    name: "Mail View",
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "Email" */ "../views/EmailBase.vue"),
    children: [
      {
        path: "",
        name: "Email",
        component: () => import("../components/email.vue"),
        meta: {
          showHeader: true,
          requiresAuth: true,
        },
      },
      {
        path: "/mail/inbox",
        name: "Email Inbox",
        component: () => import("../components/emailInbox.vue"),
        meta: {
          showHeader: true,
          requiresAuth: true,
        },
      },
      {
        path: "/mail/inbox/:id",
        name: "Email View",
        component: () => import("../components/emailRead.vue"),
        meta: {
          showHeader: true,
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/comm-center",
    name: "Comm Center",
    component: () =>
      import(/* webpackChunkName: "Comms CEnter" */ "../views/CommsCenter.vue"),
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      showHeader: false,
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

// // Working Route Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !store.state.token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
