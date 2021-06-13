<template>
  <v-container grid-list-md>
    <v-row>
      <v-col>
        <h2>Users</h2>
      </v-col>
    </v-row>
    <v-row row wrap>
      <v-col
        d-flex
        xs12
        sm6
        md4
        v-for="user in getUsers"
        :key="user.id"
      >
        <v-card class="mx-auto">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img
            height="250"
            :src="`https://i.pravatar.cc/300?u=${user.id}`"
          ></v-img>
          <v-card-title>{{ user.email }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="my-4 text-subtitle-1">
                {{ user.role }}
              </div>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  computed: {
    getUsers() {
      return this.$store.getters.getUsers
    },
  },
  created() {
    this.$store.dispatch('getUsers').catch((err) => console.log(err))
  },
}
</script>
