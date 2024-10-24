<script setup lang="ts">
import type { HisnmuslimItem } from "~/types/model";

const { data: hisnmuslim, status } = await useAsyncData("hisnmuslim", () =>
  useHttp().get<Record<string, HisnmuslimItem[]>>(
    "https://www.hisnmuslim.com/api/ar/husn_ar.json"
  )
);

const search = ref("");
const items = computed(() => {
  if (!hisnmuslim.value) return [];
  return Object.values(hisnmuslim.value)?.[0]?.filter((item: HisnmuslimItem) =>
    item.TITLE.includes(search.value)
  );
});
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
      v-if="items.length > 0"
      :data="items"
      :is-loading="status === 'pending'"
      class="mt-6"
      grid-class="lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
    >
      <template #item="{ value, index }">
        <NuxtLink :to="`/hisnmuslim/${value.ID}`" class="group">
          <Card
            class="transition-all duration-300 shadow group-hover:scale-105 group-hover:shadow-lg"
          >
            <CardContent class="p-3">
              <div
                class="flex items-center gap-2 text-sm transition-all duration-300 lg:text-base group-hover:text-primary"
              >
                {{ index + 1 }}. {{ value.TITLE }}
              </div>
            </CardContent>
          </Card>
        </NuxtLink>
      </template>
    </GridView>
    <div
      v-else-if="search.length > 0"
      class="mt-6 text-lg font-medium text-center"
    >
      <p>لا توجد نتائج للبحث عن "{{ search }}"</p>
    </div>
  </div>
</template>
