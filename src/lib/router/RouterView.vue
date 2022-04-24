<template>
  <component :is="comp"></component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from ".";

let router = useRouter();

const comp = computed(() => {
  const route = router.routes.find(
    (route) => route.path === router.current.value
  );

  return route ? route.component : null;
});
</script>
