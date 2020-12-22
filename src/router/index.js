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
        // 主页面的路由
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
        // 日常小功能路由
        {
          path: 'calculator',
          name: 'calculator',
          component: () => import('@/components/DailyFun/calculator'),
          children: [
            {
              path: '/',
              name: 'imgInput',
              component: () => import('@/components/firstPage/imgInput'),
            },
          ]   
        },
        {
          path: 'colorGrid',
          name: 'colorGrid',
          component: () => import('@/components/DailyFun/colorGrid'), 
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: () => import('@/components/DailyFun/schedule'), 
        },
        {
          path: 'memo',
          name: 'memo',
          component: () => import('@/components/DailyFun/memo'), 
        },
        // 这是绘制功能的路由
        {
          path: 'barChart',
          name: 'barChart',
          component: () => import('@/components/drawPage/barChart'),
        },
        {
          path: 'lineChart',
          name: 'lineChart',
          component: () => import('@/components/drawPage/lineChart'),
        },
        {
          path: 'pieChart',
          name: 'pieChart',
          component: () => import('@/components/drawPage/pieChart'),
        },
        //这是知识图谱原型系统的路由
        {
          path: 'protoSys',
          name: 'protoSys',
          component: () => import('@/components/KgPage/protoSys'),
        },
      ]
    },
  ]
})
