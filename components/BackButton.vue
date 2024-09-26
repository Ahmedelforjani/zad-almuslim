<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineProps<{
  to?: RouteLocationRaw;
}>();

const router = useRouter();
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    class="rounded-full"
    @click="to ? router.push(to) : router.go(-1)"
  >
    <Icon name="lucide:chevron-left" class="w-5 h-5" />
  </Button>
</template>
