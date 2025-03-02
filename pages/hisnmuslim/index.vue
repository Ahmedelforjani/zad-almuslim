<script setup lang="ts">
import type { Pagination, HisnmuslimItem } from "~/types/model";

const route = useRoute();
const search = ref(route.query.search?.toString() || "");
const routeQuery = computed(() => route.query);

const { data: hisnmuslim, status } = await useAsyncData(
  "hisnmuslim",
  () =>
    useHttp().get<Pagination<HisnmuslimItem>>("/supplications", {
      params: {
        ...toValue(routeQuery),
        per_page: 30,
      },
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
        <h2 class="flex items-center font-semibold tracking-tight lg:text-2xl">
          <Icon name="lucide:book-marked" class="me-2" />
          حصن المسلم من أذكار الكتاب والسنة
        </h2>
      </div>
      <BackButton to="/" />
    </div>
    <Separator class="my-4" />
    <!-- <div class="max-w-2xl mt-6">
      <div class="space-y-6 text-lg leading-loose text-justify">
        <p>
          كتاب حصن المسلم من أذكار الكتاب والسنة يجمع أذكار وأدعية النبي صلى
          الله عليه وسلم الصحيحة في مختلف مجالات الحياة اليومية.
        </p>
      </div>
    </div> -->
    <div class="relative items-center w-full mt-6">
      <Input type="text" placeholder="بحث..." class="pe-10" v-model="search" />
      <span
        class="absolute inset-y-0 flex items-center justify-center px-2 end-0"
      >
        <Icon name="lucide:search" class="w-6 h-6 text-muted-foreground" />
      </span>
    </div>
    <GridView
      v-if="hisnmuslim?.data"
      :data="hisnmuslim.data"
      :pagination="hisnmuslim.meta"
      :is-loading="status === 'pending'"
      grid-class="lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
      class="mt-6"
    >
      <template #item="{ value, order }">
        <HisnmuslimItem :item="value" :order="order" />
      </template>
    </GridView>
    <!-- <div v-else class="mt-6 text-lg font-medium text-center">
      <p>لا توجد نتائج للبحث عن "{{ search }}"</p>
    </div> -->
  </div>
</template>
