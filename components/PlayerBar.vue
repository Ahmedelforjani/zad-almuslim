<script setup lang="ts">
const playerStore = usePlayerStore();
const { track } = storeToRefs(playerStore);
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
  <div v-if="track" class="w-full px-4 py-2 border-t lg:py-4 bg-background">
    <div class="flex items-center gap-2 lg:gap-6 lg:grid lg:grid-cols-3">
      <div class="flex items-center gap-2 flex-1">
        <PlayListDrawer v-if="track.type !== 'broadcast'" />
        <div class="flex items-center gap-2" v-else>
          <img
            v-if="track.image"
            :src="track.image"
            :alt="track.title"
            class="object-contain w-12 h-12 rounded-md"
          />
          <div class="flex flex-col space-y-1">
            <span class="text-sm font-semibold">
              {{ track.title }}
            </span>
            <p class="text-sm text-muted-foreground">
              {{ track.subtitle }}
            </p>
          </div>
        </div>
      </div>
      <div class="space-y-4 max-lg:ms-auto">
        <AudioController class="block lg:hidden" :displaySeekBar="false" />
        <AudioController class="hidden lg:block" :displaySeekBar="true" />
      </div>
      <VolumeController class="hidden lg:flex justify-self-end w-28" />
    </div>
  </div>
</template>
