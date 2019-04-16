<template>
  <v-app>
    <v-toolbar app flat>
      <v-toolbar-title class="headline text-uppercase">
        <!-- <span>Vuetify</span> -->
        <span class="font-weight-light">Sivakesh Raman</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!currentUser"
        flat
        @click='loginWithGoogle()'
      >
        <span class="mr-2">Login with google</span>
        
      </v-btn>
      <v-btn
        v-else
        flat
        @click='Create()'
      >
        <span class="mr-2">Create</span>
        
      </v-btn>
      <v-btn
        v-if="currentUser"
        flat
        @click='logout()'
      >
        <span class="mr-2">Logout</span>
        
      </v-btn>
      <div class="text-xs-center" v-if="currentUser">
          <v-chip>
            <v-avatar>
              <img :src="currentUser.photoURL" alt="trevor">
            </v-avatar>
            {{currentUser.displayName}}
          </v-chip>
        </div>
    </v-toolbar>

    <v-content>
       <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import auth from 'firebase/auth'
import Home from './components/Home'
import database from 'firebase/database'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['currentUser'])
  },
  components: {
    Home
  },
  data () {
    return {
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    }
  },
  methods: {
    loginWithGoogle() {

      //loading set to true
      this.loading = true

      //clear errors
      this.errors =  []

      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        //pass users to save in db
        this.saveUserToUserRef(user)

        // dispatch setUser action
        this.$store.dispatch('setUser', user)
        //console.log()
      })
      .catch(error => {
        this.errors.push(error.message)
        console.log(this.errors)
        this.loading = false
      })
    },
    //save user in DB
    saveUserToUserRef(user) {
      return this.usersRef.child(user.uid).set({
        name: user.displayName,
        avatar: user.photoURL
      })
    },
    logout() {
      firebase.auth().signOut()
      this.$store.dispatch('setUser', null)
      this.user = null
      this.$router.push('/')
    },
    Create() {
      this.$router.push('Create')
    }
  }

}
</script>
