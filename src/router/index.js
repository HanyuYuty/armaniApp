import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import categoryRoutes from "../router/categoryRoutes";





Vue.use(VueRouter)

const routes = [
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
      path:'checkout/:price',
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