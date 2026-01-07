<template>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex flex-wrap gap-2">
      <Input
        class="h-8 w-[220px]"
        placeholder="Pesquisar..."
        :model-value="table.getState().globalFilter ?? ''"
        @update:model-value="(value) => table.setGlobalFilter(value)"
      />
    </div>
    <div class="flex gap-2">
      <slot name="actions" />
      <Button
        v-show="facetedFilters?.length"
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
        @click="showFilters = !showFilters"
        >
        <Icon :name="showFilters ? 'X' : 'ListFilter'" class="mr-2 h-4 w-4" />
        {{ showFilters ? 'Ocultar filtros' : 'Filtros' }}
      </Button>
      <DataTableViewOptions :table="table" />
    </div>
    <div class="flex w-full gap-2">
      <template v-if="showFilters">
        <DataTableFacetedFilter
          v-for="({ field, label, displayLabels }, index) in facetedFilters"
          :key="index"
          :column="table.getColumn(field)"
          :title="label"
          :options="getOptions(field)"
          :displayLabels="displayLabels"
        />
        <Button
          v-if="isFiltered"
          variant="ghost"
          class="h-8 px-2 lg:px-3"
          @click="table.resetColumnFilters"
        >
          Limpar
          <Cross2Icon class="ml-2 h-4 w-4" />
        </Button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" generic="TData">
import { computed, ref } from 'vue'
import { Cross2Icon } from '@radix-icons/vue'
import { Table } from '@tanstack/vue-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DataTableViewOptions from './datatable-view-options.vue'
import DataTableFacetedFilter from './datatable-faceted-filter.vue'

const props = defineProps<{
  table: Table<TData>
  facetedFilters?: {
    field: string
    label: string
    displayLabels?: {
      value: string
      label: string
    }[]
  }[]
}>()

const showFilters = ref<boolean>(false)

const isFiltered = computed(
  () => props.table.getState().columnFilters.length > 0
)

const getOptions = (field: string) => {
  const column = props.table.getColumn(field)
  if (!column) return []
  const entries = column.getFacetedUniqueValues()?.entries() ?? []
  return Array.from(entries)
    .filter(([value]) => value !== null)
    .map(([value]) => ({
      label: String(value),
      value: String(value),
    }))
}
</script>
