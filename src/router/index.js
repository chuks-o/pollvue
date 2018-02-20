import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreatePoll from '@/components/CreatePoll'
import SignIn from '@/components/SignIn'
import TodoList from '@/components/TodoList'
import EmailConfirm from '@/components/EmailConfirm'
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
      path: '/todo',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/emailconfirm',
      name: 'EmailConfirm',
      component: EmailConfirm
    },
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