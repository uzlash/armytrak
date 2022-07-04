<template>
  <mapView />
</template>

<script>
import mapView from "@/components/map.vue";
export default {
  components: {
    mapView,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.custom__map {
  height: calc(100vh - 75px);
  width: 100%;
}
.custom__card-modified {
  background-color: rgba(255, 255, 255, 0) !important;
}
.custom__heading-border {
  border: 1px solid black;
}
.custom__table-row:hover {
  cursor: pointer;
}
</style>
