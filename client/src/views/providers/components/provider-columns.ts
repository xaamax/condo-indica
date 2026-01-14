import { h, type Ref } from 'vue'
import type { Column, ColumnDef } from '@tanstack/vue-table'
import type { ProviderDTO } from '@/core/dto/provider-dto'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import DataTableHeader from '@/components/ui/data-table/datatable-header.vue'
import DataTableProviderRowActions from './datatable-provider-row-actions.vue'
import Icon from '@/components/ui/Icon.vue'

export const columns = (
  toggleExpandedRow?: (index: number) => void,
  toogleRefreshTable?: () => void,
  expandedRow?: Ref<number | null>
): ColumnDef<ProviderDTO>[] => [
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
    accessorKey: 'name',
    meta: { toolbar_title: 'Nome' },
    filterFn: (row, columnId, filterValues) => {
      if (!Array.isArray(filterValues)) return true
      return filterValues.includes(row.getValue(columnId))
    },
    header: ({ column }) =>
      h(DataTableHeader, {
        column: column as Column<ProviderDTO>,
        title: 'Nome'
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
        column: column as Column<ProviderDTO>,
        title: 'Categoria'
      })
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
    accessorKey: 'reputation',
    meta: { toolbar_title: 'Reputação' },
    header: ({ column }) =>
      h(DataTableHeader, {
        column: column as Column<ProviderDTO>,
        title: 'Reputação'
      }),
    cell: ({ row }) => {
      const reputation = Number(row.original.reputation ?? 0)

      return h('div', { class: 'flex gap-2 items-center' }, [
        h(
          'div',
          { class: 'flex gap-1' },
          Array.from({ length: 5 }).map((_, i) =>
            h(Icon, {
              key: i,
              name: 'Star',
              class: [
                'h-4 w-4',
                i < reputation ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              ]
            })
          )
        )
      ])
    }
  },
  {
    id: 'actions',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-2 items-center justify-end' }, [
        h(
          'button',
          {
            class: 'text-gray-500 hover:text-gray-700',
            ...(toggleExpandedRow && {
              onClick: () => toggleExpandedRow(row.index)
            })
          },
          [
            h(Icon, {
              name: expandedRow?.value === row.index ? 'ChevronUp' : 'ChevronDown'
            })
          ]
        ),
        h('div', { class: 'flex gap-2 items-center justify-end' }, [
          h(DataTableProviderRowActions, {
            row: row.original,
            toogleRefreshTable: toogleRefreshTable ?? (() => {})
          })
        ])
      ])
  }
]
