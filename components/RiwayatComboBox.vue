<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ref, computed } from "vue";
import type { Riwayat } from "~/types/model";

const props = defineProps<{
  riwayats: Riwayat[];
}>();

const emit = defineEmits<{
  (event: "update:selected", id: number): void;
}>();

const open = ref(false);
const selectedRiwaya = ref<Riwayat | null>(null);

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const selectRiwaya = (riwaya: Riwayat) => {
  selectedRiwaya.value = riwaya;
  open.value = false;
  emit("update:selected", riwaya.id);
};

onMounted(() => {
  if (props.riwayats.length > 0) {
    selectedRiwaya.value = props.riwayats[0];
  }
});
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        {{ selectedRiwaya?.name_ar || "اختر الرواية" }}
        <Icon
          name="lucide:chevron-down"
          class="h-4 w-4"
          :class="open ? 'rotate-180' : 'rotate-0'"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 lg:w-[675px] w-[92vw]">
      <Command>
        <CommandEmpty>لم يتم العثور على الرواية</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="riwaya in riwayats"
              :key="riwaya.id"
              :value="riwaya.id"
              @select="() => selectRiwaya(riwaya)"
            >
              <div class="flex items-center justify-between w-full">
                <span>
                  {{ riwaya.name_ar }}
                </span>
                <Icon
                  name="lucide:check"
                  :class="
                    cn(
                      'h-4 w-4',
                      selectedRiwaya?.id === riwaya.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )
                  "
                />
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
