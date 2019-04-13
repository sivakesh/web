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
  apiKey: "AIzaSyCs1lLmJJhZZ3ZU5BjLaEo5NfW1Nb_UCa8",
  authDomain: "sivakesh-raman.firebaseapp.com",
  databaseURL: "https://sivakesh-raman.firebaseio.com",
  projectId: "sivakesh-raman",
  storageBucket: "sivakesh-raman.appspot.com",
  messagingSenderId: "448801593562"
};
firebase.initializeApp(config)

window.firebase = firebase

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
