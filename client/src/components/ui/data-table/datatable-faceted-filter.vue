<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed hidden lg:flex">
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <template v-if="selectedValues.size">
              <Badge variant="secondary" class="rounded-sm px-1 font-normal">
                {{ selectedValues.size }}
              </Badge>
            </template>
            <template v-else>
              <Badge
                v-for="option in selectedOptions"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                <span v-if="displayLabels">{{
                  displayLabels[option.label]
                }}</span>
                <span v-else>{{ option.label }}</span>
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>Nenhum registro.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="toggleOption(option.value)"
            >
              <div
                :class="[
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  selectedValues.has(option.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                ]"
                style="cursor: pointer"
              >
                <CheckIcon class="h-4 w-4" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="mr-2 h-4 w-4 text-muted-foreground"
              />
              <span>
                {{ displayLabels ? displayLabels[option.label] : option.label }}
              </span>
              <span
                class="ml-auto flex items-center gap-1 font-mono text-xs text-muted-foreground"
              >
                {{
                  displayLabels
                    ? facets.get(Number(option.value))
                    : facets.get(option.value)
                }}
              </span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator v-if="selectedValues.size > 0" />
          <CommandGroup v-if="selectedValues.size > 0">
            <CommandItem
              value="clear"
              @select="clearFilters"
              class="justify-center text-center"
            >
              Limpar Filtros
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts" generic="TData">
import { ref, computed, watch } from 'vue'
import { CheckIcon, PlusCircledIcon } from '@radix-icons/vue'

import Popover from '@/components/ui/popover/Popover.vue'
import PopoverTrigger from '@/components/ui/popover/PopoverTrigger.vue'
import PopoverContent from '@/components/ui/popover/PopoverContent.vue'
import Button from '@/components/ui/button/Button.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import Separator from '@/components/ui/separator/Separator.vue'

import Command from '@/components/ui/command/Command.vue'
import CommandInput from '@/components/ui/command/CommandInput.vue'
import CommandList from '@/components/ui/command/CommandList.vue'
import CommandEmpty from '@/components/ui/command/CommandEmpty.vue'
import CommandGroup from '@/components/ui/command/CommandGroup.vue'
import CommandItem from '@/components/ui/command/CommandItem.vue'
import CommandSeparator from '@/components/ui/command/CommandSeparator.vue'

const props = defineProps<{
  column?: any
  title?: string
  options: {
    icon: string
    label: string
    value: string
  }[]
  displayLabels?: any
}>()

const selectedValues = ref(new Set(props.column?.getFilterValue() as string[]))
const facets = computed(() => props.column?.getFacetedUniqueValues())

watch(
  () => props.column?.getFilterValue?.(),
  (newFilterValue) => {
    selectedValues.value = new Set(newFilterValue || [])
  }
)

const toggleOption = (value: string) => {
  if (selectedValues.value.has(value)) {
    selectedValues.value.delete(value)
  } else {
    selectedValues.value.add(value)
  }
  const newValues = Array.from(selectedValues.value)
  props.column?.setFilterValue(newValues.length ? newValues : undefined)
}

const selectedOptions = computed(() =>
  props.options.filter((option) => selectedValues.value.has(option.value))
)

const clearFilters = () => {
  selectedValues.value = new Set()
  updateFilter()
}

const updateFilter = () => {
  const filterValues = Array.from(selectedValues.value)
  if (props.column) {
    props.column.setFilterValue(filterValues.length ? filterValues : undefined)
  }
}
</script>
