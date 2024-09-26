<script setup lang="ts" generic="T extends Record<string, any>">
defineProps<{
  data: T[];
}>();
</script>

<template>
  <Carousel :opts="{ direction: 'rtl', dragFree: true }">
    <CarouselContent class="py-4">
      <CarouselItem
        v-for="item in data"
        :key="item.id"
        class="select-none basis-[calc(100%/1.5)] sm:basis-[calc(100%/2.5)] md:basis-[calc(100%/3.5)] lg:basis-[calc(100%/4.5)] xl:basis-[calc(100%/5.5)]"
      >
        <slot name="item" :item="item" :data="data" />
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
