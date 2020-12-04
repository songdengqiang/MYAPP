import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/components/HomePage'),
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: () => import('@/components/firstPage')
        }
      ]
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: () => import('@/components/HomePage'),
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: () => import('@/components/firstPage')
        }
      ]
    }
  ]
})
