<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import type { Lecture, Pagination } from "~/types/model";

const route = useRoute();
const routeQuery = computed(() => route.query);
const { data: lectures, status } = await useAsyncData(
  "lectures",
  () =>
    useHttp().get<Pagination<Lecture>>("/lectures", {
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
          <Icon name="lucide:book" class="me-2" />
          الدروس
        </h2>
      </div>
      <BackButton />
    </div>
    <Separator class="my-4" />
    <GridView
      v-if="lectures"
      :data="lectures.data"
      :pagination="lectures.meta"
      :is-loading="status === 'pending'"
    >
      <template #item="{ value }">
        <LectureItem :item="value" />
      </template>
    </GridView>
  </div>
</template>
