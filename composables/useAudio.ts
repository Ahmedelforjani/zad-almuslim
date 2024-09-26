const IDLE_TIMEOUT = 10_000;

export function useAudio(
  url: Ref<string | undefined> | ComputedRef<string | undefined>
) {
  const volume = ref(1);
  const play = ref(false);
  const isPlaying = ref(false);
  const isLoading = ref(false);
  const player = ref<HTMLAudioElement>();

  const isMuted = computed(() => volume.value === 0);
  const stopAudioLoadingTimeout = ref<NodeJS.Timeout | undefined>();

  const onPlay = () => (isPlaying.value = true);
  const onPause = () => (isPlaying.value = false);
  const onLoadStart = () => {
    if (
      url.value &&
      player.value?.src &&
      player.value.src === new URL(url.value).href
    )
      isLoading.value = true;
    else {
      isLoading.value = false;
      isPlaying.value = false;
    }
  };

  const onLoadedData = () => {
    isLoading.value = false;
    if (play.value) {
      player.value?.play();
    }
  };

  watch(url, () => {
    if (url.value) {
      player.value!.src = url.value;
      play.value = true;
    }
  });

  watch(volume, () => {
    player.value!.volume = volume.value;
  });

  watch(play, () => {
    if (play.value) {
      stopAudioLoadingTimeout.value &&
        clearTimeout(stopAudioLoadingTimeout.value);

      if (url.value && player.value?.src !== new URL(url.value).href)
        player.value!.src = url.value;

      player.value?.play();
    } else {
      player.value?.pause();
      stopAudioLoadingTimeout.value = setTimeout(() => {
        player.value!.src = "";
      }, IDLE_TIMEOUT);
    }
  });

  const togglePlay = () => (play.value = !play.value);
  const toggleMute = () => (volume.value = isMuted.value ? 1 : 0);

  onMounted(() => {
    if (!import.meta.client) return;
    player.value = new Audio();
    player.value.volume = volume.value;
    player.value.addEventListener("play", onPlay);
    player.value.addEventListener("pause", onPause);
    player.value.addEventListener("loadstart", onLoadStart);
    player.value.addEventListener("loadeddata", onLoadedData);
  });

  onUnmounted(() => {
    if (!player.value) return;
    player.value.src = "";
    player.value.removeEventListener("play", onPlay);
    player.value.removeEventListener("pause", onPause);
    player.value.removeEventListener("loadstart", onLoadStart);
    player.value.removeEventListener("loadeddata", onLoadedData);
  });

  return {
    isLoading,
    isMuted,
    isPlaying,
    player,
    volume,
    toggleMute,
    togglePlay,
  } as const;
}
