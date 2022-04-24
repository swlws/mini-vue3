<template>
  <a :href="'#' + props.to">
    <slot />
  </a>
</template>

<script setup lang="ts">
// import { defineProps } from "vue";
let props = defineProps({
  to: { type: String, required: true },
});
</script>

<style scoped>
a {
  margin: 0 10px;
}
</style>
