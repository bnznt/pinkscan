import './installCompostitionApi';
import Vue from 'vue';
import global from "./globals";

import App from './App.vue';
import router from './router';

import './plugins/vue-tailwind';
import './index.css';

Vue.config.productionTip = false

new Vue({
  router,
  provide: {
    global
  },
  render: h => h(App)
}).$mount('#app')
