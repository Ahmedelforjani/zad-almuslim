<script setup lang="ts"></script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))" />

  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.fullPath" :transition="true" />
  </NuxtLayout>
</template>
