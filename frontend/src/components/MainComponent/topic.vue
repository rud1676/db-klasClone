<template>
  <v-card class="mx-auto" max-width="70%" tile style="margin-top: 80px">
    <v-card-title class="font-weight-bold">과목별 Notice </v-card-title>
    <v-divider></v-divider>
    <v-list-item
      v-for="notice in $store.state.NoticeList.slice(0,5)"
      v-bind:key="notice.lecture_name"
    >
    
      <v-list-item-content>
        <v-list-item-title @click="$router.push({ name: 'notice' })"
          >{{ notice.notice_create }}>
          <strong>{{ notice.lecture_name }}</strong> - 
          {{notice.notice_title}}</v-list-item-title
        >
      </v-list-item-content>
      <v-spacer></v-spacer>
    </v-list-item>
  </v-card>
</template>
