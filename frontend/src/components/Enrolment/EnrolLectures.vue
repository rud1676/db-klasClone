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
          >{{ lecture.lecture_name }} -- {{ lecture.lecture_code }}
        </v-list-item-title>
        <v-list-item-subtitle
          >{{ lecture.lecture_time1 }} ~ {{ lecture.lecture_time2 }}
          {{ lecture.lecture_room }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-spacer></v-spacer>
      <p class="pt-5 mr-10">
        <strong>{{ lecture.p_name }}</strong> |
        {{ lecture.lecture_classification }}
      </p>
      <v-btn
        color="red darken-1"
        class="white--text font-weight-thin"
        @click="enrol(lecture.lecture_code)"
        >수강신청</v-btn
      >
    </v-list-item>
    <v-divider></v-divider>
    <v-card-title class="font-weight-bold">신청 과목</v-card-title>
    <v-list-item v-for="lecture in stdLectureList" v-bind:key="lecture.id">
      <v-list-item-content>
        <v-list-item-title
          ><strong>{{ lecture.id }}.</strong> {{ lecture.lecture_name }} --
          {{ lecture.lecture_code }} -
        </v-list-item-title>
        <v-list-item-subtitle
          >{{ lecture.lecture_time1 }} ~ {{ lecture.lecture_time2 }}
          {{ lecture.lecture_room }}</v-list-item-subtitle
        >
      </v-list-item-content>
      <v-spacer></v-spacer>
      <p class="pt-5 mr-10">
        <strong>{{ lecture.p_name }}</strong> |{{
          lecture.lecture_classification
        }}
      </p>
      <v-btn
        color="red darken-3"
        class="white--text font-weight-thin"
        @click="cancel(lecture.lecture_code)"
        >수강 취소</v-btn
      >
    </v-list-item>
    <v-row class="pb-5 justify-center mt-5">
      <v-btn
        width="80%"
        color="red darken-1"
        class="white--text"
        @click="submit"
        ><strong>제출</strong></v-btn
      >
    </v-row>
  </v-card>
</template>
  <script>
import store from "../../store/index.js";
import axios from "axios";
export default {
  data() {
    return {
      LectureList: [],
      stdLectureList: [],
    };
  },
  methods: {
    setid(lectures) {
      let index = 1;
      lectures.forEach((lecture) => {
        lecture.id = index++;
      });
    },
    enrol(lecturecode) {
      if (
        this.stdLectureList.find(
          (lecture) => lecture.lecture_code === lecturecode
        )
      )
        return;
      this.stdLectureList.push(
        this.LectureList.find((lecture) => lecture.lecture_code === lecturecode)
      );
      this.setid(this.stdLectureList);
    },
    cancel(lecturecode) {
      const delIndex = this.stdLectureList.indexOf(
        this.LectureList.find((lecture) => lecture.lecture_code === lecturecode)
      );
      this.stdLectureList.splice(delIndex, 1);
      this.setid(this.stdLectureList);
    },
    submit() {
      axios
        .post("/api/enrol/submit", {
          lectures: this.stdLectureList,
          std: store.state.who,
          semester: "2020-2",
        })
        .then((res) => {
          if (res.data.success == true) {
            alert("수강 신청이 완료되었습니다.");
          }
        });
    },
  },
  mounted: function () {
    axios.get("/api/enrol/").then((res) => {
      console.log(res.data);
      res.data.lectures.forEach((lecture) => {
        this.LectureList.push(lecture);
      });
    });

    axios
      .post("/api/enrol/stdlec", {
        std: { stdid: store.state.who, semester: "2020-2" },
      })
      .then((res) => {
        res.data.stdlectures.forEach((lecture) => {
          this.stdLectureList.push(lecture);
        });
        this.setid(this.stdLectureList);
      });
  },
};
</script>