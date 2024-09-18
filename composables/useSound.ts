import { Howl } from "howler";
import type {
  ComposableOptions,
  HowlStatic,
  PlayFunction,
  PlayOptions,
} from "@/types/useSoundType";

export function useSound(
  url: Ref<string>,
  {
    volume = ref(1),
    playbackRate = ref(1),
    soundEnabled = true,
    interrupt = false,
    autoplay = false,
    onload,
    ...delegated
  }: ComposableOptions = {}
) {
  const HowlConstructor = ref<HowlStatic | null>(null);
  const isPlaying = ref<boolean>(false);
  const duration = ref<number | null>(null);
  const sound = ref<Howl | null>(null);
  const isLoading = ref<boolean>(false);

  function handleLoad() {
    // @ts-expect-error - ?
    if (typeof onload === "function") onload.call(this as any);
    duration.value = (duration.value || sound.value?.duration() || 0) * 1000;
    isLoading.value = false;

    if (autoplay === true) {
      isPlaying.value = true;
    }
  }

  onMounted(async () => {
    HowlConstructor.value = Howl;

    // if (!unref(url)) return;

    // sound.value = new HowlConstructor.value({
    //   src: unref(url) as string,
    //   volume: unref(volume) as number,
    //   rate: unref(playbackRate) as number,
    //   onload: handleLoad,
    //   html5: true,
    //   ...delegated,
    // });
  });

  onBeforeUnmount(() => {
    sound.value?.unload();
  });

  watch(
    () => url.value,
    () => {
      if (HowlConstructor.value && sound) {
        sound.value?.unload();
        isLoading.value = true;
        sound.value = new HowlConstructor.value({
          src: unref(url),
          volume: unref(volume) as number,
          rate: unref(playbackRate) as number,
          onload: handleLoad,
          html5: true,
          autoplay,
          ...delegated,
        });
      }
    }
  );

  watch(
    () => [unref(volume), unref(playbackRate)],
    () => {
      if (sound.value) {
        sound.value.volume(unref(volume) as number);
        sound.value.rate(unref(playbackRate) as number);
      }
    }
  );

  const play: PlayFunction = (options?: PlayOptions) => {
    if (typeof options === "undefined") {
      options = {};
    }

    if (!sound.value || (!soundEnabled && !options.forceSoundEnabled)) {
      return;
    }

    if (interrupt) {
      sound.value.stop();
    }

    if (options.playbackRate) {
      sound.value.rate(options.playbackRate);
    }

    sound.value.play(options.id);

    sound.value.once("end", () => {
      if (sound.value && sound.value && !sound.value.playing()) {
        isPlaying.value = false;
      }
    });

    isPlaying.value = true;
  };

  const stop = (id?: number) => {
    if (!sound.value) {
      return;
    }

    sound.value.stop(typeof id === "number" ? id : undefined);

    isPlaying.value = false;
  };

  const pause = (id?: number) => {
    if (!sound.value) {
      return;
    }

    sound.value.pause(typeof id === "number" ? id : undefined);

    isPlaying.value = false;
  };

  return {
    play,
    sound,
    isPlaying,
    isLoading,
    duration,
    pause,
    stop,
  };
}
