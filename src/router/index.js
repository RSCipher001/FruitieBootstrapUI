import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
  },
  {
    path: "/integration",
    name: "Integration",
    component: () =>
      import(/* webpackChunkName: "integration" */ "../views/Integration.vue")
  },
  {
    path: "/reddit",
    name: "Reddit",
    component: () =>
      import(/* webpackChunkName: "reddit" */ "../views/Reddit.vue")
  },
  {
    path: "/integration/twitter/callback",
    name: "IntegrationTwitterCallback",
    component: () =>
      import(
        /* webpackChunkName: "integration-callback" */ "../views/IntegrationCallback.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
