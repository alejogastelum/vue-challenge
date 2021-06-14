<template>
  <v-container grid-list-md>
    <v-row>
      <v-col>
        <h2>Users</h2>
      </v-col>
    </v-row>
    <v-row row wrap>
      <v-col d-flex xs12>
        <v-card class="mx-auto">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="getUsers"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Email',
          value: 'email',
        },
        { text: 'Password', value: 'password' },
        { text: 'Role', value: 'role' },
      ],
    }
  },
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
