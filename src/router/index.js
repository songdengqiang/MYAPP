import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    // 默认目录（一级）
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/components/HomePage'),
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: () => import('@/components/firstPage'),
          children: [
            {
              path: '/',
              name: 'imgInput',
              component: () => import('@/components/firstPage/imgInput')
            }
          ]
        }
      ]
    },
    // 指定目录（一级）
    {
      path: '/HomePage',
      name: 'HomePage',
      component: () => import('@/components/HomePage'),
      // 二级目录（）
      children: [
        {
          path: '/',
          name: 'firstPage',
          component: () => import('@/components/firstPage'),
          children: [
            {
              path: '/',
              name: 'imgInput',
              component: () => import('@/components/firstPage/imgInput'),
            },
          ]   
        },
        {
          path: 'firstPage',
          name: 'firstPage',
          component: () => import('@/components/firstPage'),
          children: [
            {
              path: '/',
              name: 'imgInput',
              component: () => import('@/components/firstPage/imgInput'),
            },
            {
              path: 'styleInput',
              name: 'styleInput',
              component: () => import('@/components/firstPage/styleInput'),
            },
            {
              path: 'Quotes',
              name: 'Quotes',
              component: () => import('@/components/firstPage/Quotes'),
            },
            {
              path: 'imgClassiF',
              name: 'imgClassiF',
              component: () => import('@/components/firstPage/imgClassiF'),
            },
            {
              path: 'imgInput',
              name: 'imgInput',
              component: () => import('@/components/firstPage/imgInput'),
            },
          ]   
        },
        {
          path: 'imgGrid',
          name: 'imgGrid',
          component: () => import('@/components/firstPage/imgGrid'),
        },
      ]
    },
  ]
})
