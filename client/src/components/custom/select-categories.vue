<template>
  <div class="space-y-2">
    <Select :model-value="selectedValue" @update:model-value="handleChange">
      <SelectTrigger>
        <SelectValue placeholder="--- Selecione ---" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem v-for="{ id, name } in options" :key="id" :value="String(id)">
          {{ name }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select'
import { categoryService } from '@/services/category-sevice'
import { onMounted, ref, watch } from 'vue'
import type { CategoryDTO } from '@/core/dto/category-dto'
const { getCategories } = categoryService()

const props = defineProps<{
  modelValue?: number | null
}>()

const options = ref<CategoryDTO[]>([])

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const selectedValue = ref<string | undefined>(undefined)

watch(
  () => props.modelValue,
  (val) => {
    selectedValue.value = val != undefined ? String(val) : undefined
  },
  { immediate: true }
)

function handleChange(val: string | undefined) {
  selectedValue.value = val
  emit('update:modelValue', val ? Number(val) : null)
}

async function loadCategories() {
  const response = await getCategories()
  options.value = response?.data
}

onMounted(() => {
  loadCategories()
})
</script>
