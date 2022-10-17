import { createApp } from "vue";
import { createPinia } from "pinia";
import mapboxgl from "mapbox-gl";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
