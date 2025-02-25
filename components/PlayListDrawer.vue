<script setup lang="ts">
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const { track, playList } = storeToRefs(usePlayerStore());
</script>

<template>
  <Drawer v-if="track">
    <DrawerTrigger as-child class="cursor-pointer px-4 py-2 hover:bg-muted rounded-sm w-full">
      <div class="flex flex-col">
        <p class="text-sm font-semibold">
          {{ track.title }}
        </p>
        <span class="text-sm text-muted-foreground">
          {{ track.subtitle }}
        </span>
      </div>
    </DrawerTrigger>
    <DrawerContent class="flex flex-col h-2/3">
      <ScrollArea class="flex-1 lg:border-l h-1/2">
        <DrawerHeader class="flex justify-center items-center flex-col pt-6">
          <DrawerTitle class="lg:text-2xl" v-if="track.subtitle">
            {{ track.subtitle }}
          </DrawerTitle>
          <DrawerDescription class="lg:text-xl">{{
            track.title
          }}</DrawerDescription>
        </DrawerHeader>
        <div class="px-4 pb-12 lg:px-8">
          <div class="max-w-2xl mx-auto mt-6 space-y-6">
            <AudioController />
            <!-- <VolumeController /> -->
            <div class="flex flex-col justify-center mt-6 divide-y-2 divide-muted/50">
              <PlaylistItem v-for="(item, index) in playList" :key="index" :order="index + 1" :track-id="item.order"
                :link="item.server_url" :subtitle="item.subtitle" :type="track.type" :title="item.title" />
            </div>
          </div>
        </div>
      </ScrollArea>
    </DrawerContent>
  </Drawer>
</template>
