<script setup lang="ts">
import type { Lecture } from "~/types/model";

defineProps<{ item: Lecture }>();
defineEmits<{ (e: "play", item: Lecture): void }>();
</script>
<template>
  <div
    class="space-y-3 transition-all duration-300 border rounded-md cursor-pointer hover:shadow-lg hover:scale-105"
    @click="$emit('play', item)"
  >
    <div class="overflow-hidden rounded-md">
      <img
        :src="item.image"
        :alt="item.name"
        class="object-cover w-full h-40 transition-all"
      />
    </div>
    <div class="px-4 py-4 space-y-1 text-sm">
      <h3 class="font-medium leading-none">
        {{ item.name }}
      </h3>
      <p class="text-xs text-muted-foreground">
        {{ item.categories.map(({ name }) => name).join(", ") }}
      </p>
    </div>
  </div>
</template>
