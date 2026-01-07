<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: true,
  defaultValue: props.defaultValue,
})

const showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="relative">
    <Icon
      :name="showPassword ? 'Eye' : 'EyeOff'"
      class="absolute left-4 top-1/2 h-4 -translate-y-1/2 text-slate-500"
      @click="togglePassword"
      style="cursor: pointer"
    />
    <input
      :type="showPassword ? 'text' : 'password'"
      :class="[
        cn(
          'left-placeholder flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-12 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        ),
      ]"
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
