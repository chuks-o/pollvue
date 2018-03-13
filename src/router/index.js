import Vue from 'vue'
import Router from 'vue-router'
import routes  from './routes'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes
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