<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  cols?: string
}

const props = defineProps<Props>()

const gridClass = computed(() => {
  const cols = props.cols?.split(' ') ?? []

  const normalized = Array.from({ length: 4 }, (_, i) => cols[i] || '1')

  const [xs, sm, md, lg] = normalized

  return [
    'grid',    
    `grid-cols-${xs}`,
    `sm:grid-cols-${sm}`,
    `md:grid-cols-${md}`,
    `lg:grid-cols-${lg}`,
  ].join(' ')
})
</script>
