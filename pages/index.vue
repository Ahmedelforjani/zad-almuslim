<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import type { Broadcast, Lecture } from "~/types/model";

const [broadcasts, lectures] = await Promise.all([
  useHttp().$get<Broadcast[]>("/broadcasts"),
  useHttp().$get<Lecture[]>("/lectures"),
]);
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center text-2xl font-semibold tracking-tight">
          <Icon name="lucide:radio" class="me-2" />
          الإذاعات
        </h2>
        <p class="text-sm text-muted-foreground">
          استمع إلى ما هو جديد ومثير في عالم البودكاست
        </p>
      </div>
    </div>
    <Separator class="my-4" />
    <div
      class="relative grid lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6"
    >
      <BroadcastItem v-for="item in broadcasts" :key="item.id" :item="item" />
    </div>
    <div class="mt-6 space-y-1">
      <h2 class="text-2xl font-semibold tracking-tight">
        <Icon name="lucide:book" class="me-2" />
        الدروس
      </h2>
      <p class="text-sm text-muted-foreground">
        استمع إلى الدروس الجديدة والمفيدة
      </p>
    </div>
    <Separator class="my-4" />
    <div
      class="relative grid lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6"
    >
      <LectureItem v-for="item in lectures" :key="item.id" :item="item" />
    </div>
  </div>
</template>
