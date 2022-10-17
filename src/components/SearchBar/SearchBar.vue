<script setup lang="ts">
import { useMapStore } from "@/store/mapSlice";
import { usePlacesStore } from "@/store/placesSlice";
import type { Feature } from "@/types/places";
import { ref, watch } from "vue";
import SearchResult from "../SearchResults/SearchResult.vue";

const placeStore = usePlacesStore();
const mapStore = useMapStore();

const debouncedValue = ref("");
const searchTerm = ref("");

const debounce = (callback: any, time: number) => {
  let debounceTimer: any;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, time);
};

watch(
  () => debouncedValue.value,
  () => {
    debounce(() => {
      searchTerm.value = debouncedValue.value;
      placeStore.setSearchByTerm(debouncedValue.value);
    }, 800);
  }
);
const selectedPlace = ref("");

const select = (place: Feature) => {
  selectedPlace.value = place.id;
  const [lng, lat] = place.center;
  mapStore.map?.flyTo({
    zoom: 15,
    center: [lng, lat],
  });
};

watch(
  () => placeStore.places,
  (newPlaces) => {
    selectedPlace.value == "";
    mapStore.generateMarker(newPlaces);
  }
);
</script>

<template>
  <div
    v-if="placeStore.isUserLocationReady"
    class="fixed top-6 left-0 my-auto mx-0"
  >
    <div class="flex flex-row justify-center">
      <div class="">
        <div
          class="input-group flex-row relative flex items-stretch w-full mb-4"
        >
          <input
            v-model="debouncedValue"
            type="search"
            class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
          <button
            class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button"
            id="button-addon2"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              class="w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
        <SearchResult
          :class="item.id == selectedPlace ? 'bg-blue-300' : ''"
          v-for="item in placeStore.places"
          :key="item.id"
          :item="item"
          @click="select(item)"
        />
      </ul>
    </div>
  </div>
</template>

<style></style>
