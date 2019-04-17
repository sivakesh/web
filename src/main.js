import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase/app'
import store from './store'

Vue.config.productionTip = false



// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}
firebase.initializeApp(config)

window.firebase = firebase

const unsuscribe = firebase.auth().onAuthStateChanged(user => {
  store.dispatch('setUser', user)

  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })

  unsuscribe()
})


