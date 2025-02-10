<script setup lang="ts">
import type { Broadcast, Pagination } from "~/types/model";

const route = useRoute();
const search = ref(route.query.search?.toString() || "");

const routeQuery = computed(() => route.query);
const { data: broadcasts, status } = await useAsyncData(
  "broadcasts",
  () =>
    useHttp().get<Pagination<Broadcast>>("/broadcasts", {
      params: toValue(routeQuery),
    }),
  { watch: [routeQuery] }
);

debouncedWatch(
  search,
  () => {
    navigateTo({
      query: {
        ...routeQuery.value,
        page: 1,
        search: search.value,
      },
    });
  },
  { debounce: 500 }
);

</script>

<template>
  <div class="">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center lg:text-2xl font-semibold tracking-tight">
          <Icon name="lucide:radio" class="me-2" />
          الإذاعات
        </h2>
      </div>
      <BackButton to="/" />
    </div>
    <Separator class="my-4" />
    <div class="relative items-center w-full mt-6">
      <Input type="text" placeholder="بحث..." class="pe-10" v-model="search" />
      <span
        class="absolute inset-y-0 flex items-center justify-center px-2 end-0"
      >
        <Icon name="lucide:search" class="w-6 h-6 text-muted-foreground" />
      </span>
    </div>
    <GridView
      v-if="broadcasts?.data"
      :data="broadcasts.data"
      :pagination="broadcasts.meta"
      :is-loading="status === 'pending'"
      class="mt-6"
    >
      <template #item="{ value }">
        <BroadcastItem :item="value" />
      </template>
    </GridView>
  </div>
</template>
