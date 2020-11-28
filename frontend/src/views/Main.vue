<template>
  <v-app>
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute
      color="red darken-4"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
        >{{ $store.state.who }} - {{ $store.state.username }}</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-checkbox
        v-model="collapseOnScroll"
        color="white"
        hide-details
      ></v-checkbox>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            @click="$router.push({ name: 'childmain' }).catch(() => {})"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>홈 화면</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'enrolment' })">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>수강신청</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>강의별 공지사항</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>성적 조회</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view :key="$route.fullPath"></router-view>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: 0,
    collapseOnScroll: true,
  }),
  computed: {},
  created() {},
  methods: {},
};
</script>
