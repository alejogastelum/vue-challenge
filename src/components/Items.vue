<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between">
        <h2>Cats</h2>
        <v-btn
          color="accent"
          dark
          @click.stop="dialog = true"
          rounded
        >
          <v-icon left>mdi-plus</v-icon>
          Add Cat
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">New Cat</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-form
                      v-model="valid"
                      @submit.prevent="postItem"
                    >
                      <v-text-field
                        :rules="textRules"
                        required
                        name="title"
                        label="Title"
                        type="text"
                        v-model="title"
                      ></v-text-field>
                      <v-textarea
                        :rules="textRules"
                        required
                        name="text"
                        label="Text"
                        type="text"
                        v-model="text"
                      ></v-textarea>
                    </v-form>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col><small>All field are required</small></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                text
                @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="accent darken-1"
                text
                @click="postItem"
                type="submit"
                :disabled="!isComplete"
              >
                Add Cat
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogEdit" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Cat</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-form>
                  <v-text-field
                    name="title"
                    label="Title"
                    type="text"
                    v-model="titleEdit"
                  ></v-text-field>
                  <v-textarea
                    name="text"
                    label="Text"
                    type="text"
                    v-model="textEdit"
                  ></v-textarea>
                </v-form>
              </v-col>
            </v-row>
            <v-row>
              <v-col><small>All field are required</small></v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="deleteItem">
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="dialogEdit = false"
          >
            Cancel
          </v-btn>
          <v-btn color="accent darken-1" text @click="putItem()">
            Edit Cat
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSuccess" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Success!</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col> Data was sent successfully! </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="dialogSuccess = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-btn
        id="fabMobile"
        class="d-md-none"
        v-bind:class="{ 'd-none': fabHide || false }"
        color="accent"
        @click.stop="dialog = true"
        dark
        fixed
        bottom
        right
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-col
        class="d-flex"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        v-for="item in getItems"
        :key="item.id"
      >
        <v-card class="d-flex flex-column" width="100%">
          <v-img
            height="250"
            max-height="250"
            :src="`http://placekitten.com/200/30${item.id}`"
          ></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div color="secondary" class="my-4 text-subtitle-3">
                {{ item.date }}
              </div>
            </v-row>
            <v-row align="center" class="mx-0">
              <div class="my-4 text-subtitle-1">
                {{ item.text }}
              </div>
            </v-row>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="accent" @click.stop="openEdit(item)" text>
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogSuccess: false,
    dialogError: false,
    titleEdit: '',
    textEdit: '',
    idEdit: '',
    title: '',
    text: '',
    id: '',
    fabHide: false,
    titleRules: [(v) => !!v || 'Title is required'],
    textRules: (v) => !!v || 'Text is required',
    valid: false,
  }),
  name: 'Items',
  computed: {
    getItems: function () {
      const storedItems = this.$store.getters.getItems
      const filteredItems = storedItems.filter(function (value) {
        return value !== null
      })
      return filteredItems
    },
    isComplete() {
      return this.title && this.text
    },
  },
  created: function () {
    this.$store.dispatch('getItems').catch((err) => console.log(err))
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    postItem: function () {
      this.dialog = false
      const title = this.title
      const text = this.text
      const date = this.$moment(new Date()).format('YYYY-MM-DD')
      this.title = ''
      this.text = ''
      this.$store
        .dispatch('postItem', { title, text, date })
        .then((res) =>
          this.$store
            .dispatch('getItems')
            .catch((err) => console.log(err)),
        )
        .catch((err) => console.log(err))
    },
    putItem: function () {
      this.dialogEdit = false
      const item = {
        id: this.idEdit,
        title: this.titleEdit,
        text: this.textEdit,
        date: this.$moment(new Date()).format('YYYY-MM-DD'),
      }
      this.titleEdit = ''
      this.textEdit = ''
      this.idEdit = ''
      this.$store
        .dispatch('putItem', item)
        .then((res) =>
          this.$store
            .dispatch('getItems')
            .catch((err) => console.log(err)),
        )
        .catch((err) => console.log(err))
    },
    deleteItem: function () {
      this.dialogEdit = false
      const id = this.idEdit
      this.titleEdit = ''
      this.textEdit = ''
      this.idEdit = ''
      this.$store
        .dispatch('deleteItem', id)
        .then((res) =>
          this.$store
            .dispatch('getItems')
            .catch((err) => console.log(err)),
        )
        .catch((err) => console.log(err))
    },
    openEdit: function (item) {
      this.dialogEdit = true
      this.titleEdit = item.title
      this.textEdit = item.text
      this.idEdit = item.id
    },
    handleScroll(event) {
      let y = window.scrollY
      if (y >= 200) {
        this.fabHide = false
      } else {
        this.fabHide = true
      }
    },
  },
}
</script>

<style></style>
