import axios from "axios";

export const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1IjoiYnVlMjIxIiwiYSI6ImNsOWNnMmdiNDRiN3Azb253c2JsY2VibjkifQ.HdWJli2gH0TL05ZdCJZ3oQ",
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
    access_token:
      "pk.eyJ1IjoiYnVlMjIxIiwiYSI6ImNsOWNnMmdiNDRiN3Azb253c2JsY2VibjkifQ.HdWJli2gH0TL05ZdCJZ3oQ",
  },
});
