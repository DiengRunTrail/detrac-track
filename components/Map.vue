<template>
  <div v-if="loading" class="spinner">
    <VueSpinnerFacebook color="#10385b" size="60" />
  </div>

  <LMap v-else :zoom="zoom" :center="center" @update:center="(centerU) => console.log(centerU)"
    @update:bounds="(bounds) => console.log(bounds)">
    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' layer-type="base"
      name="OpenStreetMap" />
    <LMarker v-for="loc in locations" :lat-lng="[loc.latitude, loc.longitude]" :radius="10">
      <LIcon :icon-size="[30, 30]" icon-url="/images/user.png" />
      <LPopup style="font-weight: bold; font-size: 16px">
        {{ loc.fullname }}
      </LPopup>
    </LMarker>
    <LMarker v-for="loc in checkpoints" :lat-lng="[loc.latitude, loc.longitude]" :radius="10">
      <LPopup style="font-weight: bold; font-size: 16px">
        {{ loc.name }}
      </LPopup>
    </LMarker>
    <LPolyline :lat-lngs="points" color="#10385b" :weight="4" />
  </LMap>
</template>

<script setup>
import { VueSpinnerFacebook } from "vue3-spinners"

defineProps(["locations", "checkpoints", "loading", "points", "zoom", "center", "updateCenter"])
</script>

<style scoped>
.spinner {
  height: 90vh;
  align-items: center;
  justify-content: center;
  align-self: center;
}
</style>
