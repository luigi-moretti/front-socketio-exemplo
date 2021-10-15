import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { io } from "socket.io-client";
import VueSocketIO from 'vue-socket.io';

// export const SocketInstance = io("http://localhost:3000");

//Vue.use(VueSocketIO, SocketInstance)

Vue.use(new VueSocketIO({
  debug:true,
  connection: io("http://192.168.10.6:3000")
}))


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
