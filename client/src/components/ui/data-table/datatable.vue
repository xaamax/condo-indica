<template>
  <div class="space-y-2">
    <DataTableToolbar :table="table" :facetedFilters="facetedFilters">
      <template #actions>
            <slot name="toolbar-actions" />
      </template>
    </DataTableToolbar>
    <slot name="details" :table="table" />
    <div class="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.index">
              <TableRow
                :data-state="row.getIsSelected() ? 'selected' : undefined"
              >
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="expandedRow === row.index" class="bg-gray-100">
                <TableCell :colspan="columns.length" class="p-4">
                  <div class="text-sm text-gray-700">
                    <slot name="row-details" :rowDetails="row.original" />
                  </div>
                </TableCell>
              </TableRow>
            </template>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <DataTablePagination :table="table" />
  </div>
</template>

<script setup lang="ts" generic="TData, TValue">
import { ref, watch, computed, onMounted, type Ref } from 'vue'
import type { ColumnDef, SortingState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useVueTable,
} from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DataTablePagination from './datatable-pagination.vue'
import DataTableToolbar from './datatable-toolbar.vue'

const props = defineProps<{
  columns: (
    toggleExpandedRow?: (index: number) => void,
    toogleRefreshTable?: () => void,
    expandedRow?: Ref<number | null>
  ) => ColumnDef<TData, TValue>[]
  data: TData[]
  facetedFilters?: { field: string; label: string }[]
}>()

const sorting = ref<SortingState>([])
const globalFilter = ref<null | undefined>(null)
const expandedRow = ref<number | null>(null)
const columnVisibility = ref()

onMounted(() => {
  const visibilityMap = Object.fromEntries(
    columns.value.map((col) => {
      const id = col.id ?? col.accessorKey
      return [id, col.meta?.visibility !== false] // false se `visibility: false`, true por padrão
    })
  )
  columnVisibility.value = visibilityMap
})

const emit = defineEmits<{
  (e: 'update:sorting', payload: SortingState): void
  (e: 'update:globalFilter', value: string): void
  (e: 'update:selectedRow', selected: TData[]): void
  (e: 'update:table'): void
}>()

watch(
  () => sorting.value,
  (newSorting) => {
    if (newSorting) {
      sorting.value = newSorting
    }
  }
)

function globalFilterFn(row: any, _columnId: string, filterValue: string) {
  const searchValue = String(filterValue ?? '').toLowerCase()

  const getValue = (obj: any): any[] => {
    if (Array.isArray(obj)) {
      return obj.flatMap((item) => getValue(item))
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).flatMap((value) => getValue(value))
    }
    return [String(obj ?? '').toLowerCase()]
  }

  const flattenedValues = getValue(row.original)
  return flattenedValues.some((value) => value.includes(searchValue))
}

const toggleExpandedRow = (index: number) => {
  expandedRow.value = expandedRow.value === index ? null : index
}

const toogleRefreshTable = () => emit('update:table')

const columns = computed(() =>
  props.columns(toggleExpandedRow, toogleRefreshTable, expandedRow)
)

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return columns.value
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return globalFilter.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
  },
  onSortingChange: (updater) => {
    const newSorting =
      typeof updater === 'function' ? updater(sorting.value) : updater
    sorting.value = newSorting
    emit('update:sorting', newSorting)
  },
  onGlobalFilterChange: (updater) => {
    const newFilter =
      typeof updater === 'function' ? updater(globalFilter.value) : updater
    globalFilter.value = newFilter
    emit('update:globalFilter', newFilter)
  },
  onColumnVisibilityChange: (updater) => {
    columnVisibility.value =
      typeof updater === 'function' ? updater(columnVisibility.value) : updater
  },
  globalFilterFn,
  enableRowSelection: true,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
})

// força a atualização da tabela
watch(
  () => props.data,
  () => {
    table.reset()
  },
  { deep: true, immediate: true }
)

watch(
  () => table.getSelectedRowModel().rows.map((row) => row.original),
  (newSelected) => {
    emit('update:selectedRow', newSelected)
  },
  { deep: true }
)

// defineExpose({
//   clearRowSelection: () => {
//     table.resetRowSelection()
//   }
// })
</script>