<script setup lang="ts">
import type { Broadcast, Lecture, Pagination, Reciter } from "~/types/model";

const [{ data: broadcasts }, { data: lectures }, { data: reciters }] =
  await Promise.all([
    useAsyncData(() => useHttp().get<Pagination<Broadcast>>("/broadcasts")),
    useAsyncData(() => useHttp().get<Pagination<Lecture>>("/lectures")),
    useAsyncData(() => useHttp().get<Pagination<Reciter>>("/reciters")),
  ]);
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-semibold tracking-tight">
          <Icon name="lucide:book-open-text" class="me-2" />
          قراءات القرآن الكريم
        </h2>
      </div>
      <NuxtLink
        to="/reciters"
        class="flex items-center text-sm transition-all hover:text-primary"
      >
        <span>عرض الكل</span>
        <Icon name="lucide:chevron-left" class="ms-2" />
      </NuxtLink>
    </div>
    <Separator class="mt-4" />
    <CarouselList v-if="reciters" :data="reciters.data">
      <template #item="{ item }">
        <ReciterItem :item="item" />
      </template>
    </CarouselList>

    <div class="flex items-center justify-between mt-6">
      <div class="space-y-1">
        <h2 class="flex items-center text-2xl font-semibold tracking-tight">
          <Icon name="lucide:radio" class="me-2" />
          الإذاعات
        </h2>
      </div>
      <NuxtLink
        to="/broadcasts"
        class="flex items-center text-sm transition-all hover:text-primary"
      >
        <span>عرض الكل</span>
        <Icon name="lucide:chevron-left" class="ms-2" />
      </NuxtLink>
    </div>
    <Separator class="mt-4" />
    <CarouselList v-if="broadcasts" :data="broadcasts.data">
      <template #item="{ item }">
        <BroadcastItem :item="item" class="h-full" />
      </template>
    </CarouselList>

    <div class="flex items-center justify-between mt-6">
      <div class="space-y-1">
        <h2 class="text-2xl font-semibold tracking-tight">
          <Icon name="lucide:book" class="me-2" />
          الدروس
        </h2>
      </div>
      <NuxtLink
        to="/lectures"
        class="flex items-center text-sm transition-all hover:text-primary"
      >
        <span>عرض الكل</span>
        <Icon name="lucide:chevron-left" class="ms-2" />
      </NuxtLink>
    </div>

    <Separator class="mt-4" />
    <CarouselList v-if="lectures" :data="lectures.data">
      <template #item="{ item }">
        <LectureItem :item="item" class="h-full" />
      </template>
    </CarouselList>
  </div>
</template>
