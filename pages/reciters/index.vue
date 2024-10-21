<script setup lang="ts">
import type { Pagination, Reciter } from "~/types/model";

const route = useRoute();
const routeQuery = computed(() => route.query);
const { data: lectures, status } = await useAsyncData(
  "reciters",
  () =>
    useHttp().get<Pagination<Reciter>>("/reciters", {
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
          <Icon name="lucide:book-open-text" class="me-2" />
          قراءات القرآن الكريم
        </h2>
      </div>
      <BackButton to="/" />
    </div>
    <Separator class="my-4" />
    <GridView
      v-if="lectures?.data"
      :data="lectures.data"
      :pagination="lectures.meta"
      :is-loading="status === 'pending'"
      grid-class="lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
    >
      <template #item="{ value, order }">
        <ReciterItem :item="value" :order="order" />
      </template>
    </GridView>
  </div>
</template>
