import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/icons/iconfont/iconfont.css"
import "./assets/icons/heart/iconfont.css"
import "./assets/icons/heart/iconfont.js"

import {
  Tabbar,
  TabbarItem,
  Icon,
  Search,
  NoticeBar,
  Swipe,
  SwipeItem,
  NavBar,
  Lazyload,
  Tab,
  Tabs,
  Button,
  Rate,
  Image as VanImage,
  Sidebar,
  SidebarItem
} from 'vant';
// import { Image as VanImage } from 'vant';



import VueAwesomeSwiper from 'vue-awesome-swiper'


// // import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'





Vue.use(Rate);
Vue.use(Button);
Vue.use(VanImage);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(NoticeBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(VueAwesomeSwiper);
Vue.use(Sidebar);
Vue.use(SidebarItem);






import request, {
  host
} from "./utils/request"

Vue.prototype.$host = host;
Vue.prototype.$request = request;





Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')