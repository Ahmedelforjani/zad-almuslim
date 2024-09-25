<script lang="ts" setup>
useHead({
  title: "زاد المسلم",
});
</script>

<template>
  <Body dir="rtl">
    <div class="flex flex-col h-screen">
      <Topbar class="flex-shrink-0" />
      <div class="grid flex-1 overflow-y-auto lg:grid-cols-5">
        <Sidebar />
        <ScrollArea class="col-span-5 lg:col-span-4 lg:border-l">
          <div class="px-4 pt-6 pb-12 lg:px-8">
            <slot />
          </div>
        </ScrollArea>
      </div>
      <ClientOnly>
        <PlayerBar />
      </ClientOnly>
    </div>
  </Body>
</template>
