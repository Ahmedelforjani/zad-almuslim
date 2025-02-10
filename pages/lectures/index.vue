<script setup lang="ts">
import type { Lecture, Pagination } from "~/types/model";

const route = useRoute();
const router = useRouter();
const routeQuery = computed(() => route.query);
const search = ref(route.query.search?.toString() || "");

const { data: lectures, status } = await useAsyncData(
  "lectures",
  () =>
    useHttp().get<Pagination<Lecture>>("/lectures", {
      params: toValue(routeQuery),
    }),
  { watch: [routeQuery] }
);

watchDebounced(
  search,
  () => {
    router.replace({
      query: { ...routeQuery.value, page: 1, search: search.value },
    });
  },
  {
    debounce: 500,
    maxWait: 2000,
  }
);
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center font-semibold tracking-tight lg:text-2xl">
          <Icon name="lucide:book" class="me-2" />
          الدروس
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
      v-if="lectures?.data"
      :data="lectures.data"
      :pagination="lectures.meta"
      :is-loading="status === 'pending'"
      class="mt-6"
    >
      <template #item="{ value }">
        <LectureItem :item="value" />
      </template>
    </GridView>
  </div>
</template>
