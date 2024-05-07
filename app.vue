<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
  rel="stylesheet">
</link>

<template>
  <div class="container" v-if="$device.isDesktopOrTablet">
    <div class="nav">
      <img src="/images/logo-white.png" class="logo" />
      <NavWeb :category="category" :selectCategory="selectCategory" :categoryOptions="categoryOptions" />
    </div>
    <div class="map-container">
      <div style="height: 85vh;">
        <Map :locations="locations" :loading="loading" :points="points" :zoom="zoom" :center="center"
          :updateCenter="updateCenter" :checkpoints="checkpoints" />
      </div>
      <div class="footer">
        <div>
          COPYRIGHT © 2024 DETRAC
        </div>
        <div>
          DIENG CALDERA RACE
        </div>
        <div>
          LAST UPDATE: {{ lastUpdate.toLocaleString() }}
        </div>
      </div>
    </div>
    <div class="top-participants-wrap">
      <div class="holder" @click="open = !open">
        <div>
          DETAILS
        </div>
      </div>
      <transition name="slide">
        <TopParticipant @close-sidebar="open = false" v-if="open" :locations="locations" @see-location="changeCenterMap"
          :title="category.split('_')[0] + ' KM'" :width="'30vw'" />
      </transition>
    </div>
  </div>
  <div v-else>

    <div class="nav">
      <img src="/images/logo-white.png" class="logo" />
    </div>

    <div class="map-container">
      <div style="height: 85vh;">
        <Map :locations="locations" :loading="loading" :points="points" :zoom="zoom" :center="center"
          :updateCenter="updateCenter" :checkpoints="checkpoints" />
      </div>
      <div class="footer">
        <div>
          COPYRIGHT © 2024 DETRAC
        </div>
        <div>
          DIENG CALDERA RACE
        </div>
        <div>
          LAST UPDATE: {{ lastUpdate.toLocaleString() }}
        </div>
      </div>
    </div>

    <div class="top-participants-wrap">
      <div class="holder" @click="open = !open">
        <div>
          DETAILS
        </div>
      </div>
      <transition name="slide">
        <TopParticipant @close-sidebar="open = false" v-if="open" :locations="locations" @see-location="changeCenterMap"
          :title="category.split('_')[0] + ' KM'" :width="'70vw'" :category="category" :selectCategory="selectCategory" :categoryOptions="categoryOptions" />
      </transition>
    </div>
  </div>
</template>


<script setup>
import Map from "./components/Map.vue";
import TopParticipant from "./components/TopParticipant.vue"

import { ref } from "vue";
import GPXParser from "gpxparser";

let loading = ref(false);
let zoom = ref(15);
let points = ref([]);
let checkpoints = ref([]);
let category = ref("10_km");
let open = ref(false)
let lastUpdate = ref(new Date())
let center = ref([-7.267318, 109.959513])

const categoryOptions = ref([
  { "name": "10 KM", "value": "10_km" },
  { "name": "21 KM", "value": "21_km" },
  { "name": "42 KM", "value": "42_km" },
  { "name": "75 KM", "value": "75_km" },
])

const { data: locations, error, refresh } = await useFetch("/locations", {
  query: {
    category: category
  },
  watch: [category]
})

onMounted(() => {
  loadGpx();
  const interval = setInterval(() => {
    lastUpdate = new Date()
    refresh();
  }, 60000);
  return () => clearInterval(interval);
});

const selectCategory = (cat) => {
  category.value = cat.value
  points.value = []
  checkpoints.value = []
  loadGpx()
}

const updateCenter = (centerUpdate) => {
  center = centerUpdate
}

const changeCenterMap = (item) => {
  center = ([item.latitude, item.longitude])
}

const loadGpx = async () => {
  loading.value = true;

  let categoryValue = "";

  switch (category.value) {
    case "10_km":
      categoryValue = "10 KM_TAMBI.gpx"
      break;

    case "21_km":
      categoryValue = "21KM_TAMBI.gpx"
      break;

    case "42_km":
      categoryValue = "42KM_TAMBI.gpx"
      break;

    case "75_km":
      categoryValue = "75KM_TAMBI.gpx"
      break;

    default:
      categoryValue = "10 KM_TAMBI.gpx"
      break;
  }

  const res = await $fetch(`/tracks/${categoryValue}`, {
    method: "GET",
    baseURL: "https://assajjadazis.github.io",
  });

  const gpxText = await res.text();
  const gpxParser = new GPXParser();
  gpxParser.parse(gpxText);
  gpxParser.tracks[0].points.forEach((point) => {
    const latitude = point.lat;
    const longitude = point.lon;
    points.value.push([latitude, longitude]);
  });

  let match;
  const regexCheckPoints =
    /<wpt lat="([^"]+)" lon="([^"]+)">\s*<ele>([^<]+)<\/ele>\s*<name>([^<]+)<\/name>/g;

  while ((match = regexCheckPoints.exec(gpxText)) !== null) {
    checkpoints.value.push({
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
      name: match[4],
    });
  }
  loading.value = false;
};

useSeoMeta({
  title: 'Live | Dieng Caldera Race',
  ogTitle: 'Live | Dieng Caldera Race',
  description: 'Live tracking Dieng Caldera Race.',
  ogDescription: 'Live tracking Dieng Caldera Race.',
  ogImage: '/images/logo-detrac-pat.png',
  twitterCard: 'summary_large_image',
})
</script>

<style>
.container {
  width: 100%;
}

.map-container {
  width: 100vw;
  position: fixed;
  z-index: -1;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.05s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.footer {
  height: 5vh;
  font-size: 10px;
  font-family: 'Roboto', sans-serif;
  background-color: #dfe325;
  text-align: center;
  color: #10385b;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  text-align: center;
  align-items: center;
}

.holder {
  width: 50px;
  height: 100px;
  background-color: black;
  opacity: 0.8;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 10px 0 0 10px;
}

.holder div {
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  color: white;
  font-family: 'Roboto', sans-serif;
}

.top-participants-wrap {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: 100vh;
}

.nav {
  height: 10vh;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: white;
  background-color: #10385b;
  justify-content: space-between;
}

.spinner {
  display: flex;
  align-items: center;
}

.nav .logo {
  height: 5vh;
  margin-right: 30px;
}

body {
  margin: 0;
}
</style>
