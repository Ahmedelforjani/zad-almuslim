<script setup lang="ts">
const { track } = storeToRefs(usePlayerStore());
const volume = ref(1);
const trackUrl = computed(() => track.value?.url);
const soundPlayer = useSound(trackUrl, {
  autoplay: true,
  volume,
});
const isMuted = computed(() => volume.value === 0);
const toggle = () =>
  soundPlayer.isPlaying.value ? soundPlayer.pause() : soundPlayer.play();

const toggleMute = () => {
  volume.value = isMuted.value ? 1 : 0;
};
</script>

<template>
  <div v-if="track" class="w-full px-6 py-6 border-t bg-background">
    <div class="flex items-center gap-2 lg:gap-6 lg:grid lg:grid-cols-3">
      <div class="flex items-center gap-2">
        <img
          :src="track.image"
          :alt="track.name"
          class="object-contain w-12 h-12 rounded-md"
        />
        <span class="text-sm font-semibold">
          {{ track.name }}
        </span>
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
            :disabled="soundPlayer.isLoading.value"
            @click="toggle"
          >
            <Icon
              v-if="!soundPlayer.isLoading.value"
              :name="
                soundPlayer.isPlaying.value ? 'lucide:pause' : 'lucide:play'
              "
              mode="svg"
              class="[&>path]:fill-[currentColor] h-5 w-5"
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
              class="[&>path]:fill-[currentColor] h-5 w-5"
            />
          </Button>
        </div>
        <!-- <Slider disabled :max="100" :step="1" /> -->
      </div>
      <div class="items-center justify-end hidden gap-2 lg:flex">
        <!-- <Slider disabled :max="100" :step="1" class="w-28" /> -->
        <Button
          size="icon"
          variant="ghost"
          class="rounded-full"
          @click="toggleMute"
        >
          <Icon
            :name="isMuted ? 'lucide:volume-x' : 'lucide:volume-2'"
            mode="svg"
            class="[&>path]:fill-[currentColor] h-5 w-5"
          />
        </Button>
      </div>
    </div>
  </div>
</template>
