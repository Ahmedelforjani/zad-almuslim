<script setup lang="ts">
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    if (import.meta.client) {
      const scrollArea = document.getElementById("scroll-area-view-port");
      if (scrollArea) {
        scrollArea.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))" />

  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.path" :transition="true" />
  </NuxtLayout>
</template>
