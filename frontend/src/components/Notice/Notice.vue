<template>
  <v-card class="mx-auto" max-width="70%" tile style="margin-top: 80px">
    <v-card-title class="font-weight-bold">과목별 공지 사항 </v-card-title>
    <v-divider></v-divider>
 <v-list>
      <v-list-group
        v-for="lecture in $store.state.LectureList"
        v-bind:key="lecture.lecture_code"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <strong><v-list-item-title v-text="lecture.lecture_name"></v-list-item-title></strong>
          </v-list-item-content>
        </template>
        <v-subheader> 제목 </v-subheader>
        
        <v-divider></v-divider>
        <v-list-group
        prepend-icon="mdi-check-circle"
         no-action
          sub-group
          v-for="notice in $store.state.NoticeList" v-show="notice.lecture_name == lecture.lecture_name"
          v-bind:key="notice.lecture_name"
        >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="notice.notice_title"></v-list-item-title>
          </v-list-item-content>
          <date>{{notice.notice_create}}</date>
        </template>
        
          <v-list-item-content >
            <v-list-item>내용 : {{notice.notice_description}}</v-list-item>
            <v-divider></v-divider>
          </v-list-item-content>
          
        </v-list-group>
      </v-list-group>
    </v-list>
    
  </v-card>
</template>
  

