import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Goods from "../views/Goods.vue"


Vue.use(VueRouter)

const routes = [
 
  // {
  //   // path: '/about',
  //   // name: 'About',
  //   // // route level code-splitting
  //   // // this generates a separate chunk (about.[hash].js) for this route
  //   // // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    
  // }
  {
    path:'/home',
    name:'home',
    component:Home,
  },
  {
    path:"/goods",
    name:'goods',
    component:Goods
  },
  {
    path: '*',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router
