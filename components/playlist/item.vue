<script setup lang="ts">
const player = usePlayerStore();

const props = defineProps<{
  order?: number;
  trackIndex: number;
  title: string;
  content?: string;
  link: string;
  subtitle?: string;
  trackId: number;
  type: string;
}>();

const track = computed(() => ({
  id: props.trackId,
  title: props.title,
  subtitle: props.subtitle,
  url: props.link,
  type: props.type,
  index: props.trackIndex,
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
    class="-mx-4 px-6 flex items-center justify-between transition-all duration-300 group-hover:text-primary hover:bg-muted/50 hover:cursor-pointer py-3"
    @click="play">
    <div class="flex gap-2">
      <span v-if="order">{{ order }}.</span>
      <div v-if="track.type === 'surah'">
        <span class="font-semibold">
          {{ track.title }}
        </span>
        <p class="text-sm text-muted-foreground">
          {{ track.subtitle }}
        </p>
      </div>
      <div v-else>
        <p class="pl-4">
          {{ props.content }}
        </p>
      </div>
    </div>
    <PlayButton :tracks="[track]" v-if="isCurrentTrack" />
  </div>
</template>
