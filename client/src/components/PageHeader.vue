<template>
  <div class="mb-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <Button
          v-if="!hideRouteBack"
          variant="link"
          class="p-0"
          prepend-icon="ChevronLeft"
          @click="$router.back()"
        />
        <div class="flex flex-col">
          <h1 class="mb-2 text-3xl font-semibold">
            {{ title }}
          </h1>
          <p class="text-sm text-muted-foreground">{{ subtitle }}</p>
        </div>
      </div>
      <slot name="actions" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'

defineProps<{
  title: string
  subtitle?: string
  hideRouteBack?: boolean
}>()
</script>
