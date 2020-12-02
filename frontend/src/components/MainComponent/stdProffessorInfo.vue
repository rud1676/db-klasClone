<template>
  <v-card class="mx-auto" max-width="70%" tile style="margin-top: 80px">
    <v-card-title class="font-weight-bold">
      {{ $store.state.username }}님의 담당 교수 정보</v-card-title
    >
    <v-divider></v-divider>
    <div>
      <v-simple-table
        style="width: 90%; margin-left: auto; margin-right: auto;"
        dense
      >
        <thead></thead>
        <tbody>
          <p></p>
          <tr>
            <td class="text-center"><strong>성명</strong></td>
            <td>{{ $store.state.professor.p_name }}</td>
            <td class="text-center"><strong>이메일</strong></td>
            <td>{{ $store.state.professor.p_e_mail }}</td>
          </tr>
          <tr>
            <td class="text-center"><strong>성별</strong></td>
            <td v-if="($store.state.professor.p_sex = 'M')">남</td>
            <td v-else>여</td>
            <td class="text-center"><strong>전화번호</strong></td>
            <td>{{ $store.state.professor.p_tel_no }}</td>
          </tr>
        </tbody>
        <p></p>
      </v-simple-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      professorSex: ""
    };
  }
};
</script>
<style>
table {
  width: 100%;

  border-collapse: collapse;
}
th,
td {
  border-bottom: 1px solid #d1d1d1;
  padding: 10px;
}
th:nth-child(2n),
td:nth-child(2n) {
  background-color: #ffffff;
}
th:nth-child(2n + 1),
td:nth-child(2n + 1) {
  background-color: #e0e0e0;
}
</style>
