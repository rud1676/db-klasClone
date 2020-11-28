<template>
  <v-card style="width: 450px">
    <v-toolbar color="red darken-4" dark style="text-align: center">
      <v-toolbar-title>개인번호 조회</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="이름"
          v-model="user.name"
          type="text"
        ></v-text-field>
        <v-text-field
          label="생년월일"
          v-model="user.prime"
          type="text"
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
        @click="LookUpcheck"
        >조회</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: { change: Boolean },
  data() {
    return {
      user: {
        name: "",  //이름
        prime: "", //주민번호 앞자리
      },
    };
  },
  methods: {
    cancel() {
      this.$emit("update:lookup",false);
    },
    LookUpcheck() {
      if (this.user.name == "" || this.user.prime == "") {
        alert("빈칸을 확인하여주세요");
        return;
      }
      this.$http
        .post("/api/login/lookup", {
          user: this.user,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success == true) {
            alert(res.data.message);
          }
        })
        .catch(() => alert("error 관리자에게 문의하십시요"));
    },
  },
};
</script>
