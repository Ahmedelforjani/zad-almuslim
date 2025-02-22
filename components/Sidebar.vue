<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const themeStore = useThemeStore();
const route = useRoute();

const items = [
  { name: "الرئيسية", icon: "lucide:home", to: "/" },
  {
    name: "قراء القرآن الكريم",
    icon: "lucide:book-open-text",
    to: "/reciters",
  },
  { name: "الإذاعات", icon: "lucide:radio", to: "/broadcasts" },
  { name: "الدروس", icon: "lucide:book", to: "/lectures" },
  {
    name: "حصن المسلم",
    icon: "lucide:book-marked",
    to: "/hisnmuslim",
  },
  {
    name: "أقرب مسجد",
    icon: "lucide:building",
    to: "/nearest-mosque",
  },
];

watch(
  () => route.path,
  () => {
    themeStore.isSidebarOpen = false;
  }
);
</script>

<template>
  <div
    v-if="themeStore.isSidebarOpen"
    class="fixed top-0 left-0 z-20 w-full h-full bg-black/50 lg:hidden"
    @click="themeStore.isSidebarOpen = false"
  />

  <div
    :class="
      cn(
        'fixed overflow-y-auto lg:relative z-30 top-0 right-0 flex flex-col h-screen lg:h-full lg:translate-x-0 flex-shrink-0 w-[312px] bg-background transition-transform duration-300 pb-12 border-e lg:block',
        $attrs.class ?? '',
        {
          'translate-x-[312px]': !themeStore.isSidebarOpen,
        }
      )
    "
  >
    <div class="py-4 space-y-4">
      <div class="px-3 py-2">
        <div class="space-y-1">
          <Button
            v-for="(item, key) in items"
            :key="key"
            variant="ghost"
            :class="
              cn('items-center justify-start w-full', {
                'bg-accent text-accent-foreground': route.path === item.to,
              })
            "
            as-child
          >
            <NuxtLink :to="item.to">
              <Icon :name="item.icon" class="me-2" />
              {{ item.name }}
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
