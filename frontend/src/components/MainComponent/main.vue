<template>
  <v-main>
    <LectureList />
    <topic></topic>
    <ProInfo />
  </v-main>
</template>
<script>
import LectureList from "./LectureList.vue";
import ProInfo from "./stdProffessorInfo.vue";
import topic from "./topic.vue";
import axios from "axios";
import store from "../../store/index.js";
export default {
  components: {
    LectureList,
    ProInfo,
    topic,
  },
  mounted: function () {
    axios
      .post("/api/std/lecturelist", {
        stdid: store.state.who,
      })
      .then((res) => {
        if (res) {
          console.log(store.state.LectureList);
          while (store.state.LectureList.length != 0) {
            store.state.LectureList.pop();
          }
          res.data.lectures.forEach((lecutre) => {
            store.state.LectureList.push(lecutre);
          });
          console.log(store.state.LectureList);
        }
      });
  },
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
