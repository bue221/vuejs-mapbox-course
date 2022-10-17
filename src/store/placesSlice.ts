import { searchApi } from "@/api";
import type { IPlaceResponse, Feature } from "@/types/places";
import { defineStore } from "pinia";
import { useMapStore } from "./mapSlice";

export const usePlacesStore = defineStore("places", {
  state: (): {
    isLoading: boolean;
    isLoadingPlaces: boolean;
    userLocation?: [number, number]; // lng lat
    places: Feature[];
  } => ({
    isLoadingPlaces: false,
    isLoading: false,
    userLocation: undefined,
    places: [],
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
    async setSearchByTerm(query: string): Promise<Feature[]> {
      const mapStore = useMapStore();
      if (query.length == 0) {
        this.places = [];
        if (mapStore.map?.getLayer("RouteString")) {
          mapStore.map?.removeLayer("RouteString");
          mapStore.map?.removeSource("RouteString");
        }
        return [];
      }

      if (!this.userLocation) throw new Error("No hay direccion");

      this.isLoadingPlaces = true;
      const res = await searchApi<IPlaceResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(","),
        },
      });

      this.places = res.data.features;
      this.isLoadingPlaces = false;
      if (mapStore.map?.getLayer("RouteString")) {
        mapStore.map?.removeLayer("RouteString");
        mapStore.map?.removeSource("RouteString");
      }
      return res.data.features;
    },
  },
});
