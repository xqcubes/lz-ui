import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// import Element from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(Element, { size: "mini", zIndex: 3000 });

new Vue({
  render: h => h(App),
}).$mount('#app')
