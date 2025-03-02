<script setup lang="ts">
import type { Supplication } from "~/types/model";

const props = defineProps<{
  item: Supplication;
  title: string;
  trackIndex: number;
}>();

const track = computed(() => ({
  id: props.item.id,
  title: props.title,
  url: props.item.url,
  type: "hisnmuslim",
  index: props.trackIndex,
}));
</script>

<template>
  <div class="py-4">
    <div>
      {{ item.content }}
    </div>
    <div class="flex flex-wrap items-center justify-between mt-4">
      <span class="text-sm text-primary">تكرار: {{ item.repeat }}</span>
      <PlayButton :tracks="[track]" @click="$emit('play')" />
    </div>
  </div>
</template>
