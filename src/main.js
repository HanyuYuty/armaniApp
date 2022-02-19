import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/icons/iconfont/iconfont.css"
import "./assets/icons/heart/iconfont.css"
import "./assets/icons/heart/iconfont.js"
import VueAwesomeSwiper from 'vue-awesome-swiper'
// // import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
import Commoncategory from "./views/category/Commoncategory"


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
  SidebarItem,
  Col,
  Row,
  Cell,
  CellGroup,
  List,
  Loading,
  Sku,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Step,
  Steps,
  Checkbox,
  CheckboxGroup,
  Card,
  Divider,
  SubmitBar,
  RadioGroup, Radio,
  DropdownMenu, DropdownItem
} from 'vant';


Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(SubmitBar);
Vue.use(Divider);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Step);
Vue.use(Steps);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);
Vue.use(Loading);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Col);
Vue.use(Row);
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


//商品无图默认为该图
Vue.prototype.$src = "	https://www.giorgioarmanibeauty.cn/img/logo.62aebeab.png";

import request, {
  host
} from "./utils/request"

Vue.prototype.$host = host;
Vue.prototype.$request = request;





Vue.config.productionTip = false

Vue.component('commonCategory', Commoncategory)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')