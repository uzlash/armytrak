<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    src="../assets/camoflage.jpg"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>
    <div>
      <v-layout column align-center>
        <v-flex class="mt-6 mb-4">
          <h2 class="text-h6 white--text">ArmyTrak</h2>
          <!-- <v-img src="../assets/narr.png" alt="Narr Logo"></v-img> -->
        </v-flex>
      </v-layout>

      <v-divider class="mb-2 grey darken-2 mx-2" />

      <v-list expand nav>
        <v-list-item
          dense
          class="white--text mx-1"
          active-class="primary"
          v-for="(item, i) in nav"
          :key="`group-${i}`"
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <template v-slot:append>
      <div class="pa-2 d-flex justify-center">
        <v-btn outlined dark color="white" @click="logOut()">
          <span>Logout</span>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    barColor: "rgba(0, 0, 0, .6), rgba(0, 0, 0, .7)",
    barImage: "../assets/camouflage.png",
    drawer: null,
    nav: [
      {
        icon: "mdi-view-dashboard",
        title: "Dashboard",
        to: "/",
      },
      {
        icon: "mdi-map-marker",
        title: "Location",
        to: "/location",
      },
      {
        icon: "mdi-email",
        title: "Email Service",
        to: "/mail/inbox",
      },
      {
        icon: "mdi-calendar",
        title: "Calendar",
        to: "/calendar",
      },
      {
        icon: "mdi-account",
        title: "User Management",
        to: "/user",
      },
    ],
  }),

  computed: mapGetters({
    user: "getUser",
  }),

  methods: {
    logOut() {
      this.$store.dispatch("SIGN_OUT");
    },
  },
};
</script>

<style lang="sass">
</style>
