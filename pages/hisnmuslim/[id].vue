<script setup lang="ts">
import type {
  HisnmuslimContentItem,
  HisnmuslimItem,
  Track,
} from "~/types/model";

const route = useRoute();
const id = computed(() => route.params.id);

const { data } = await useAsyncData(
  `hisnmuslim/${id.value}`,
  () =>
    useHttp().get<Record<string, HisnmuslimContentItem[]>>(
      `https://www.hisnmuslim.com/api/ar/${id.value}.json`
    ),
  { watch: [id] }
);

const { data: hisnmuslim } = await useAsyncData("hisnmuslim", () =>
  useHttp().get<Record<string, HisnmuslimItem[]>>(
    "https://www.hisnmuslim.com/api/ar/husn_ar.json"
  )
);

if (!data.value) {
  navigateTo("/404");
}

const currentDiker = computed(() =>
  Object.values(hisnmuslim.value || {})?.[0]?.find(
    (item) => +item.ID === +id.value
  )
);
const items = computed(() => Object.values(data.value || {})?.[0]);
const title = computed(() => Object.keys(data.value || {})?.[0]);
const track = computed(
  () =>
    ({
      id: currentDiker.value?.AUDIO_URL,
      name: currentDiker.value?.TITLE,
      url: currentDiker.value?.AUDIO_URL,
      type: "hisnmuslim",
    } as Track)
);
</script>

<template>
  <main>
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center font-semibold tracking-tight lg:text-2xl">
          <Icon name="lucide:book-marked" class="me-2" />
          {{ currentDiker?.TITLE }}
        </h2>
      </div>
      <div class="flex items-center">
        <PlayButton v-if="currentDiker" :tracks="[track]" />
        <BackButton to="/hisnmuslim" />
      </div>
    </div>
    <Separator class="my-4" />

    <div class="max-w-2xl mx-auto mt-6">
      <div class="py-3 prose divide-y lg:prose-xl text-foreground">
        <HisnmuslimContentItem
          v-for="item in items"
          :key="item.ID"
          :item="item"
          :title="title"
        />
      </div>
    </div>

    <div class="max-w-2xl mx-auto mt-6 space-y-6"></div>
  </main>
</template>
