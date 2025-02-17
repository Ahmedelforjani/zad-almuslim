import { defineStore } from "pinia";
import type { Track } from "~/types/model";

export const usePlayerStore = defineStore(
  "player",
  () => {
    const track = ref<Track | undefined>(undefined);

    const audioElement = ref<HTMLAudioElement | undefined>();
    const src = computed(() => track.value?.url || "");
    const type = computed(() => track.value?.type || "");

    const audio = useAudio(audioElement, { src, type });

    const loadAudio = () => {
      audioElement.value = new Audio();
      audioElement.value.autoplay = true;
    };

    const unloadAudio = () => (audioElement.value = undefined);

    return { track, audio, loadAudio, unloadAudio };
  },
  {
    persist: {
      pick: ["track"],
    },
  }
);
