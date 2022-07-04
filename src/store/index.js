import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    signIn: {
      signInLoading: false,
      signInDisabled: false,
      signInErrorSnackbar: false,
      signInErrorPayload: null,
      signInSuccessSnackbar: false,
      signInSuccessPayload: null,
    },
    mqtt: {
      server: "",
      rfidStatus: "",
      rfidTag: "",
      gpsStatus: "",
      gpsLocation: "",
    },
  },
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getServerStatus: (state) => state.mqtt.server,
    getRfidStatus: (state) => state.mqtt.rfidStatus,
    getRfidTag: (state) => state.mqtt.rfidTag,
    getGpsStatus: (state) => state.mqtt.gpsStatus,
    getGpsLocation: (state) => state.mqtt.gpsLocation,
  },
  mutations: {
    loginUser(state, userData) {
      state.token = userData.token;
      state.user = userData.userObj;
    },
    signOut(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    startLoader(state) {
      state.signIn.signInLoading = true;
      state.signIn.signInDisabled = true;
    },
    stopLoader(state) {
      state.signIn.signInLoading = false;
      state.signIn.signInDisabled = false;
    },
    signInError(state, error) {
      state.signIn.signInErrorSnackbar = true;
      state.signIn.signInErrorPayload = error;
    },
    webServerStatus(state, payload) {
      console.log("WEB SERVER STATUS>>>", payload);
      state.mqtt.server = payload;
    },
    rfidStatus(state, payload) {
      console.log("RFID STATUS>>>", payload);
      state.mqtt.rfidStatus = payload;
    },
    rfidTag(state, payload) {
      console.log("RFID TAG>>>", payload);
      state.mqtt.rfidTag = payload;
    },
    gpsStatus(state, payload) {
      console.log("GPS STATUS>>>", payload);
      state.mqtt.gpsStatus = payload;
    },
    gpsLocation(state, payload) {
      console.log("GPS Location>>>", payload);
      state.mqtt.gpsLocation = payload;
    },
  },
  actions: {
    SIGN_IN({ commit }, authData) {
      commit("startLoader");
      fetch("https://armytrak.lexington.com.ng/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
        }),
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Sign in Response", response);
          //status failed or false
          if (response.status === "failed") {
            commit("stopLoader");
            commit("signInError", response.payload.error);
          } else {
            console.log("user>>>", response.user);
            console.log("Token", response.token);
            const token = response.token;
            const user = response.user;
            commit("loginUser", { token, user });
            router.push("/");
            commit("stopLoader");
          }
        })
        .catch((error) => {
          console.log("Error>>>", error);
          commit("signInError", error);
          commit("stopLoader");
        });
    },
    SIGN_OUT({ commit }) {
      router.push("/login");
      commit("signOut");
    },
    START_MQTT_PROCESS({ commit }) {

      // Create a client instance
      const location = {
        hostname: "armytrak.lexington.com.ng",
        port: 9001,
      };

      const client = new Paho.MQTT.Client(
        location.hostname,
        Number(location.port),
        "clientId"
      );

      // set callback handlers
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      // connect the client
      client.connect({
        onSuccess: () => {
          console.log("MQTT Connected!");
          subscribeToMqtt();
        },
      });

      // Subscribe to mqtt
      function subscribeToMqtt() {
        client.subscribe("webserver/status");
        client.subscribe("rfid/status");
        client.subscribe("rfid/tag");
        client.subscribe("gps/status");
        client.subscribe("gps/location");
      }

      // called when the client loses its connection
      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("Connection Lost: ", responseObject.errorMessage);
          // Reconnect to the client
          let reconnect = setInterval(() => {
            client.connect({
              onSuccess: () => {
                console.log("MQTT Connected!");
                subscribeToMqtt();
                clearInterval(reconnect);
              },
            });
          }, 2000);
        }
      }

      // called when message has been received
      function onMessageArrived(message) {
        const obj = {
          topic: message.destinationName,
          payload: message.payloadString,
        };
        console.log("OBJ", obj);
        if (obj.topic === "webserver/status") {
          commit("webServerStatus", obj.payload);
        } else if (obj.topic === "rfid/status") {
          commit("rfidStatus", obj.payload);
        } else if (obj.topic === "rfid/tag") {
          commit("rfidTag", obj.payload);
        } else if (obj.topic === "gps/status") {
          commit("gpsStatus", obj.payload);
        } else if (obj.topic === "gps/location") {
          commit("gpsLocation", obj.payload);
        } else {
          console.log("Unknown Topic");
        }
      }
    },
  },
});
