<template>
  <v-container fluid>
    <div class="">
      <iframe
        allow="camera;microphone;fullscreen"
        width="100%"
        class="custom__iframe--container"
        src="https://voip.lexington.com.ng"
        frameborder="0"
      ></iframe>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({}),
  methods: {},
  computed: {},
  created() {},
};
</script>

<style lang="scss">
.custom__iframe--container {
  height: calc(100vh - 108px);
}
</style>