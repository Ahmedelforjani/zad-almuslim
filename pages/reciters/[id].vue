<script setup lang="ts">
import type { Reciter, PlayList, Riwayat } from "~/types/model";
const playerStore = usePlayerStore();

const route = useRoute();
const id = computed(() => route.params.id);

const { data: reciter } = await useAsyncData(
  "reciters",
  () =>
    useHttp()
      .get<Reciter>(`/reciters/${id.value}`)
      .catch(() => {
        navigateTo("/404");
        return null;
      }),
  { watch: [id] }
);

const search = ref("");
const selectedRiwaya = ref<number>(reciter.value?.riwayats?.[0].id || 0);

const riwaya = computed(() => {
  const temp =
    reciter.value?.riwayats?.find((r) => r.id === selectedRiwaya.value) ||
    reciter.value?.riwayats?.[0];
  const surahList = Object.entries(temp?.surah_list || {}).reduce(
    (acc, [key, value]) => {
      if (value.toLowerCase().includes(search.value.toLowerCase())) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );
  return { ...temp, surah_list: surahList } as Riwayat;
});

const handleSelectedRiwaya = (id: number) => {
  selectedRiwaya.value = id;
};

const play = () => {
  if (!riwaya.value || !reciter.value) return;
  const surahArray: PlayList[] = Object.entries(riwaya.value.surah_list).map(
    ([key, value]) => {
      const surahNumber = key.padStart(3, "0");
      return {
        id: +key,
        title: `سورة ${value}`,
        subtitle: reciter.value?.name,
        server_url: `${riwaya.value?.server_url}${surahNumber}.mp3`,
        type: "surah",
        order: +key,
      };
    }
  );
  playerStore.playList = surahArray;
};
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
    <div class="max-w-2xl mx-auto mt-6">
      <RiwayatComboBox
        :riwayats="reciter.riwayats || []"
        @update:selected="handleSelectedRiwaya"
      />
      <div class="relative items-center w-full mt-4">
        <Input
          type="text"
          placeholder="بحث..."
          class="pe-10"
          v-model="search"
        />
        <span
          class="absolute inset-y-0 flex items-center justify-center px-2 end-0"
        >
          <Icon name="lucide:search" class="w-6 h-6 text-muted-foreground" />
        </span>
      </div>
      <div v-if="riwaya" class="grid grid-cols-2 gap-4 mt-6">
        <SurahItem
          v-for="(surah, order, index) in riwaya.surah_list"
          :key="`surah-${selectedRiwaya}-${order}`"
          :item="surah"
          :order="+order"
          :reciter="reciter"
          :link="riwaya.server_url"
          :trackIndex="index"
          :riwayaID="riwaya.id"
          @play="play"
        />
      </div>
    </div>

    <div class="max-w-2xl mx-auto mt-6 space-y-6"></div>
  </main>
</template>
