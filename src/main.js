import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './api/api';    //api
import myUtil from './util/util';    //工具方法

Vue.prototype.$api = api;
Vue.prototype.$util = myUtil;

//引入移动端适配的库
import 'lib-flexible';

//引入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
