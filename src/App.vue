<script setup lang="ts">
import { ref } from "vue";

let timing = window.performance && window.performance.timing;
let navigation = window.performance && window.performance.navigation;

// DNS 解析：
let dns = timing.domainLookupEnd - timing.domainLookupStart;

// 总体网络交互耗时：
let network = timing.responseEnd - timing.navigationStart;

// 渲染处理：
let processing = (timing.domComplete || timing.domLoading) - timing.domLoading;

// 可交互：
let active = timing.domInteractive - timing.navigationStart;

console.log(dns, network, processing, active);
</script>

<template>
  <header>
    <RouterLink :to="'/page01'">page01 </RouterLink>
    <RouterLink :to="'/page02'">page02 </RouterLink>
    <RouterLink :to="'/page03'">page03 </RouterLink>
  </header>

  <section>
    <RouterView />
  </section>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
