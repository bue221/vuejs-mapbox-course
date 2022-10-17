<script setup lang="ts">
import { usePlacesStore } from "@/store/placesSlice";
import { onMounted } from "vue";
import MapView from "../components/MapView/MapView.vue";

const placeStore = usePlacesStore();

onMounted(() => {
  placeStore.getInitialLocation();
});
</script>

<template>
  <MapView />
</template>

<style></style>
