<script setup lang="ts">
import { cn } from "~/lib/utils";

const playerStore = usePlayerStore();
const { track } = storeToRefs(playerStore);
const { audio } = playerStore;

const props = defineProps<{
  seekBarClass?: HTMLDivElement["className"];
}>();

const currentTimeRef = computed({
  get: () => [audio.currentTime],
  set: (val) => (audio.currentTime = val[0]),
});
</script>

<template>
  <div class="space-y-4 max-lg:ms-auto" v-if="track">
    <div class="flex items-center justify-center gap-4">
      <Button
        size="icon"
        variant="ghost"
        class="rounded-full flex"
        @click="audio.nextTrack()"
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
        class="rounded-full flex"
        @click="audio.prevTrack()"
      >
        <Icon
          name="lucide:skip-back"
          mode="svg"
          class="[&>path]:fill-current h-5 w-5"
        />
      </Button>
    </div>
    <div
      :class="
        cn('text-sm text-muted-foreground flex gap-4', props.seekBarClass)
      "
      v-if="track.type !== 'broadcast' && audio.duration"
    >
      <div class="flex items-center tabular-nums">
        {{ (audio.duration % 60).toFixed().padStart(2, "0") }}:
        <span>
          {{
            Math.floor((audio.duration % 3600) / 60)
              .toString()
              .padStart(2, "0")
          }}
        </span>
        <span v-if="audio.duration >= 3600">
          :{{ Math.floor(audio.duration / 3600) }}
        </span>
      </div>
      <Slider v-model="currentTimeRef" :max="audio.duration" :step="0.5" />
      <div class="flex items-center tabular-nums">
        {{ (audio.currentTime % 60).toFixed().padStart(2, "0") }}:
        <span>
          {{
            Math.floor((audio.currentTime % 3600) / 60)
              .toString()
              .padStart(2, "0")
          }}
        </span>
        <span v-if="audio.currentTime >= 3600">
          :{{ Math.floor(audio.currentTime / 3600) }}
        </span>
      </div>
    </div>
  </div>
</template>
