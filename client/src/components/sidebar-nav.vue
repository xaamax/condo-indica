<template>
  <div>
    <div class="p-1 md:hidden">
      <Select @update:modelValue="(val) => emit('update:tab', val)">
        <SelectTrigger class="sm:w-48 h-12">
          <SelectValue placeholder="Cadastro" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="item in items"
            :key="item.target"
            :value="item.target"
          >
            <div class="flex gap-x-4 px-2 py-1">
              <span class="scale-125">
                <component :is="item.icon" />
              </span>
              <span class="text-md">{{ item.label }}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="hidden w-full overflow-x-auto px-1 py-2 md:block">
      <nav
        :class="
          cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', props.class)
        "
      >
        <Button
          v-for="item in items"
          variant="link"
          :key="item.target"
          @click="emit('update:tab', item.target)"
          :class="
            cn(
              'justify-start',
              props.tabActive === item.target
                ? 'bg-muted'
                : ''
            )
          "
        >
          <span class="mr-2">
            <Icon :name="item.icon" />
          </span>
          {{ item.label }}
        </Button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Button } from './ui/button';

const props = defineProps<{
  tabActive: string  
  items: { target: string; label: string; icon?: any }[]
  class?: string
}>()

const route = useRoute()

const emit = defineEmits<{
    (e: 'update:tab', tab: string):void
}>()

watch(
  () => route.path,
  (newPath) => {
    val.value = newPath
  }
)
</script>