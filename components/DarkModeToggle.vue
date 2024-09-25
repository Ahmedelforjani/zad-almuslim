<script setup lang="ts">
import { Button } from "@/components/ui/button";

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <Button variant="ghost" @click="toggleTheme" size="icon">
    <Icon
      name="lucide:moon"
      class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Icon
      name="lucide:sun"
      class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
