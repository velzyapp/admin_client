import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
  debug:true,
  connection: socketio('http://localhost:3000'),
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
