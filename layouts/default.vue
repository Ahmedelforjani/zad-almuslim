<script lang="ts" setup>
useHead({
  script: [
    {
      src: "https://w.soundcloud.com/player/api.js",
      async: true,
    },
  ],
});
</script>

<template>
  <Body dir="rtl">
    <div class="flex flex-col h-screen">
      <Topbar class="flex-shrink-0" />
      <div class="grid flex-1 overflow-y-auto lg:grid-cols-5">
        <Sidebar />
        <div class="col-span-3 overflow-y-auto lg:col-span-4 lg:border-l">
          <div class="px-4 py-12 lg:px-8">
            <slot />
          </div>
        </div>
      </div>
      <PlayerBar />
    </div>
  </Body>
</template>

<style></style>
