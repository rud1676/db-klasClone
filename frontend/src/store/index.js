import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index.js";
Vue.prototype.$http = axios;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    who: "12345",
    username: "",
    LectureList: [],
    professor: ""
  },
  mutations: {
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.who = payload.stdid;
      state.username = payload.stdname;
    },
    loginFail(state) {
      state.isLogin = false;
    }
  },
  actions: {
    login({ commit }, loginobj) {
      if (loginobj.std == "" || loginobj.checkpass == "") {
        alert("빈칸을 확인하여주세요");
        return;
      }
      axios //로그인이 성공하면 메인메뉴로 넘긴다
        .post("/api/login/usercheck", {
          user: loginobj
        })
        .then((res) => {
          if (res.data.success == true) {
            console.log(res);
            commit("loginSuccess", res.data);
            router.push({ path: "Main/" });
          }
          if (res.data.success == false) {
            alert(res.data.message);
            commit("loginFail");
          }
        })
        .catch(() => alert("error 관리자에게 문의하십시요"));
    }
  }
});
