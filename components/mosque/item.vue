<script setup lang="ts">
defineProps<{
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
}>();
</script>
<template>
  <!-- <div>
    <Card>
      <CardContent class="p-3">
        <div class="flex justify-between">
          <span>{{ name }}</span>
          <div class="flex gap-6">
            <span v-if="distance > 5">{{ distance }} كم</span>
            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`"
              target="_blank"
              class="flex items-center gap-1"
            >
              <Icon name="lucide:map-pin" class="hover:text-primary" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  </div> -->

  <a
    :href="`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`"
    target="_blank"
    class="group"
  >
    <div
      class="space-y-3 overflow-hidden transition-all duration-300 border rounded-md group hover:shadow-lg hover:scale-105"
    >
      <div class="relative overflow-hidden">
        <img
          src="/images/mosque.webp"
          class="object-cover w-full h-40 transition-all"
        />
      </div>
      <div class="px-4 py-4 space-y-1 text-sm">
        <h3
          class="font-medium leading-none group-hover:text-primary transition-all duration-300"
        >
          {{ name }}
        </h3>
        <div class="flex justify-between items-center">
          <p class="text-xs text-muted-foreground">{{ distance }} كم</p>
          <Icon
            name="lucide:map-pin"
            class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </a>
</template>
