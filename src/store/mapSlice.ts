import { defineStore } from "pinia";

export const useMapStore = defineStore("map", {
  state: (): {
    map?: mapboxgl.Map;
    markers: mapboxgl.Marker[];
    distance?: number;
    duration?: number;
  } => ({
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
  }),
  getters: {},
  actions: {
    setMap(action: mapboxgl.Map) {
      this.map = action;
    },
    setMarker(action: mapboxgl.Marker) {
      this.markers = [...this.markers, action];
    },
  },
});
