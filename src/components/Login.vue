<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row class="align-center justify-center">
          <v-col cols="6" xs="4" sm="4" md="2">
            <v-img src="/logo.png"></v-img>
          </v-col>
        </v-row>
        <v-row :class="{ 'd-none': !authFailed }">
          <v-col>Incorrect email or password</v-col>
        </v-row>
        <v-row class="align-center justify-center">
          <v-col cols="12" xs="12" sm="6" md="4">
            <v-card>
              <v-card-title>Login form</v-card-title>
              <v-card-text>
                <v-form v-model="valid" @submit.prevent="login">
                  <v-text-field
                    :rules="emailRules"
                    required
                    prepend-icon="person"
                    name="email"
                    label="Email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    :rules="passwordRules"
                    required
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-btn
                    class="mt-4"
                    x-large
                    block
                    color="accent"
                    @click="login"
                    type="submit"
                    :disabled="!isComplete"
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
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [(v) => !!v || 'Password is required'],
      valid: false,
    }
  },
  computed: {
    isComplete() {
      return this.password && this.email
    },
    authFailed() {
      return this.$store.getters.authStatus === 'error' ? true : false
    },
  },
  methods: {
    login: function () {
      const email = this.email
      const password = this.password
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch((err) => {
          this.authFailed = true
          console.log(err)
        })
    },
  },
}
</script>
