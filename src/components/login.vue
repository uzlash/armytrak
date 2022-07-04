<template>
  <v-main class="custom__bg">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card outlined width="450px" class="pa-6">
          <v-card class="pa-6 mt-n16 primary">
            <div class="d-flex align-center justify-space-between">
              <h2 class="text-start d-flex align-center">
                <span class="text-h3 font-weight-regular white--text"
                  >ARMY-TRAK
                </span>
              </h2>
              <v-avatar size="50">
                <v-img src="../assets/army.png"></v-img>
              </v-avatar>
            </div>
            <h6 class="white--text text-caption ml-1 mt-2 text-center">
              Nigerian Army GPS-RFID Personnel Tracking System
              <br />
              (Designed By: Cyber Warfare Command)
            </h6>
          </v-card>
          <v-card> </v-card>
          <v-card-text class="pb-0">
            <v-form @submit.prevent ref="form">
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details="auto"
                    v-model="email"
                    name="Email"
                    placeholder="Email"
                    prepend-inner-icon="mdi-email"
                    type="text"
                    color="primary"
                    :rules="[rules.required, rules.email]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details="auto"
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    placeholder="Password"
                    prepend-inner-icon="mdi-lock"
                    color="primary"
                    @click:append="showPassword = !showPassword"
                    :rules="[rules.required, rules.password]"
                  />
                </v-col>
              </v-row>
            </v-form>
            <div class="text-center mt-3">
              <v-btn
                @click="signIn()"
                :loading="signInMetaData.signInLoading"
                :disabled="signInMetaData.signInDisabled"
                block
                class="
                  text-capitalize
                  white--text
                  mt-10
                  custom__gradient-button
                "
                >Sign In</v-btn
              >
            </div>
            <div class="text-center mt-2 font-weight-bold">
              Server Status:
              <span
                :class="
                  serverStatus === 'online' ? 'success--text' : 'error--text'
                "
                >{{ serverStatus }}</span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-row>
      <v-snackbar
        bottom
        class="white--text"
        color="warning"
        timeout="5000"
        v-model="signInMetaData.signInErrorSnackbar"
      >
        {{ signInMetaData.signInErrorPayload }}
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    showPassword: "",
    loading: false,
    disabled: false,
    scannerStatus: "",
    rules: {
      required: (v) => !!v || "Field is required",
      counter: (v) => (v && v.length >= 3) || "Minimum length is 3 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      password: (value) =>
        (value && value.length >= 6) || "Minimum length is 6 characters",
    },
  }),
  methods: {
    signIn() {
      const signInData = {
        email: this.email,
        password: this.password,
      };
      if (this.$refs.form.validate()) {
        this.$store.dispatch("SIGN_IN", signInData);
      }
    },
  },
  computed: {
    signInMetaData() {
      return this.$store.state.signIn;
    },
    serverStatus() {
      return this.$store.getters.getServerStatus;
    },
  },
  created() {
    this.$store.dispatch("START_MQTT_PROCESS");
  },
};
</script>

<style lang="scss">
.custom__bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("../assets/camoflage.jpg");
  background-size: contain;
  background-repeat: repeat;
  background-attachment: fixed;
  min-height: 100vh;
}

.custom__gradient-bg {
  min-height: 100vh;
  background: #475c3b; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #475c3b,
    #475c3b
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #475c3b,
    #475c3b
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.custom__gradient-button {
  background: #475c3b; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #475c3b,
    #475c3b
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #475c3b,
    #475c3b
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>