import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue';

Vue.use(VueRouter)

VueRouter.prototype.goBack = function(){
  this.go(-1);
}

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'classify',
        component: () => import ('../views/Classify.vue')  //异步引入按需加载
      },
      {
        path: 'shopping',
        component: () => import ('../views/Shopping.vue')
      }
    ]
  },
  {
    path: '/search',
    component: () => import ('../views/Search.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
