import { defineStore } from "pinia";
import type { Track, PlayList } from "~/types/model";

export const usePlayerStore = defineStore(
  "player",
  () => {
    const track = ref<Track | undefined>(undefined);
    const audioElement = ref<HTMLAudioElement | undefined>();
    const src = computed(() => track.value?.url || "");
    const type = computed(() => track.value?.type || "");
    const playList = ref<PlayList[] | undefined>(undefined);

    const audio = useAudio(audioElement, { src, type });

    const loadAudio = () => {
      audioElement.value = new Audio();
      audioElement.value.autoplay = true;
    };

    const unloadAudio = () => (audioElement.value = undefined);

    return { track, audio, playList, loadAudio, unloadAudio };
  },
  {
    persist: {
      key: "player",
      storage: import.meta.client ? localStorage : undefined,
      paths: ["track", "playList"],
      serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      },
    } as any,
  }
);
