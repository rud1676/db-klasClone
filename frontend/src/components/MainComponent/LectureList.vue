<template>
  <v-card class="mx-auto" max-width="70%" tile style="margin-top: 80px">
    <v-card-title class="font-weight-bold">수강 과목</v-card-title>
    <v-divider></v-divider>
    <v-list-item
      v-for="lecture in $store.state.LectureList"
      v-bind:key="lecture.lecture_code"
    >
      <v-list-item-content>
        <v-list-item-title
          ><strong>{{ lecture.lecture_name }}</strong></v-list-item-title
        >
        <v-list-item-subtitle>{{ lecture.p_name }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-btn class="mr-5" color="red darken-1 white--text" v-on:click.stop
        >공지사항</v-btn
      >
      <v-btn color="red darken-1 white--text">강의정보</v-btn>
    </v-list-item>
  </v-card>
</template>
  <script>
export default {
  data() {
    return {};
  },
};
</script>