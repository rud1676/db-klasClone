<template>
  <v-card style="width: 450px">
    <v-toolbar color="red darken-4" dark style="text-align: center">
      <v-toolbar-title>비밀번호 재설정</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-if="check">
        <v-text-field
          label="학번"
          v-model="user.std"
          type="text"
        ></v-text-field>
        <v-text-field
          label="비밀번호"
          v-model="user.checkpass"
          type="password"
        ></v-text-field>
      </v-form>
      <v-form v-else>
        <v-text-field
          type="password"
          label="새 비밀번호"
          v-model="user.pass"
        ></v-text-field>
        <v-text-field
          type="password"
          label="새 비밀번호확인"
          v-model="user.repass"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="red darken-4" class="white--text" @click="cancel"
        >취소</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        color="red darken-4"
        class="white--text"
        @click="checkuser"
        v-if="check"
        >조회</v-btn
      >
      <v-btn color="red darken-4" class="white--text" @click="SignUp" v-else
        >비밀번호 등록</v-btn
      >
      <!--회원가입 함수 만들기-->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: { change: Boolean },
  data() {
    return {
      check: true,
      user: {
        std: "",
        checkpass: "",
        pass: "",
        repass: "",
      },
    };
  },
  methods: {
    cancel() {
      this.$emit("update:regist", false);
    },
    checkuser() {
      if (this.user.std == "" || this.user.checkpass == "") {
        alert("빈칸을 확인하여주세요");
        return;
      }
      this.$http
        .post("/api/login/usercheck", {
          user: this.user,
        })
        .then((res) => {
          if (res.data.success == true) {
            this.check = false;
          }
          if (res.data.success == false) {
            alert(res.data.message);
          }
        })
        .catch(() => alert("error 관리자에게 문의하십시요"));
    },
    //db에서 password 바꾸기!
    SignUp() {
      if (this.user.pass != this.user.repass)
        alert("비밀번호가 다릅니다 확인해주세요!");
      else {
        this.$http
          .post("/api/login/regist", { user: this.user })
          .then((res) => {
            alert(res.data.message);
            this.$emit("update:regist", false);
          });
      }
    },
  },
};
</script>
