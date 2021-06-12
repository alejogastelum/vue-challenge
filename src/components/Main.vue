<template>
  <v-app>
    <v-main>
      <v-container>
        <v-layout fill-height>
          <v-flex xs12 sm6 md3>
            <div>Hello World</div>
            <v-btn color="pink" dark>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-footer color="primary lighten-1" padless fixed>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} —
          <strong>Cat Repo</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Main',
}
</script>
