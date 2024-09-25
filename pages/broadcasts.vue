<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import type { Broadcast, Pagination } from "~/types/model";

const route = useRoute();
const routeQuery = computed(() => route.query);
const { data: broadcasts, status } = await useAsyncData(
  "broadcasts",
  () =>
    useHttp().get<Pagination<Broadcast>>("/broadcasts", {
      params: toValue(routeQuery),
    }),
  { watch: [routeQuery] }
);
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center text-2xl font-semibold tracking-tight">
          <Icon name="lucide:radio" class="me-2" />
          الإذاعات
        </h2>
      </div>
      <BackButton />
    </div>
    <Separator class="my-4" />
    <GridView
      v-if="broadcasts"
      :data="broadcasts.data"
      :pagination="broadcasts.meta"
      :is-loading="status === 'pending'"
    >
      <template #item="{ value }">
        <BroadcastItem :item="value" />
      </template>
    </GridView>
  </div>
</template>
