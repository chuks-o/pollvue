import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreatePoll from '@/components/CreatePoll'
import SignUp from '@/components/Signup'
import Auth from '@/components/Auth'
import firebase from 'firebase'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/create',
      name: 'CreatePoll',
      component: CreatePoll,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/auth');
  } 
  else if (!requiresAuth && currentUser) {
    next('/create');
  } 
  else {
    next();
  }
});

export default router