import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Create from '@/components/Create'
import auth from "firebase/auth";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      beforeEnter: (to, from, next) => {
          if (!firebase.auth().currentUser) {
              next("/");
          } else {
              next();
          }
      }
    }
  ]
})
