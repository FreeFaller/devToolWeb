/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-17 10:21:00
 * @LastEditTime: 2019-10-17 10:21:00
 * @LastEditors: your name
 */
import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import router from "./router";
import store from './store'
import "@/styles/index.less"; // global css
import 'highlight.js/styles/googlecode.css' //highlight样式文件

import iView from 'view-design'
import 'view-design/dist/styles/iview.css';
Vue.use(iView)

Vue.use(Vuex)
Vue.config.productionTip = false;

function initVue() {
  new Vue({
    router,
    store,
    render: h => h(App),
    data: {
      eventHub: new Vue()
    }
  }).$mount("#app");
}

initVue()

if (module.hot) {
  module.hot.accept('./App.vue', function () {
    initVue()
  })
}
