<script setup lang="ts">
import { ref, watch } from "vue";
import { usePlacesStore } from "@/store/placesSlice";
import mapboxgl from "mapbox-gl";

const placeStore = usePlacesStore();
const mapElement = ref();

const initMap = async () => {
  if (mapElement.value && placeStore.userLocation) {
    await Promise.resolve();
    const map = new mapboxgl.Map({
      container: mapElement.value, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: placeStore.userLocation, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    const popUp = new mapboxgl.Popup().setLngLat(placeStore.userLocation)
      .setHTML(`
    <h4>Aqui estoy</h4>
    <p>${placeStore.userLocation}</p>
    `);
    new mapboxgl.Marker()
      .setLngLat(placeStore.userLocation!)
      .setPopup(popUp)
      .addTo(map);
  }
};

watch(
  () => placeStore.isUserLocationReady,
  (newVal) => newVal && initMap()
);
</script>

<template>
  <template v-if="!placeStore.isUserLocationReady">
    <div class="loading-map">
      <div class="flex h-full justify-center items-center text-center">
        <div class="" role="status">
          <h4 class="">Espere por favor</h4>
          <span class="">localizando ...</span>
        </div>
      </div>
    </div>
  </template>
  <div
    v-show="placeStore.isUserLocationReady"
    class="map-container"
    ref="mapElement"
  />
</template>

<style>
.map-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.loading-map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}
</style>
