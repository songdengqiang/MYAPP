// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import globelV from './assets/varible/globleV'
import echarts from 'echarts'
import * as d3 from 'd3'

// 配置d3的attr属性和style属性，使其可以使用对象形式的数据
let oldAttr = d3.selection.prototype.attr;
d3.selection.prototype.attr = function () {
  if (arguments.length == 1) {
    if (typeof arguments[0] == "object") {
      for (let item in arguments[0]) {
        oldAttr.call(this, item, arguments[0][item]);
      }
      return this;
    } else {
      return oldAttr.call(this, arguments[0]);
    }
  } else if (arguments.length == 2) {
    return oldAttr.call(this, arguments[0], arguments[1]);
  }
};
let oldStyle = d3.selection.prototype.style;
d3.selection.prototype.style = function () {
  if (arguments.length == 1) {
    if (typeof arguments[0] == "object") {
      for (let item in arguments[0]) {
        oldStyle.call(this, item, arguments[0][item]);
      }
      return this;
    } else {
      return oldStyle.call(this, arguments[0]);
    }
  } else if (arguments.length == 2) {
    return oldStyle.call(this, arguments[0], arguments[1]);
  }
};
Vue.prototype.$d3 = d3

Vue.prototype.$echarts = echarts
Vue.prototype.globelV = globelV
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
