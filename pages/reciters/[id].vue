<script setup lang="ts">
import type { Reciter } from "~/types/model";

const route = useRoute();
const id = computed(() => route.params.id);

const { data: reciter } = await useAsyncData(
  "reciters",
  () =>
    useHttp()
      .$get<Reciter>(`/reciters/${id.value}`)
      .catch(() => {
        navigateTo("/404");
        return null;
      }),
  { watch: [id] }
);
</script>

<template>
  <main v-if="reciter">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center lg:text-2xl font-semibold tracking-tight">
          <Icon name="lucide:book-open-text" class="me-2" />
          {{ reciter.name }}
        </h2>
      </div>
      <BackButton to="/reciters" />
    </div>
    <Separator class="my-4" />
    <div class="max-w-2xl mx-auto mt-6 space-y-6">
      <div
        v-for="(riwaya, riwayaIndex) in reciter.riwayats"
        :key="`riwaya-${riwayaIndex}`"
      >
        <div class="p-4 rounded-xl bg-primary text-primary-foreground">
          <h4 class="text-xl font-semibold tracking-tight">
            رواية {{ riwaya.name_ar }}
          </h4>
        </div>
        <!-- <div class="relative items-center w-full mt-6">
          <Input
            type="text"
            placeholder="بحث..."
            class="pe-10"
          />
          <span
            class="absolute inset-y-0 flex items-center justify-center px-2 end-0"
          >
            <Icon name="lucide:search" class="w-6 h-6 text-muted-foreground" />
          </span>
        </div> -->
        <div class="grid grid-cols-2 gap-4 mt-6">
          <SurahItem
            v-for="(surah, order) in riwaya.surah_list"
            :key="`surah-${riwayaIndex}-${order}`"
            :item="surah"
            :order="+order"
            :reciter="reciter"
            :link="riwaya.server_url"
          />
        </div>
      </div>
    </div>

    <div class="max-w-2xl mx-auto mt-6 space-y-6"></div>
  </main>
</template>
