import { h } from 'vue'
import type { Column, ColumnDef } from '@tanstack/vue-table'
import type { ProviderCompactDTO } from '@/core/dto/provider-dto'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import DataTableHeader from '@/components/ui/data-table/datatable-header.vue'
import DataTableProviderRowActions from './data-table-provider-row-actions.vue'

export const columns = (
  _?: (index: number) => void,
  toogleRefreshTable?: () => void
): ColumnDef<ProviderCompactDTO>[] => [
  {
    id: 'id',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (val) => table.toggleAllPageRowsSelected(!!val),
        ariaLabel: 'Select All',
        class: 'translate-y-0.5'
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (val) => row.toggleSelected(!!val),
        ariaLabel: 'Select row'
      })
  },
  {
    accessorKey: 'category',
    meta: { toolbar_title: 'Categoria' },
    filterFn: (row, columnId, filterValues) => {
      if (!Array.isArray(filterValues)) return true
      return filterValues.includes(row.getValue(columnId))
    },
    header: ({ column }) =>
      h(DataTableHeader, {
        column: column as Column<ProviderCompactDTO>,
        title: 'Categoria'
      }),
  },
  {
    accessorKey: 'phone',
    meta: { toolbar_title: 'Telefone' },
    filterFn: (row, columnId, filterValues) => {
      if (!Array.isArray(filterValues)) return true
      return filterValues.includes(row.getValue(columnId))
    },
    header: 'Telefone'
  },
  {
    accessorKey: 'address',
    meta: { toolbar_title: 'Endereço' },
    filterFn: (row, columnId, filterValues) => {
      if (!Array.isArray(filterValues)) return true
      return filterValues.includes(row.getValue(columnId))
    },
    header: 'Endereço'
  },
  {
    id: 'actions',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-2 items-center justify-end' }, [
        h(DataTableProviderRowActions, {
          row: row.original,
          toogleRefreshTable: toogleRefreshTable ?? (() => {})
        })
      ])
  }
]
