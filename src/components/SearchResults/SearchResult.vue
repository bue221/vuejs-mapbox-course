<script setup lang="ts">
import { useMapStore } from "@/store/mapSlice";
import { usePlacesStore } from "@/store/placesSlice";
import type { Feature } from "@/types/places";
import { computed } from "vue";

const props = defineProps<{ item: Feature }>();

const item = computed(() => props.item);
const [lng, lat] = item.value.center;

const mapStore = useMapStore();
const placeStore = usePlacesStore();

const onClick = (e: any) => {
  e.stopPropagation();
  mapStore.getRouteBetween([lng, lat], placeStore.userLocation!);
};
</script>
<template>
  <li
    class="px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-500 cursor-pointer"
  >
    <h5>{{ item.place_name_es }}</h5>
    <p>{{ item.text_es }}</p>
    <button
      @click="onClick"
      type="button"
      class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      Direcciones
    </button>
  </li>
</template>

<style></style>
