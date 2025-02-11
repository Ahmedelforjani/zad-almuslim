const IDLE_TIMEOUT = 10_000;

type Options = {
  src: Ref<string | undefined> | ComputedRef<string | undefined>;
};

export function useAudio(
  target: Ref<HTMLAudioElement | undefined>,
  { src }: Options
) {
  const volume = ref(0.25);
  const playing = ref(false);
  const waiting = ref(false);
  const rate = ref(1);
  const seeking = ref(false);
  const ended = ref(false);
  const muted = ref(false);
  const stalled = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const buffered = ref<[number, number][]>([]);

  const stopAudioLoadingTimeout = ref<NodeJS.Timeout | undefined>();

  function timeRangeToArray(timeRanges: TimeRanges) {
    let ranges: [number, number][] = [];

    for (let i = 0; i < timeRanges.length; ++i)
      ranges = [...ranges, [timeRanges.start(i), timeRanges.end(i)]];

    return ranges;
  }

  watchEffect(() => {
    if (!document) return;

    const el = toValue(target);
    if (!el || !toValue(src)) return;

    // Finally, load the new sources.
    el.load();
  });

  // Remove source error listeners
  tryOnScopeDispose(() => {
    const el = toValue(target);
    if (!el) return;
  });

  watch([target, volume], () => {
    const el = toValue(target);
    if (!el) return;

    el.volume = volume.value;
  });

  watch([target, muted], () => {
    const el = toValue(target);
    if (!el) return;

    el.muted = muted.value;
  });

  watch([target, rate], () => {
    const el = toValue(target);
    if (!el) return;

    el.playbackRate = rate.value;
  });

  const { ignoreUpdates: ignoreCurrentTimeUpdates } = watchIgnorable(
    currentTime,
    (time) => {
      const el = toValue(target);
      if (!el) return;

      el.currentTime = time;
    }
  );

  const { ignoreUpdates: ignorePlayingUpdates } = watchIgnorable(
    playing,
    (isPlaying) => {
      const el = toValue(target);
      if (!el) return;

      if (isPlaying) {
        stopAudioLoadingTimeout.value &&
          clearTimeout(stopAudioLoadingTimeout.value);

        if (src.value && el.src !== new URL(src.value).href) el.src = src.value;

        el.play();
      } else {
        el.pause();
        stopAudioLoadingTimeout.value = setTimeout(() => {
          el.src = "";
        }, IDLE_TIMEOUT);
      }
    }
  );

  watch(src, () => {
    const el = toValue(target);
    if (!el) return;

    if (src.value) {
      el.src = src.value;

      playing.value = true;
      el.autoplay = true;
    }
  });

  useEventListener(target, "timeupdate", () =>
    ignoreCurrentTimeUpdates(
      () => (currentTime.value = toValue(target)!.currentTime)
    )
  );
  useEventListener(
    target,
    "durationchange",
    () => (duration.value = toValue(target)!.duration)
  );
  useEventListener(
    target,
    "progress",
    () => (buffered.value = timeRangeToArray(toValue(target)!.buffered))
  );
  useEventListener(target, "seeking", () => (seeking.value = true));
  useEventListener(target, "seeked", () => (seeking.value = false));

  useEventListener(target, "play", () => (playing.value = true));
  useEventListener(target, "pause", () => (playing.value = false));
  useEventListener(target, "loadstart", () => {
    const el = toValue(target);
    if (src.value && el?.src && el.src === new URL(src.value).href) {
      waiting.value = true;
    } else {
      waiting.value = false;
    }
    // ignorePlayingUpdates(() => (playing.value = false));
  });
  useEventListener(target, "loadeddata", () => (waiting.value = false));
  useEventListener(target, "playing", () => {
    waiting.value = false;
    ended.value = false;
    ignorePlayingUpdates(() => (playing.value = true));
  });
  useEventListener(
    target,
    "ratechange",
    () => (rate.value = toValue(target)!.playbackRate)
  );
  useEventListener(target, "stalled", () => (stalled.value = true));
  useEventListener(target, "ended", () => (ended.value = true));
  useEventListener(target, "pause", () =>
    ignorePlayingUpdates(() => (playing.value = false))
  );
  useEventListener(target, "play", () =>
    ignorePlayingUpdates(() => (playing.value = true))
  );

  useEventListener(target, "volumechange", () => {
    const el = toValue(target);
    if (!el) return;

    volume.value = el.volume;
    muted.value = el.muted;
  });

  return {
    waiting,
    muted,
    playing,
    target,
    volume,
    currentTime,
    duration,
  };
}
