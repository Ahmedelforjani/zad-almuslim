import { defineStore } from "pinia";
import type { Track } from "~/types/model";

export const usePlayerStore = defineStore(
  "player",
  () => {
    const track = ref<Track | undefined>(undefined);

    return { track };
  },
  {
    persist: true,
  }
);
