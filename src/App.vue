<template>
  <v-app>
    <app-bar v-if="$route.meta.showHeader == true" />
    <drawer v-if="$route.meta.showHeader == true" />
    <v-main class="grey lighten-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import appBar from '@/components/appBar.vue';
import drawer from '@/components/drawer.vue';
export default {
  name: "App",
  components: {
    appBar,
    drawer
  },
  data: () => ({})
};
</script>
