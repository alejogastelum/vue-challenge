<template>
  <div id="app">
    <v-app>
      <template v-if="!$route.path.includes('login')">
        <v-navigation-drawer
          v-model="drawer"
          fixed
          app
          color="pink"
          dark
        >
          <v-toolbar flat color="pink">
            <v-list>
              <v-list-item>
                <v-list-item-title class="title">
                  Cat Repo
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-toolbar>
          <v-list>
            <v-list-item @click="drawer = false" to="/">
              <v-list-item-action>
                <v-icon>category</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Items</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="drawer = false"
              v-if="!$route.path.includes('login')"
            >
              <v-list-item-action>
                <v-icon>people</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Users</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <template v-slot:append>
            <v-list>
              <v-list-item @click="logout">
                <v-list-item-action>
                  <v-icon>logout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </template>
        </v-navigation-drawer>
        <v-app-bar color="primary" dark fixed app>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>Cat Repo</v-toolbar-title>
        </v-app-bar>
      </template>
      <v-main>
        <keep-alive :include="['Login']">
          <router-view></router-view>
        </keep-alive>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style></style>
