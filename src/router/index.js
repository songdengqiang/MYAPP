import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/components/HomePage')
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: () => import('@/components/HomePage')
    }
  ]
})
