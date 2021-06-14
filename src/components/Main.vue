<template>
  <v-container grid-list-md>
    <v-row>
      <v-col class="d-flex justify-space-between" xs12 sm6 md3>
        <h2>Cats</h2>
        <!-- <v-btn color="accent" dark rounded class="my-2">
          <v-icon>mdi-plus</v-icon>
          Add Cat
        </v-btn> -->
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
                    <v-form>
                      <v-text-field
                        name="title"
                        label="Title"
                        type="text"
                        v-model="title"
                      ></v-text-field>
                      <v-textarea
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
              <v-btn color="accent darken-1" text @click="postItem">
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
          <v-btn
            color="red darken-1"
            text
            @click="dialogEdit = false"
          >
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
    <v-row row wrap>
      <v-col
        d-flex
        xs12
        sm6
        md4
        v-for="item in getItems"
        :key="item.id"
      >
        <v-card class="mx-auto">
          <v-img
            height="250"
            src="http://placekitten.com/200/300"
          ></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="my-4 text-subtitle-1">
                {{ item.text }}
              </div>
            </v-row>
            <v-row align="center" class="mx-0">
              <div class="my-4 text-subtitle-3">
                {{ item.date }}
              </div>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="primary" @click.stop="openEdit(item)" text>
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
    darkMode: false,
  }),
  name: 'Main',
  computed: {
    getItems: function () {
      return this.$store.getters.getItems
    },
  },
  created: function () {
    this.$store.dispatch('getItems').catch((err) => console.log(err))
  },
  methods: {
    postItem: function () {
      this.dialog = false
      const title = this.title
      const text = this.text
      const date = this.$moment(new Date()).format('YYYY-MM-DD')
      this.$store
        .dispatch('postItem', { title, text, date })
        .then()
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
        .then((res) => this.getItems())
        .catch((err) => console.log(err))
    },
    openEdit: function (item) {
      this.dialogEdit = true
      this.titleEdit = item.title
      this.textEdit = item.text
      this.idEdit = item.id
    },
  },
}
</script>
