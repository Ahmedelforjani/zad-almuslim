<script setup lang="ts">
import { zeroPad } from "~/lib/utils";
import type { Reciter } from "~/types/model";

const props = defineProps<{
  reciter: Reciter;
  item: string;
  order: number;
  link: string;
  trackIndex?: number;
  riwayaID?: number;
}>();

const emit = defineEmits<{
  (e: "play", riwayaID: number): void;
}>();

const play = () => {
  if (props.riwayaID) {
    emit("play", props.riwayaID);
  }
};

const track = computed(() => ({
  id: props.order,
  title: `سورة ${props.item}`,
  subtitle: props.reciter.name,
  url: `${props.link}${zeroPad(props.order, 3)}.mp3`,
  type: "surah",
  index: props.trackIndex,
}));
</script>
<template>
  <Card
    class="transition-all duration-300 shadow group-hover:scale-105 group-hover:shadow-lg"
  >
    <CardContent class="p-3">
      <div
        class="flex items-center justify-between transition-all duration-300 group-hover:text-primary"
      >
        <span>{{ zeroPad(order, 3) }}. {{ item }}</span>
        <PlayButton :tracks="[track]" @click="play" />
      </div>
    </CardContent>
  </Card>
</template>
