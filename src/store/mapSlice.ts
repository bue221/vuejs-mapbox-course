import { directionsApi } from "@/api";
import type { IDirections } from "@/types/directions";
import type { Feature } from "@/types/places";
import mapboxgl from "mapbox-gl";
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
    generateMarker(places: Feature[]) {
      this.markers.forEach((marker) => marker.remove());
      this.markers = [];

      for (const place of places) {
        const [lng, lat] = place.center;
        const popUp = new mapboxgl.Popup().setLngLat([lng, lat]).setHTML(`
    <h4>${place.place_name_es}</h4>
    <p>${place.text_es}</p>
    `);
        const marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(popUp)
          .addTo(this.map!);
        this.markers.push(marker);
      }
    },
    async getRouteBetween(start: [number, number], end: [number, number]) {
      const res = await directionsApi<IDirections>(
        `/${start.join(",")};${end.join(",")}`
      );
      this.setRoute(res.data.routes[0].geometry.coordinates);
    },
    setRoute(coord: number[][]) {
      const start = coord[0];
      // const end = coord[coord.length - 1];

      const bounds = new mapboxgl.LngLatBounds(
        [start[0], start[1]],
        [start[0], start[1]]
      );

      for (const point of coord) {
        const newCoord: [number, number] = [point[0], point[1]];
        bounds.extend(newCoord);
      }

      this.map?.fitBounds(bounds, { padding: 300 });

      const sourceData: mapboxgl.AnySourceData = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: coord,
              },
            },
          ],
        },
      };

      if (this.map?.getLayer("RouteString")) {
        this.map?.removeLayer("RouteString");
        this.map?.removeSource("RouteString");
      }
      this.map?.addSource("RouteString", sourceData);

      this.map?.addLayer({
        id: "RouteString",
        type: "line",
        source: "RouteString",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "red",
          "line-width": 3,
        },
      });
    },
  },
});
