import Vue from 'vue'
import Router from 'vue-router'
import FactsList from './views/FactsList.vue'
import FactView from './views/FactView.vue'
import LoginView from './views/LoginView.vue'
import { getItemFromStorage } from './utils/localStorage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/facts', component: FactsList, meta: { requiresAuth: true } },
    { path: '/fact', component: FactView, meta: { requiresAuth: true, requiresQuery: 'id' } }, // should be with a query, for ex. ?id=123
    { path: '/login', component: LoginView },
  ],
  scrollBehavior() {
    // Always scroll to top
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const userName = getItemFromStorage('userName')

  if (to.path === '/') {
    next('/facts')
    return
  }

  if (to.meta.requiresAuth && !userName) {
    next('/login')
    return
  }

  if (to.meta.requiresQuery) {
    const requiredQuery = to.meta.requiresQuery
    if (!to.query[requiredQuery]) {
      next('/facts')
      return
    }
  }

  if (to.path === '/login' && userName) {
    next('/facts')
    return
  }

  next()
})

export default router