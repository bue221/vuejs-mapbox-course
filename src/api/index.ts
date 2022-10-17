import axios from "axios";

export const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token: import.meta.env.VITE_API_KEY,
  },
});

export const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: true,
    language: "es",
    geometries: "geojson",
    overview: "simplified",
    steps: true,
    access_token: import.meta.env.VITE_API_KEY,
  },
});
