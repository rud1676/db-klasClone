<template>
  <v-card class="mt-14" width="80%" style="margin: auto">
    <v-card-title class="font-weight-bold">학점 리스트</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">학정번호</th>
            <th class="text-left">과목</th>
            <th class="text-left">분류</th>
            <th class="text-left">학점</th>
            <th class="text-left">학기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lecture in scorelist" :key="lecture.lecture_code">
            <td>{{ lecture.lecture_code }}</td>
            <td>{{ lecture.lecture_name }}</td>
            <td>{{ lecture.lecture_classification }}</td>
            <td>{{ lecture.score }}</td>
            <td>{{ lecture.class_semester }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import store from "../../store/index.js";
import axios from "axios";
export default {
  data() {
    return {
      scorelist: []
    };
  },
  mounted: function() {
    axios
      .post("/api/score/", {
        stdid: store.state.who
      })
      .then((res) => {
        this.scorelist = res.data.lectures;
        console.log(this.scorelist);
        this.scorelist.sort((
          a,
          b //학기별로 오름차순 정렬
        ) =>
          a.class_semester >= b.class_semester
            ? -1
            : a.class_semester < b.class_semester
            ? 1
            : 0
        );
      });
  }
};
</script>
