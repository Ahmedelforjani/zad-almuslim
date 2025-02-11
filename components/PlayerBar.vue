<script setup lang="ts">
const playerStore = usePlayerStore();
const { track } = storeToRefs(playerStore);
const { audio } = playerStore;

const sliderVolume = ref([audio.volume]);
const currentTimeRef = ref([audio.currentTime]);

watchEffect(() => {
  currentTimeRef.value = [audio.currentTime];
});

watch(currentTimeRef, (newTime) => {
  audio.currentTime = newTime[0];
});

watchEffect(() => {
  sliderVolume.value = [audio.volume];
});

watch(sliderVolume, (newSliderVolume) => {
  audio.volume = newSliderVolume[0];
});

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
        <img
          v-if="track.image"
          :src="track.image"
          :alt="track.name"
          class="object-contain w-12 h-12 rounded-md"
        />
        <div class="flex flex-col space-y-1">
          <span class="text-sm font-semibold">
            {{ track.name }}
          </span>
          <span class="text-sm text-muted-foreground">
            {{ track.subtitle }}
          </span>
        </div>
      </div>
      <div class="lg:space-y-4 max-lg:ms-auto">
        <div class="flex items-center justify-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            class="hidden rounded-full lg:flex"
          >
            <Icon
              name="lucide:skip-forward"
              mode="svg"
              class="[&>path]:fill-[currentColor] h-5 w-5"
            />
          </Button>
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
          <Button
            size="icon"
            variant="ghost"
            class="hidden rounded-full lg:flex"
          >
            <Icon
              name="lucide:skip-back"
              mode="svg"
              class="[&>path]:fill-current h-5 w-5"
            />
          </Button>
        </div>
        <span
          class="text-sm text-muted-foreground lg:flex gap-4 hidden"
          v-if="track.type !== 'broadcast' && audio.duration"
        >
          {{ Math.floor(audio.duration / 60) }}:{{
            (audio.duration % 60).toFixed()
          }}
          <Slider v-model="currentTimeRef" :max="audio.duration" :step="0.5" />
          {{ Math.floor(audio.currentTime / 60) }}:{{
            (audio.currentTime % 60).toFixed()
          }}
        </span>
      </div>
      <div class="items-center justify-end hidden gap-2 lg:flex">
        <span class="text-sm text-muted-foreground"
          >{{ (audio.volume * 100).toFixed() }} %
        </span>
        <Slider v-model="sliderVolume" :max="1" :step="0.01" class="w-28" />
        <Button
          size="icon"
          variant="ghost"
          class="rounded-full"
          @click="audio.muted = !audio.muted"
        >
          <Icon
            :name="audio.muted ? 'lucide:volume-x' : 'lucide:volume-2'"
            mode="svg"
            class="[&>path]:fill-[currentColor] h-5 w-5"
          />
        </Button>
      </div>
    </div>
  </div>
</template>
