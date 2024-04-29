<!-- D3Chart.vue -->
<template>
  <div ref="chart" class="d3-chart"></div>
</template>

<script setup>
import * as d3 from "d3";

const data = [30, 86, 168, 281, 303, 365];

// Select SVG element
const svg = d3
  .select(this.$refs.chart)
  .append("svg")
  .attr("width", 400)
  .attr("height", 200);

// Create bars
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 70)
  .attr("y", (d) => 200 - d)
  .attr("width", 65)
  .attr("height", (d) => d)
  .attr("fill", "teal");
</script>

<style scoped>
.d3-chart {
  margin-top: 20px;
}
</style>
