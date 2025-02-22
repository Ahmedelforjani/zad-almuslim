<script setup lang="ts">
import type { Mosque } from "~/types/model";

const route = useRoute();
const routeQuery = computed(() => route.query);
const lat = ref<number | null>(null);
const long = ref<number | null>(null);
const mosques = ref<Mosque[]>([]);
const locationError = ref<string | null>(null);
const isLocationDenied = ref(false);

const getLocation = () => {
  if (!navigator.geolocation) {
    locationError.value = "المتصفح لا يدعم الوصول إلى الموقع.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat.value = position.coords.latitude;
      long.value = position.coords.longitude;
      locationError.value = null;
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationError.value =
            "الرجاء السماح بالوصول إلى الموقع لعرض المساجد القريبة.";
          isLocationDenied.value = true;
          console.error("User denied location access.");
          break;
        case error.POSITION_UNAVAILABLE:
          locationError.value =
            "تعذر الحصول على الموقع. يرجى التأكد من تشغيل خدمات الموقع.";
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          locationError.value =
            "انتهت مهلة طلب الموقع. يرجى المحاولة مرة أخرى.";
          console.error("Location request timed out.");
          break;
      }
    }
  );
};

const retryLocation = () => {
  locationError.value = null;
  isLocationDenied.value = false;
  getLocation();
};

watchEffect(async () => {
  if (!lat.value || !long.value) return;
  try {
    const { data } = await useAsyncData(
      "mosque",
      () =>
        useHttp().get<Mosque[]>(
          `/nearby-mosques?latitude=${lat.value}&longitude=${long.value}&radius=20000`
        ),
      { watch: [routeQuery] }
    );

    mosques.value = data.value?.slice(0, 15) || [];
  } catch (error) {
    console.log(error);
  } finally {
  }
});

onMounted(() => {
  getLocation();
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center font-semibold tracking-tight lg:text-2xl">
          <Icon name="lucide:building" class="me-2" />
          أقرب مسجد
        </h2>
      </div>
      <BackButton to="/" />
    </div>
    <Separator class="my-4" />
    <div v-if="locationError" class="text-center text-red-500">
      <p>{{ locationError }}</p>
      <button
        v-if="isLocationDenied"
        @click="retryLocation"
        class="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
      >
        حاول مرة أخرى
      </button>
    </div>

    <div v-else-if="mosques.length > 0" class="grid grid-cols-5 gap-6">
      <div v-for="(mosque, index) in mosques" :key="index">
        <MosqueItem
          v-if="mosque"
          :name="mosque.name"
          :distance="mosque.distance_km"
          :latitude="mosque.latitude"
          :longitude="mosque.longitude"
          :user-location="{ latitude: lat, longitude: long }"
        />
      </div>
    </div>

    <div v-else>
      <div
        class="flex items-center justify-center gap-4 w-full min-h-[50vh] text-lg"
      >
        <p>الرجاء الانتظار حتى يتم تحديد موقعك</p>
        <Icon name="lucide:loader-2" class="w-6 h-6 animate-spin" />
      </div>
    </div>
  </div>
</template>
