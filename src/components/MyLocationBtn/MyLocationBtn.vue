<script setup lang="ts">
import { useMapStore } from "@/store/mapSlice";
import { usePlacesStore } from "@/store/placesSlice";

const placeStore = usePlacesStore();
const mapStore = useMapStore();

const onClick = () => {
  mapStore.map?.flyTo({
    center: placeStore.userLocation,
    zoom: 15,
  });
};
</script>

<template>
  <button
    v-if="placeStore.isUserLocationReady"
    @click="onClick"
    type="button"
    class="custom inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
  >
    Ir a mi ubicación
  </button>
</template>

<style>
.custom {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>
