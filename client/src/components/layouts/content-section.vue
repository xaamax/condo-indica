<template>
  <div class="flex flex-1 flex-col">
    <div class="flex-none">
      <h3 class="text-lg font-medium">{{ title }}</h3>
      <p class="text-sm text-muted-foreground">{{ desc }}</p>
    </div>
    <Separator class="my-4 flex-none" />
    <div class="faded-bottom flex-1 overflow-y-auto scroll-smooth md:pb-16">
      <div class="lg:max-w-xl">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'; 

defineProps<{
  title: string
  desc: string
}>()
</script>
