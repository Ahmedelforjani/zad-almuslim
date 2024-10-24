<script setup lang="ts">
const themeStore = useThemeStore();
</script>

<template>
  <div
    class="flex items-center justify-between h-16 gap-6 px-4 border-b lg:px-6"
  >
    <NuxtLink to="/">
      <Logo />
    </NuxtLink>
    <div class="flex items-center gap-2">
      <DarkModeToggle />
      <Button
        class="flex lg:hidden"
        variant="ghost"
        size="icon"
        @click="themeStore.toggleSidebar()"
      >
        <Icon name="lucide:menu" class="w-5 h-5" />
      </Button>
    </div>
  </div>
</template>
