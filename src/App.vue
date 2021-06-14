<template>
  <div id="app">
    <v-app :dark="darkMode">
      <template v-if="!$route.path.includes('login')">
        <v-navigation-drawer
          v-model="drawer"
          fixed
          app
          color="secondary"
        >
          <v-toolbar color="accent" dark flat>
            <v-list>
              <v-list-item>
                <v-list-item-title class="title">
                  Menu
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
              v-if="$store.getters.isAdmin"
              to="/users"
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
              <v-list-item>
                <v-switch
                  label="Dark Mode"
                  v-model="$vuetify.theme.dark"
                ></v-switch>
              </v-list-item>
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
        <v-app-bar color="secondary" fixed app>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>Cat Repo</v-toolbar-title>
        </v-app-bar>
      </template>
      <v-main color="secondary" class="pb-16">
        <keep-alive :include="['Login']">
          <router-view></router-view>
        </keep-alive>
      </v-main>
      <v-footer color="primary" padless>
        <v-row justify="center" no-gutters>
          <v-col
            class="primary py-4 text-center white--text"
            cols="12"
          >
            {{ new Date().getFullYear() }} —
            <strong>Cat Repo</strong>
          </v-col>
        </v-row>
      </v-footer>
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
  created() {
    this.$vuetify.theme.dark = false
  },
  computed: {
    isLoggedIn: () => {
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
