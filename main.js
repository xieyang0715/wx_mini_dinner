import Vue from 'vue'
import App from './App'

/* 引入uView主JS库 */
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

//引入公共方法JS
import commonJS from '@/common/common.js'
Vue.mixin(commonJS);

// 引入请求封装，将app参数传递到配置中
require('@/common/apiInteractive/request.js')(app)
app.$mount()
