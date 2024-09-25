<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    class="rounded-full"
    @click="router.go(-1)"
  >
    <Icon name="lucide:chevron-left" class="w-6 h-6" />
  </Button>
</template>
