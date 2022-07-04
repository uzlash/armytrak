import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
//import io from 'socket.io-client'
//import VueSocketIOExt from 'vue-socket.io-extended'
//import VueMqtt from "vue-mqtt";
import "leaflet/dist/leaflet.css";

//const socket = io()

//Vue.use(VueSocketIOExt, socket, { store })

// Vue.use(VueMqtt, "ws://iot.eclipse.org/ws", {
//   clientId: "WebClient-" + parseInt(Math.random() * 100000),
//   wsOptions: {
//     host: 'armytrak.lexington.com.ng'
//   }
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
