import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;

//样式和字体
import "./assets/css/global.css";
import "./assets/fonts/iconfont.css";

// //axios导入
// import axios from "axios";
// Vue.prototype.$axios = axios;

// //地址配置
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
