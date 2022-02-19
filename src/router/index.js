import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import categoryRoutes from "../router/categoryRoutes";





Vue.use(VueRouter)

const routes = [

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

  // },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: "/goods",
    name: 'goods',
    component: () => import('../views/Goods.vue'),
    children: categoryRoutes
  },
  {
    path: '/details/:productCode',
    name: 'details',
    component: () => import("../views/Details.vue")
  }, {
    path: '/cart',
    name: 'catr',
    component: () => import('../views/Cart.vue'),
    children:[{
      path:'/',
      name:'incart',
      component:()=>import("../views/Cart/Incart.vue")
    },{
      path:'checkout',
      name:'checkout',
      component:()=>import("../views/Cart/Checkout.vue")
    }]
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