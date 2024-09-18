import type { Howl, HowlOptions } from "howler";

export interface HowlStatic {
  new (properties: HowlOptions): Howl;
}

export interface SpriteMap {
  [key: string]: [number, number];
}

export type ComposableOptions = {
  volume?: Ref<number>;
  playbackRate?: Ref<number>;
  interrupt?: boolean;
  soundEnabled?: boolean;
  autoplay?: boolean;
  sprite?: SpriteMap;
  onload?: () => void;
} & Omit<HowlOptions, "src" | "volume">;

export interface PlayOptions {
  id?: number;
  forceSoundEnabled?: boolean;
  playbackRate?: number;
}

export type PlayFunction = (options?: PlayOptions) => void;

export interface ReturnedValue {
  play: PlayFunction;
  sound: Ref<Howl | null>;
  stop: (id?: number) => void;
  pause: (id?: number) => void;
  isPlaying: Ref<boolean>;
  duration: Ref<number | null>;
}
