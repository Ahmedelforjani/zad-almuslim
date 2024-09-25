<script setup lang="ts">
import { ConfigProvider } from "radix-vue";
</script>

<template>
  <ConfigProvider dir="rtl">
    <NuxtLoadingIndicator color="hsl(var(--primary))" />

    <NuxtLayout>
      <NuxtPage :page-key="(route) => route.fullPath" />
    </NuxtLayout>
  </ConfigProvider>
</template>
