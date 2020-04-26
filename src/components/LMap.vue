<template>
  <div id="map" class="h-min-height relative z-1"></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "leaflet/dist/leaflet.css";
import L, { Marker, DivIcon } from "leaflet";
import AppAvatarMarker from "./AppAvatarMarker.vue";

export default {
  data: () => ({
    map: undefined,
    lat: 0,
    lng: 0,
    avatarMarker: undefined,
    accessToken:
      "pk.eyJ1IjoiYWhzYXRoIiwiYSI6ImNqeTI5OXQ2MzBtY3ozam14bWg3NDZmdmIifQ.DbVblAkBv6_QrIypX0vA8Q"
  }),
  components: {},
  watch: {
    getCoords: {
      handler() {
        // this.map.flyTo([this.getCoords.lat, this.getCoords.lng], 16);
        // new Marker([this.getCoords.lat, this.getCoords.lng], {
        //   icon: new DivIcon({
        //     html: this.avatarMarker,
        //     iconSize: [36, 36],
        //     iconAnchor: [18, 36],
        //     className: ""
        //   }),
        //   riseOnHover: true
        // })
        //   .addTo(this.map)
        //   .on("click", e => {
        //     // console.log(e);
        //   });
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      getUserCoords: "user/getCoordinates",
      getNetworkConnection: "getNetworkConnection"
    })
  },
  methods: {
    ...mapActions("user", ["setCountry", "setCountryCode"]),
    init() {
      this.map = L.map("map", {
        attributionControl: false,
        zoomControl: false
      }).setView([this.lat, this.lng], 6);

      // to do: add apiKey to .prod.env
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          // attribution:
          //   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/light-v10", // "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: this.accessToken
        }
      ).addTo(this.map);
    }
  },
  async created() {
    if (this.getNetworkConnection === "online") {
      try {
        // to do: add apiKey to .prod.env
        const res = await fetch(
          "https://api.ipgeolocation.io/ipgeo?apiKey=2f662d1df7294c74a4c92d38e1c13644&fields=geo"
        );
        if (res.ok && res.status === 200) {
          const data = await res.json();
          const { country_name, country_code2, latitude, longitude } = data;
          if (!!this.getUserCoords.lat === false) {
            this.lat = latitude;
            this.lng = longitude;
          } else {
            this.lat = this.getUserCoords.lat;
            this.lng = this.getUserCoords.lng;
          }
          this.init();
          this.setCountry(country_name);
          this.setCountryCode(country_code2);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    // const AvatarMarker = this.$vue.extend(AppAvatarMarker);
    // const avatarMarker = new AvatarMarker().$mount();
    // console.log(avatarMarker.$el);
    // this.avatarMarker = avatarMarker.$el;
  }
};
</script>