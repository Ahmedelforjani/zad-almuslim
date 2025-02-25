<script setup lang="ts">
const playerStore = usePlayerStore();
const { track, playList } = storeToRefs(playerStore);
const { audio } = playerStore;
onMounted(() => {
  if (!import.meta.client) return;

  playerStore.loadAudio();
});

onUnmounted(() => {
  playerStore.unloadAudio();
});
</script>

<template>
  <div v-if="track" class="w-full px-6 py-2 border-t lg:py-4 bg-background">
    <div class="flex items-center gap-2 lg:gap-6 lg:grid lg:grid-cols-3">
      <div class="flex items-center gap-2">
        <PlayListDrawer
          :track="track"
          :playList="playList"
          v-if="track.type === 'surah'"
        />
        <div class="flex items-center gap-2" v-else>
          <img
            v-if="track.image"
            :src="track.image"
            :alt="track.name"
            class="object-contain w-12 h-12 rounded-md"
          />
          <div class="flex flex-col space-y-1">
            <span class="text-sm font-semibold">
              <span v-if="track.type === 'surah'"> سورة </span>
              {{ track.subtitle }}
            </span>
            <p class="text-sm text-muted-foreground">
              {{ track.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="space-y-4 max-lg:ms-auto">
        <div class="flex items-center justify-center gap-4 lg:hidden">
          <Button
            size="icon"
            class="rounded-full bg-foreground text-background"
            :disabled="audio.waiting"
            @click="audio.playing = !audio.playing"
          >
            <Icon
              v-if="!audio.waiting"
              :name="audio.playing ? 'lucide:pause' : 'lucide:play'"
              mode="svg"
              class="[&>path]:fill-current [&>g]:fill-current h-5 w-5"
            />
            <Icon
              v-else
              name="lucide:loader-2"
              mode="svg"
              class="w-5 h-5 animate-spin"
            />
          </Button>
        </div>
        <AudioController class="hidden lg:block" />
      </div>
      <VolumeController class="hidden lg:flex justify-self-end w-28" />
    </div>
  </div>
</template>
