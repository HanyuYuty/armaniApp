import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/icons/iconfont/iconfont.css"
import"./assets/icons/heart/iconfont.css"
import "./assets/icons/heart/iconfont.js"
import { Tabbar, TabbarItem,Icon,Search,NoticeBar,Swipe, SwipeItem,NavBar  } from 'vant';


Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(NoticeBar);
Vue.use(Swipe);
Vue.use(SwipeItem);




// 引入单个组件样式
import 'vant/lib/tabbar/style/less';

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
