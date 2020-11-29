<template>
  <v-card class="mx-auto" max-width="70%" tile style="margin-top: 80px">
    <v-card-title class="font-weight-bold">수강 과목</v-card-title>
    <v-divider></v-divider>
    <v-list-item
      v-for="lecture in LectureList"
      v-bind:key="lecture.lecture_code"
    >
      <v-list-item-content>
        <v-list-item-title
          >{{ lecture.lecture_name }} --
          {{ lecture.lecture_code }}</v-list-item-title
        >
        <v-list-item-subtitle
          >{{ lecture.lecture_time_1 }} ~ {{ lecture.lecture_time_2 }}
          {{ lecture.lecture_room }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-spacer></v-spacer>
      <p class="pt-5 mr-10">{{ lecture.lecture_classification }}</p>
      <v-btn
        color="red darken-1"
        class="white--text font-weight-thin"
        @click="enrol"
        >수강신청</v-btn
      >
    </v-list-item>
    <v-divider></v-divider>
    <v-card-title class="font-weight-bold">신청 과목</v-card-title>
    <v-list-item
      v-for="lecture in stdLectureList"
      v-bind:key="lecture.lecture_code"
    >
      <v-list-item-content>
        <v-list-item-title
          >{{ lecture.lecture_name }} --
          {{ lecture.lecture_code }}</v-list-item-title
        >
        <v-list-item-subtitle
          >{{ lecture.lecture_time_1 }} ~ {{ lecture.lecture_time_2 }}
          {{ lecture.lecture_room }}</v-list-item-subtitle
        >
      </v-list-item-content>
      <v-spacer></v-spacer>
      <p class="pt-5 mr-10">{{ lecture.lecture_classification }}</p>
      <v-btn color="red darken-3" class="white--text font-weight-thin"
        >수강 취소</v-btn
      >
    </v-list-item>
  </v-card>
</template>
  <script>
import store from "../../store/index.js";
export default {
  data() {
    return {
      LectureList: [],
      stdLectureList: [],
    };
  },
  methods: {
    enrol: function (event) {
      console.log(event);
      console.log(this);
    },
  },
  created: function () {
    this.$http.get("/api/enrol/").then((res) => {
      while (this.LectureList.length != 0) this.LectureList.pop();
      res.data.lectures.forEach((lecture) => {
        this.LectureList.push(lecture);
      });
    });

    this.$http
      .post("/api/enrol/stdlec", {
        std: { stdid: store.state.who, semester: "2020-2" },
      })
      .then((res) => {
        while (this.stdLectureList.length != 0) this.stdLectureList.pop();
        res.data.stdlecture.forEach((lecture) => {
          this.stdLectureList.push(lecture);
        });
      });
  },
};
</script>