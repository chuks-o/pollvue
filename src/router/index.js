import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreatePoll from '@/components/CreatePoll'
import SignIn from '@/components/SignIn'
import EmailConfirm from '@/components/EmailConfirm'
import Profile from '@/components/Profile'
import Polls from '@/components/Polls'
import Poll from '@/components/Poll'
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
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/emailconfirm',
      name: 'EmailConfirm',
      component: EmailConfirm
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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/polls',
      name: 'Polls',
      component: Polls,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/poll/:id',
      name: 'Poll',
      component: Poll,
      meta: {
        requiresAuth: true
      }
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
    next('/polls');
  } 
  else {
    next();
  }
});

export default router