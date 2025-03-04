<script lang="ts" setup>
const playerStore = usePlayerStore();
const { audio } = playerStore;

const sliderVolume = computed({
  get: () => [audio.volume],
  set: (val) => (audio.volume = val[0]),
});
</script>

<template>
  <div class="flex items-center justify-end gap-2">
    <Slider v-model="sliderVolume" :max="1" :step="0.01" />
    <Button
      size="icon"
      variant="ghost"
      class="rounded-full"
      @click="audio.muted = !audio.muted"
    >
      <Icon
        :name="
          audio.muted || sliderVolume[0] === 0
            ? 'lucide:volume-off'
            : 'lucide:volume-2'
        "
        mode="svg"
        class="[&>path]:fill-[currentColor] h-5 w-5"
      />
    </Button>
  </div>
</template>
