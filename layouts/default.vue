<script lang="ts" setup>
import { ConfigProvider } from "radix-vue";

useHead({
  title: "زاد المسلم",
});
</script>

<template>
  <Body dir="rtl">
    <ConfigProvider dir="rtl">
      <div class="flex flex-col h-dvh">
        <Topbar class="flex-shrink-0" />
        <div class="flex flex-1 overflow-y-auto">
          <Sidebar />
          <ScrollArea class="flex-1 lg:border-l">
            <div class="px-4 pt-6 pb-12 lg:px-8">
              <slot />
            </div>
          </ScrollArea>
        </div>
        <ClientOnly>
          <PlayerBar />
        </ClientOnly>
      </div>
    </ConfigProvider>
  </Body>
</template>
