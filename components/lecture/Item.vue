<script setup lang="ts">
import type { Lecture } from "~/types/model";

defineProps<{ item: Lecture }>();
</script>
<template>
  <div
    class="space-y-3 overflow-hidden transition-all duration-300 border rounded-md cursor-pointer hover:shadow-lg"
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
