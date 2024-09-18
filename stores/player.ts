import { defineStore } from "pinia";
import type { Track } from "~/types/model";

export const usePlayerStore = defineStore("player", () => {
  const track = useLocalStorage<Track>("track", null);

  return { track };
});
