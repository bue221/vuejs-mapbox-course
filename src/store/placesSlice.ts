import { defineStore } from "pinia";

export const usePlacesStore = defineStore("places", {
  state: (): {
    isLoading: boolean;
    userLocation?: [number, number]; // lng lat
  } => ({
    isLoading: false,
    userLocation: undefined,
  }),
  getters: {
    isUserLocationReady: (state) => {
      return !!state.userLocation;
    },
  },
  actions: {
    async getInitialLocation() {
      this.isLoading = true;
      await navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          if (coords) this.userLocation = [coords?.longitude, coords?.latitude];
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          throw new Error("Fallo geolocalizacion");
        }
      );
    },
    async setSearchByTerm(query: string) {
      console.log(query);
    },
  },
});
