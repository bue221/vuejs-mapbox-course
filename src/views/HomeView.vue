<script setup lang="ts">
import { usePlacesStore } from "@/store/placesSlice";
import { onMounted } from "vue";
import MapView from "../components/MapView/MapView.vue";
import MyLocationBtn from "../components/MyLocationBtn/MyLocationBtn.vue";
import SearchBar from "../components/SearchBar/SearchBar.vue";

const placeStore = usePlacesStore();

onMounted(() => {
  placeStore.getInitialLocation();
});
</script>

<template>
  <MapView />
  <SearchBar />
  <MyLocationBtn />
</template>

<style></style>
