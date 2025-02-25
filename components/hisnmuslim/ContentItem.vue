<script setup lang="ts">
import type { HisnmuslimContentItem } from "~/types/model";

const props = defineProps<{ item: HisnmuslimContentItem; title: string }>();

const track = computed(() => ({
  id: props.item.AUDIO,
  title: props.title,
  subtitle: props.item.ID.toString(),
  url: props.item.AUDIO,
  type: "hisnmuslim",
}));
</script>

<template>
  <div class="py-4">
    <div>
      {{ item.ARABIC_TEXT }}
    </div>
    <div class="flex flex-wrap items-center justify-between mt-4">
      <span class="text-sm text-primary">تكرار: {{ item.REPEAT }}</span>
      <PlayButton :tracks="[track]" />
    </div>
  </div>
</template>
