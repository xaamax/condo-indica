<script setup lang="ts">
import {
  ref,
  provide,
  onMounted,
  onUnmounted,
  computed,
  useAttrs
} from 'vue'

const props = defineProps<{
  fixed?: boolean
}>()

const attrs = useAttrs()

const layoutRef = ref<HTMLElement | null>(null)
const offset = ref(0)

const fixed = computed(() => props.fixed ?? false)

const handleScroll = () => {
  if (layoutRef.value) {
    offset.value = layoutRef.value.scrollTop
  }
}

provide('layout-context', {
  get offset() {
    return offset.value
  },
  get fixed() {
    return fixed.value
  }
})

onMounted(() => {
  if (layoutRef.value) {
    layoutRef.value.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (layoutRef.value) {
    layoutRef.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div
    ref="layoutRef"
    data-layout="layout"
    v-bind="attrs"
    :class="[
      'h-full px-1',
      fixed && 'flex flex-col'
    ]"
  >
    <slot />
  </div>
</template>
