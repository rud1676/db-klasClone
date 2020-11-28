<template>
  <v-card class="mx-auto" max-width="70%" tile style="margin-top: 80px">
    <v-card-title class="font-weight-bold">
      {{ $store.state.username }}님의 담당 교수 정보</v-card-title
    >
    <v-divider></v-divider>
    <v-card-text>
      <p class="display-1 text--primary">{{ $store.state.professor.p_name }}</p>
      <p v-if="($store.state.professor.p_sex = 'M')">남</p>
      <p v-else>여</p>
      <div class="text--primary subtitle-1">
        {{ $store.state.professor.p_tel_no }}
      </div>
      <div class="text--primary subtitle-1">
        {{ $store.state.professor.p_e_mail }}
      </div>
    </v-card-text>
  </v-card>
</template>
  <script>
export default {
  data() {
    return {
      professorSex: "",
    };
  },
};
</script>