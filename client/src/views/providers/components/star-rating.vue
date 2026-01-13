<template>
  <div class="flex gap-1 items-center">
    <Icon
      v-for="i in max"
      :key="i"
      name="Star"
      class="h-6 w-6 cursor-pointer transition-colors"
      :class="[
        i <= value
          ? 'text-yellow-400 fill-yellow-400'
          : 'text-gray-300'
      ]"
      @click="update(i)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: number
    max?: number
  }>(),
  {
    modelValue: 1,
    max: 5
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const value = computed(() => {
  const v = Number(props.modelValue)
  return v >= 1 && v <= props.max ? v : 1
})

function update(v: number) {
  emit('update:modelValue', v)
}
</script>
