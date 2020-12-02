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
          while (store.state.LectureList.length != 0) {
            store.state.LectureList.pop();
          }
          res.data.lectures.forEach((lecutre) => {
            store.state.LectureList.push(lecutre);
          });
        }
      });
    axios
      .post("/api/std/noticelist", {
        stdid: store.state.who
      })
      .then((res) => {
        if (res) {
          console.log(res);
          while (store.state.NoticeList.length != 0) {
            store.state.NoticeList.pop();
          }
          res.data.notices.forEach((notice) => {
            store.state.NoticeList.push(notice);
          });
        }
      });
    axios
      .post("/api/std/professor", {
        stdid: store.state.who
      })
      .then((res) => {
        if (res) {
          store.state.professor = JSON.parse(JSON.stringify(res.data.pinfo[0]));
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
        name: "childmain",
        component: () => import("../components/MainComponent/main.vue")
      },
      {
        path: "/enrolment",
        name: "enrolment",
        component: () => import("../components/Enrolment/main.vue")
      },
      {
        path: "/notice",
        name: "notice",
        component: () => import("../components/Notice/main.vue")
      },
      {
        path: "/score",
        name: "score",
        component: () => import("../components/ScoreComponents/main.vue")
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
