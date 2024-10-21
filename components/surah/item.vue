<script setup lang="ts">
import { cn, zeroPad } from "~/lib/utils";
import type { Reciter } from "~/types/model";

const props = defineProps<{
  reciter: Reciter;
  item: string;
  order: number;
  link: string;
}>();
const player = usePlayerStore();
const isCurrentTrack = computed(
  () => player.track?.id === props.order && player.track.type === "surah"
);

const play = () => {
  if (isCurrentTrack.value) {
    player.audio.playing = !player.audio.playing;
  } else {
    player.track = {
      id: props.order,
      name: props.reciter.name,
      subtitle: props.item,
      url: `${props.link}${zeroPad(props.order, 3)}.mp3`,
      type: "surah",
    };
  }
};
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
        <Button
          size="icon"
          :class="cn('rounded-full')"
          :disabled="isCurrentTrack && player.audio.waiting"
          @click="play"
        >
          <Icon
            v-if="isCurrentTrack && player.audio.waiting"
            name="lucide:loader-2"
            mode="svg"
            class="w-5 h-5 animate-spin"
          />
          <Icon
            v-else
            :name="
              isCurrentTrack && player.audio.playing
                ? 'lucide:pause'
                : 'lucide:play'
            "
            mode="svg"
            class="[&>path]:fill-primary-foreground [&>g]:fill-primary-foreground h-5 w-5"
          />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
