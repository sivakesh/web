<template>
  <v-app>
    <v-toolbar app flat>
      <v-toolbar-title class="headline text-uppercase">
        <!-- <span>Vuetify</span> -->
        <span class="font-weight-light">Sivakesh Raman</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        @click='loginWithGoogle()'
      >
        <span class="mr-2">Login with google</span>
        
      </v-btn>
    </v-toolbar>

    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import auth from 'firebase/auth'
import Home from './components/Home'

export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      //
    }
  },
  methods: {
    loginWithGoogle() {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(function(response) {
        console.log(response.user)
      })
    }
  }

}
</script>
