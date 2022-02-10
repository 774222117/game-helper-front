import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import store from '@/store'
// import AllGame from '../views/allGame'
// import GameDetails from '../views/gameDetails'
// import MyGame from '../views/myGame'
// import OrderList from '../views/orderList'
// import Order from '../views/order'
// import Register from '../views/register'

Vue.use(VueRouter)
// component: () => import('@/components/wxCallback'),name: 'wxcallback', meta: meta},
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    // 首页
    component: Index
  }, {
    path: '/allGame',
    meta: { noCache: false },
    // 全部游戏
    // component: AllGame  使用懒加载方式
    component: () => import('../views/allGame')
  }, {
    path: '/gameDetails',
    name: 'gameDetails',
    // 详情
    // component: GameDetails
    component: () => import('../views/gameDetails'),
    meta: { keepAlive: false }
  }, {
    path: '/myGame',
    // 我的游戏
    // component: MyGame
    component: () => import('../views/myGame')
  }, {
    path: '/orderList',
    // 订单列表
    // component: OrderList
    component: () => import('../views/orderList')
  }, {
    path: '/order',
    // 订单
    // component: Order
    component: () => import('../views/order')
  }, {
    path: '/register',
    // 注册
    // component: Register
    component: () => import('../views/register')
  }, {
    path: '/err404',
    // 404
    // component: Register
    component: () => import('../views/404')
  }, {
    path: '/err500',
    // 500
    // component: Register
    component: () => import('../views/500')
  }, {
    path: '/activity',
    // 活动预告
    // component: Register
    component: () => import('../views/activity/index.vue')
  }, {
    path: '/activityMain',
    // 活动正文
    // component: Register
    component: () => import('../views/activity/activityMain.vue')
  }, {
    path: '/elevenActivity',
    // 十一活动 可配置模板
    // component: Register
    component: () => import('../views/elevenActivity/index.vue')
  },{
    path: '/newYear',
    // 新春活动
    // component: Register
    component: () => import('../views/newYear/index.vue')
  },{
    path: '/luckNewYear',
    // 新 新春活动幸运抽奖
    // component: Register
    component: () => import('../views/luckNewYear/index.vue')
  },{
    path:'/NationalDay',
    // 2021年 国庆抽奖活动
    component: () => import('../views/NationalDay/index.vue')
  },{
    path:'/discountNewYear',
    // 2022年 新春折扣活动
    component: () => import('../views/discountNewYear/index.vue')
  }



  ]
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})
router.beforeEach(function (to, from, next) {
  store.commit('clearToken') // 取消请求
  if (window._hmt) {
    if (to.path) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  next()
})
export default router