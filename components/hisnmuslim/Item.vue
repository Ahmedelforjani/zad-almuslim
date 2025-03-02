<script setup lang="ts">
import type { HisnmuslimItem } from "~/types/model";

const props = defineProps<{
  item: HisnmuslimItem;
  order?: number;
}>();
</script>
<template>
  <NuxtLink :to="`/hisnmuslim/${item.id}`" class="group">
    <Card
      class="transition-all duration-300 shadow group-hover:scale-105 group-hover:shadow-lg"
    >
      <CardContent class="p-3">
        <div
          class="flex items-center gap-2 transition-all duration-300 group-hover:text-primary"
        >
          <span v-if="order">{{ order }}.</span> {{ item.name }}
        </div>
      </CardContent>
    </Card>
  </NuxtLink>
</template>
