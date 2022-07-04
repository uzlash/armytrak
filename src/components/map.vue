<template>
  <div class="custom__map pa-2 white">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-control-layers position="topright"></l-control-layers>
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"
      />
      <l-marker :lat-lng="[location.lat, location.lng]" v-if="Object.keys(location).length !== 0">
        <l-icon
          :icon-size="[32, 37]"
          :icon-anchor="[16, 37]"
          :icon-url="customIconVacnt"
        />
        <l-popup
          :content="`
            <div class='font-weight-bold'> Service No: ${location.serviceNo.toString()} </div>
            <div> First Name: ${location.firstName.toString()} </div>
            <div> Rank: ${location.rank.toString()} </div>
            <div> Email: ${location.email.toString()} </div>
            `"
        ></l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
//Code to fix markers not working -- don't remove
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

import { latLng } from "leaflet";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPolygon,
  LIcon,
  LPopup,
  LControlLayers,
} from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPolygon,
    LIcon,
    LPopup,
    LControlLayers,
    "l-marker-cluster": Vue2LeafletMarkerCluster,
  },
  data() {
    return {
      location: {},
      tileProviders: [
        {
          name: "OpenStreetMap",
          visible: true,
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        },
        {
          name: "OpenTopoMap",
          visible: false,
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
      ],
      zoom: 7,
      customIconOccupied: require("../assets/activePersonnel.png"),
      customIconVacnt: require("../assets/inactivePersonnel.png"),
      center: latLng(9.0778, 8.6775),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withTooltip: latLng(10.609319, 7.429504),
      currentZoom: 11.5,
      currentCenter: latLng(9.0778, 8.6775),
      showParagraph: false,
      clusterOptions: {},
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  sockets: {
    "EVENTS:GPS:LOCATION"(data) {
      console.log("Event Gps Location", data);
      this.location = data;
    },
    "EVENT:BIOMETRIC:ERROR"(data) {
      console.log("Event biometric error", data);
      this.errorMessage = data;
    },
    "EVENT:BIOMETRIC:AUTH"(data) {
      console.log("DATA RFID", data);
      // fetch("https://isatmis.lexchain.ng/api/v1/user/byrfid/" + data.rfid, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((r) => r.json())
      //   .then((response) => {
      //     console.log("Response", response);
      //     const { user } = response.payload;
      //     this.user = user;
      //     this.checkoutStep = 2;
      //   })
      //   .catch((error) => {
      //     console.log("Error>>>", error);
      //   });
    },
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    click: (e) => console.log("clusterclick", e),
    ready: (e) => console.log("ready", e),
  },
  mounted() {
    setTimeout(() => {
      console.log("done");
      this.$nextTick(() => {
        this.clusterOptions = { disableClusteringAtZoom: 11 };
      });
    }, 5000);
  },
};
</script>

<style>
.custom__map {
  height: calc(100vh - 48px);
  width: 100%;
}
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
