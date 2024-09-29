<script setup lang="ts">
import type { LectureWithItems } from "~/types/model";

const route = useRoute();
const id = computed(() => route.params.id);
const activeItem = ref<string | string[]>();

const { data: lecture } = await useAsyncData(
  "lectures",
  () => useHttp().$get<LectureWithItems>(`/lectures/${id.value}`),
  { watch: [id] }
);

if (!lecture.value) {
  navigateTo("/404");
}
</script>

<template>
  <main v-if="lecture">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="flex items-center text-2xl font-semibold tracking-tight">
          <Icon name="lucide:book" class="me-2" />
          {{ lecture.name }}
        </h2>
      </div>
      <BackButton to="/lectures" />
    </div>

    <div class="max-w-2xl mx-auto mt-6 space-y-6">
      <img
        :src="lecture.image"
        :alt="lecture.name"
        class="object-contain max-w-full mx-auto rounded-md h-80"
      />

      <div class="text-lg text-justify">
        <p>
          {{ lecture.description }}
        </p>
      </div>

      <Separator />

      <div>
        <p class="text-muted-foreground">{{ lecture.items.length }} حلقات</p>

        <Accordion
          type="single"
          class="w-full"
          collapsible
          v-model="activeItem"
        >
          <AccordionItem
            v-for="item in lecture.items"
            :key="item.id"
            :value="`item-${item.id}`"
          >
            <AccordionTrigger class="hover:no-underline">
              <div class="flex gap-2">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="object-contain w-12 h-12 rounded-md"
                />
                {{ item.name }}
              </div>
              <template #icon>
                <Button size="icon" class="rounded-full">
                  <Icon
                    :name="
                      activeItem === `item-${item.id}`
                        ? 'lucide:pause'
                        : 'lucide:play'
                    "
                    mode="svg"
                    class="[&>path]:fill-current [&>g]:fill-current h-5 w-5"
                  />
                </Button>
              </template>
            </AccordionTrigger>
            <AccordionContent>
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameborder="no"
                class="rounded-md"
                allow="autoplay"
                :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                  item.url
                )}&color=%2322c55e&auto_play=true&single_active=true&sharing=false&buying=false&show_artwork=false&show_user=false`"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </main>
</template>
