<template>
  <div ref="mapbox" class="h-screen"></div>
</template>

<script>
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

export default {
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWhzYXRoIiwiYSI6ImNqeTI5OXQ2MzBtY3ozam14bWg3NDZmdmIifQ.DbVblAkBv6_QrIypX0vA8Q";
    const map = new mapboxgl.Map({
      container: this.$refs.mapbox,
      style: "mapbox://styles/mapbox/streets-v9"
    });
  }
};
</script>