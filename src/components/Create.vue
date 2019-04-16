<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Post added successful!</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.title"
              :rules="rules.title"
              color="purple darken-2"
              label="Title"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              v-model="form.category"
              :items="category"
              :rules="rules.category"
              color="purple darken-2"
              label="Category"
              required
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-textarea v-model="form.post" color="purple darken-2">
              <template v-slot:label>
                <div>
                  Post
                  <small>(required)</small>
                </div>
              </template>
            </v-textarea>
          </v-flex>
          <v-flex xs12 sm6 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <img :src="imageUrl" height="150" v-if="imageUrl">
            <v-text-field
              label="Select Image"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="attach_file"
              color="purple darken-2"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            >
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Publish Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable color="purple darken-2">
                <v-spacer></v-spacer>
                <v-btn flat color="purple darken-2" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="purple darken-2" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn flat @click="resetForm">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" flat color="purple darken-2" type="submit">Submit</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import database from 'firebase/database'
import storage from 'firebase/storage'
import slugify from 'slugify'
import uuidv4 from 'uuid/V4'

export default {
  data() {
    const defaultForm = Object.freeze({
      title: "",
      image: "",
      post: "",
      category: "",
      date: new Date().toISOString().substr(0, 10),
      slug: "",
      approved: true,
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        post: [val => (val || "").length > 0 || "This field is required"],
        title: [val => (val || "").length > 0 || "This field is required"],
        category: [val => (val || "").length > 0 || "This field is required"]
      },
      category: ["DevOps", "Vue", "ML", "Python"],
      conditions: false,
      snackbar: false,
      defaultForm,
      picker: new Date().toISOString().substr(0, 10),
      landscape: true,
      reactive: true,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      postsRef: firebase.database().ref('posts'),
      storageRef: firebase.storage().ref('posts')
    };
  },
  computed: {
    formIsValid() {
      return this.form.post && this.form.category && this.form.title;
    }
  },
  components: {
  },
  methods: {
    fileChanged(file) {
      // handle file here. File will be an object.
      // If multiple prop is true, it will return an object array of files.
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.imageUrl = ""
      this.$refs.form.reset();
    },
    submit() {
      this.snackbar = true;
      this.form.date = this.date
      this.form.image = this.imageName
      let slug = slugify(this.form.title, {
        replacment: '-',
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true
      })
      this.form.slug = slug
      console.log(this.form)
      this.savePost(this.form)
      this.resetForm()
    },
    savePost(data) {
      let url = uuidv4() + "-" + this.imageName
      this.storageRef.child(url).put(this.imageFile)
      console.log(url)
      data.image = url
      this.postsRef.child(data.slug).set(data)
    },
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  }
};
</script>
<style scoped>
</style>

