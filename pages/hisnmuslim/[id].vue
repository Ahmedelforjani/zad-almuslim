<script setup lang="ts">
import type { HisnmuslimItem, Track } from "~/types/model";

const player = usePlayerStore();

const route = useRoute();
const id = computed(() => route.params.id);

const { data } = await useAsyncData(
  `hisnmuslim`,
  () => useHttp().get<HisnmuslimItem>(`/supplications/${id.value}`),
  { watch: [id] }
);

const items = computed(() => data.value?.supplications || []);
const title = computed(() => data.value?.name || "");
const track = computed(
  () =>
    ({
      id: data.value?.id,
      url: data.value?.url,
      title: data.value?.name,
      type: "hisnmuslim",
    } as Track)
);
const play = () => {
  if (!items.value.length || !data.value) return;
  player.playList = items.value.map((item, index) => ({
    id: item.id,
    title: data.value!.name,
    content: item.content,
    server_url: item.url,
    order: index,
    type: "hisnmuslim",
  }));
};
</script>

<template>
  <main>
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center font-semibold tracking-tight lg:text-2xl">
          <Icon name="lucide:book-marked" class="me-2" />
          {{ data?.name }}
        </h2>
      </div>
      <div class="flex items-center">
        <!-- <PlayButton v-if="data?.url" :tracks="[track]" /> -->
        <BackButton to="/hisnmuslim" />
      </div>
    </div>
    <Separator class="my-4" />

    <div class="max-w-2xl mx-auto mt-6">
      <div class="py-3 prose divide-y lg:prose-xl text-foreground">
        <HisnmuslimContentItem
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          :title="title"
          :trackIndex="index"
          @play="play"
        />
      </div>
    </div>

    <div class="max-w-2xl mx-auto mt-6 space-y-6"></div>
  </main>
</template>
