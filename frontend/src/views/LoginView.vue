<template>
  <v-app>
    <v-container class="fill-height">
      <v-row>
        <v-col class="d-flex flex-column justify-center">
          <v-layout class="d-flex justify-center mb-10">
            <img
              width="500"
              style="position: absolute; top: -30px"
              src="../assets/logo.jpg"
            />
          </v-layout>
          <v-layout class="d-flex justify-center mb-10"> </v-layout>
          <div class="d-flex justify-center">
            <v-card style="width: 450px" v-if="View === 'login'">
              <v-toolbar color="red darken-4" dark style="text-align: center">
                <v-toolbar-title>개인 학적 관리 서비스</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="pb-0">
                <v-form>
                  <v-text-field
                    label="학번"
                    v-model="id"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="패스워드"
                    v-model="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-btn rounded color="red darken-4" dark width="100%">
                        로그인
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col align="center" cols="6">
                      <v-btn
                        color="red darken-1"
                        class="white--text"
                        @click="change = true"
                        width="100%"
                        >비밀번호 재설정</v-btn
                      >
                      <v-overlay v-bind:dark="false" :value="change">
                        <ChangePassword :regist.sync="change" />
                      </v-overlay>
                    </v-col>
                    <v-col align="center" cols="6">
                      <v-btn
                        color="red darken-1"
                        class="white--text"
                        width="100%"
                        @click="View = 'confirm'"
                        >개인번호 조회</v-btn
                      >
                    </v-col>
                    <v-row>
                      <v-col align="center">
                        <v-btn
                          color="red darken-1"
                          class="white--text font-weight-thin"
                          width="90%"
                          @click="regist = true"
                          >비밀번호 최초 등록</v-btn
                        >
                        <v-overlay v-bind:dark="false" :value="regist">
                          <FirstRegist :regist.sync="regist" />
                        </v-overlay>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import FirstRegist from "../components/AboutLogin/FirstRegistPassword.vue";
import ChangePassword from "../components/AboutLogin/ChangePassword.vue";
export default {
  components: {
    FirstRegist,
    ChangePassword,
  },
  data() {
    return {
      regist: false, //등록 폼 부를때 오버레이 효과로 사용하기 위한 함수
      change: false, //비번바꾸는 폼 부를때 오버레이 효과로 사용하기 위한 함수
      id: "",
      password: "",
      View: "login",
    };
  },
  methods: {
    // ...mapActions(["Login"])
  },
};
</script>
