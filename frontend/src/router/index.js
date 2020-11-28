import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";
import Main from "../views/Main.vue";
import axios from "axios";
Vue.use(VueRouter);

const onlyAuthor = (to, from, next) => {
  console.log(store.state.isLogin);
  if (store.state.isLogin === false) {
    next("/Loginview");
  } else {
    axios
      .post("/api/std/lecturelist", {
        stdid: store.state.who
      })
      .then((res) => {
        if (res) {
          res.data.lectures.forEach((lecutre) => {
            store.state.LectureList.push(lecutre);
          });
        }
      });
    next();
  }
};

const routes = [
  {
    path: "/",
    redirect: "/Main/"
  },
  {
    path: "/Main",
    name: "Main",
    beforeEnter: onlyAuthor,
    component: Main,
    children: [
      {
        path: "/",
        component: () => import("../components/main.vue")
      }
    ]
  },
  {
    path: "/LoginView",
    name: "LoginView",
    component: () => import("../views/LoginView.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
