<script setup lang="ts">
import type { Track } from "~/types/model";

const props = defineProps<{
  tracks: Track[];
}>();

const player = usePlayerStore();

const isCurrentTrack = computed(
  () =>
    player.track?.id === props.tracks[0]?.id &&
    player.track?.type === props.tracks[0]?.type
);

const play = () => {
  if (isCurrentTrack.value) {
    player.audio.playing = !player.audio.playing;
  } else {
    player.track = props.tracks[0];
  }
};
</script>

<template>
  <Button
    size="icon"
    class="rounded-full w-7 h-7 shrink-0 lg:h-9 lg:w-9"
    :disabled="isCurrentTrack && player.audio.waiting"
    @click="play"
  >
    <Icon
      v-if="isCurrentTrack && player.audio.waiting"
      name="lucide:loader-2"
      mode="svg"
      class="w-4 h-4 lg:w-5 lg:h-5 animate-spin"
    />
    <Icon
      v-else
      :name="
        isCurrentTrack && player.audio.playing ? 'lucide:pause' : 'lucide:play'
      "
      mode="svg"
      class="w-4 h-4 lg:w-5 lg:h-5 [&>path]:fill-primary-foreground [&>g]:fill-primary-foreground"
    />
  </Button>
</template>
