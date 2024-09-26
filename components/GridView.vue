<script setup lang="ts" generic="T extends Record<string, any>">
import type { PaginationMeta } from "~/types/model";

defineProps<{
  data: T[];
  pagination?: PaginationMeta;
  isLoading?: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div class="relative">
    <div
      v-if="isLoading"
      class="absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-background/80"
    >
      <Icon class="w-10 h-10 animate-spin" name="lucide:loader-2" />
    </div>
    <div
      class="relative grid lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6"
    >
      <slot
        v-for="(item, key) in data"
        :key="key"
        name="item"
        :value="item"
        :data="data"
      />
    </div>
    <div class="flex items-center justify-center mt-6">
      <Pagination
        v-if="pagination && pagination.last_page > 1"
        v-slot="{ page }"
        :total="pagination.total"
        :sibling-count="2"
        :page="pagination.current"
        :items-per-page="pagination.per_page"
        :default-page="1"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <NuxtLink
            v-if="page > 1"
            :to="{ query: { ...route.query, page: 1 } }"
          >
            <PaginationFirst>
              <Icon name="lucide:chevrons-right" />
            </PaginationFirst>
          </NuxtLink>
          <!-- <NuxtLink
            v-if="page > 1"
            :to="{ query: { ...route.query, page: pagination.current - 1 } }"
          > 
            <PaginationPrev>
              <Icon name="lucide:chevron-right" />
            </PaginationPrev>
          </NuxtLink> -->

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="
                  item.value === pagination?.current ? 'default' : 'outline'
                "
                as-child
              >
                <NuxtLink :to="{ query: { ...route.query, page: item.value } }">
                  {{ item.value }}
                </NuxtLink>
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <!-- <NuxtLink
            v-if="page < pagination.last_page"
            :to="{ query: { ...route.query, page: pagination.current + 1 } }"
          >
            <PaginationLast>
              <Icon name="lucide:chevron-left" />
            </PaginationLast>
          </NuxtLink> -->
          <NuxtLink
            v-if="page < pagination.last_page"
            :to="{ query: { ...route.query, page: pagination.last_page } }"
          >
            <PaginationLast>
              <Icon name="lucide:chevrons-left" />
            </PaginationLast>
          </NuxtLink>
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
