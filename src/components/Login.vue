<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row class="align-center justify-center">
          <v-col cols="6" xs="4" sm="4" md="2">
            <v-img src="/logo.png"></v-img>
          </v-col>
        </v-row>
        <v-row class="align-center justify-center">
          <v-col cols="12" xs="12" sm="6" md="4">
            <v-card>
              <v-card-title>Login form</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="email"
                    label="email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-btn x-large block color="accent" @click="login"
                    >Login</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login: function () {
      const email = this.email
      const password = this.password
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err))
    },
  },
}
</script>
