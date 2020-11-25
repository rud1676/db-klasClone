import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import mainview from "../components/mainview.vue";
import registclass from "../components/RegistClass.vue";
import board from "../components/board.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "",
        component: mainview
      },
      {
        path: "registclass",
        component: registclass
      },
      {
        path: "board",
        component: board
      }
    ]
  },
  {
    path: "/LoginView",
    name: "LoginView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/LoginView.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
