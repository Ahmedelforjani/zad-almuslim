<script setup lang="ts">
const player = usePlayerStore();

const props = defineProps<{
  order?: number;
  title: string;
  link: string;
  trackName: string;
  trackId: number;
  type: string;
}>();

const track = computed(() => ({
  id: props.trackId,
  subtitle: props.title,
  name: props.trackName,
  url: props.link,
  type: props.type,
}));

const isCurrentTrack = computed(
  () =>
    player.track?.id === props.trackId &&
    player.track?.type === props.type &&
    player.track?.url === props.link
);

const play = () => {
  if (isCurrentTrack.value) {
    player.audio.playing = !player.audio.playing;
  } else {
    player.track = track.value;
  }
};
</script>

<template>
  <div
    class="flex items-center justify-between transition-all duration-300 group-hover:text-primary px-3 hover:bg-muted/50 hover:cursor-pointer py-3"
    @click="play"
  >
    <div class="flex gap-2">
      <span v-if="order">{{ order }}.</span>
      <di v>
        <span class="font-semibold">
          <span v-if="track.type === 'surah'"> سورة </span>
          {{ track.subtitle }}
        </span>
        <p class="text-sm text-muted-foreground">
          {{ track.name }}
        </p>
      </di>
    </div>
    <PlayButton :tracks="[track]" v-if="isCurrentTrack" />
  </div>
</template>
