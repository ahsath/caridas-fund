<template>
  <div id="map" class="h-min-height relative z-1"></div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import "leaflet/dist/leaflet.css";
import L, { Marker, DivIcon } from "leaflet";
import AppAvatarMarker from "./AppAvatarMarker.vue";

export default {
  data: () => ({
    l: {
      map: undefined,
      lat: 0,
      lng: 0
    },
    marker: null,
    person: null,
    accessToken:
      "pk.eyJ1IjoiYWhzYXRoIiwiYSI6ImNqeTI5OXQ2MzBtY3ozam14bWg3NDZmdmIifQ.DbVblAkBv6_QrIypX0vA8Q"
  }),
  watch: {
    // getCoords: {
    //   handler() {
    //     this.l.map.flyTo([this.getCoords.lat, this.getCoords.lng], 16);
    //   },
    //   deep: true
    // },
  },
  computed: {
    ...mapGetters({
      getUserCoords: "user/getCoordinates",
      getNetworkConnection: "getNetworkConnection"
    })
  },
  methods: {
    ...mapActions(["getRequests"]),
    ...mapMutations("user", ["updateCountry", "updateCountryCode"]),
    init() {
      this.l.map = L.map("map", {
        attributionControl: false,
        zoomControl: false,
        minZoom: 3,
        maxBounds: [
          [84.88148837022706, 191.07421875],
          [-84.92832092949963, -169.27734375000003]
        ]
      }).setView([this.l.lat, this.l.lng], 6);

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
      ).addTo(this.l.map);

      this.addMapMarkers();
    },
    async addMapMarkers() {
      const query = await this.getRequests();
      const AvatarMaker = this.$vue.extend(AppAvatarMarker);
      let person, avatarMarker;
      if (!query.empty) {
        query.docs.forEach(doc => {
          person = doc.data();
          avatarMarker = new AvatarMaker({
            propsData: { person }
          }).$mount();
          this.createHTMLMarker(
            avatarMarker.$el,
            doc.data().coordinates.latitude,
            doc.data().coordinates.longitude
          );
        });
      }
    },
    createHTMLMarker(el, lat, lng) {
      let person, marker;
      marker = new Marker([lat, lng], {
        icon: new DivIcon({
          html: el,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          className: ""
        }),
        riseOnHover: true
      })
        .addTo(this.l.map)
        .on("click", () => {
          person = marker.getIcon().options.html.dataset;
          this.$emit("click:marker", person);
        });
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
            this.l.lat = latitude;
            this.l.lng = longitude;
          } else {
            this.l.lat = this.getUserCoords.lat;
            this.l.lng = this.getUserCoords.lng;
          }
          this.init();
          this.updateCountry(country_name);
          this.updateCountryCode(country_code2);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>