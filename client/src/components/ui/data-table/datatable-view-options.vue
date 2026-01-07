<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
        <MixerHorizontalIcon class="mr-2 h-4 w-4" />
        Exibir
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-[170px]">
      <DropdownMenuLabel>Colunas</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in filteredColumns"
        :key="column.id"
        class="capitalize"
        :checked="column.getIsVisible()"
        @update:checked="(value) => column.toggleVisibility(!!value)"
      >
        {{ getColumnTitle(column) }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MixerHorizontalIcon } from '@radix-icons/vue'
import type { ColumnDef, Table } from '@tanstack/vue-table'

import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuLabel from '@/components/ui/dropdown-menu/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
import DropdownMenuCheckboxItem from '@/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue'
import { Button } from '@/components/ui/button'

interface Props<TData> {
  table: Table<TData>
}

const props = defineProps<Props<any>>()

const filteredColumns = computed(() =>
  props.table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== 'undefined' && column.getCanHide()
    )
)

function getColumnTitle(column: any) {
  const meta = column.columnDef?.meta as
    | { toolbar_title?: string; class?: string }
    | undefined
  return meta?.toolbar_title || column.id
}
</script>
