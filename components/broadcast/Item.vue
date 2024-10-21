<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { Broadcast } from "~/types/model";

const player = usePlayerStore();
const props = defineProps<{ item: Broadcast }>();

const isCurrentTrack = computed(
  () => player.track?.id === props.item.id && player.track.type === "broadcast"
);

defineEmits<{ play: [Broadcast] }>();

const play = () => {
  if (isCurrentTrack.value) {
    player.audio.playing = !player.audio.playing;
  } else {
    player.track = {
      id: props.item.id,
      name: props.item.name,
      image: props.item.image,
      url: props.item.url,
      type: "broadcast",
    };
  }
};
</script>
<template>
  <div
    class="space-y-3 overflow-hidden transition-all duration-300 border rounded-md group hover:shadow-lg"
  >
    <div class="relative overflow-hidden">
      <img
        :src="item.image"
        :alt="item.name"
        class="object-cover w-full h-40 transition-all"
      />
      <Button
        size="icon"
        :class="
          cn(
            'absolute transition-all duration-300 rounded-full opacity-100 lg:bottom-0 lg:opacity-0 bottom-2 left-2 group-hover:bottom-2 group-hover:opacity-100',
            { 'lg:bottom-2 lg:opacity-100': isCurrentTrack }
          )
        "
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
    <div class="px-4 py-4 space-y-1 text-sm">
      <h3 class="font-medium leading-none">
        {{ item.name }}
      </h3>
      <p class="text-xs text-muted-foreground">
        {{ item.categories.map(({ name }) => name).join(", ") }}
      </p>
    </div>
  </div>
</template>
