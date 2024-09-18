<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import type { Category } from "~/types/model";

const categories = await useHttp().$get<Category[]>("/categories");
</script>

<template>
  <div :class="cn('pb-12 border-e hidden lg:block', $attrs.class ?? '')">
    <div class="py-4 space-y-4">
      <div class="px-3 py-2">
        <h2 class="px-4 mb-2 text-lg font-semibold tracking-tight">الفئات</h2>
        <div class="space-y-1">
          <Button
            v-for="category in categories"
            :key="category.id"
            variant="ghost"
            class="items-center justify-start w-full"
          >
            {{ category.name }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
