<template>
  <div>
    <DataTableRowActions>
      <DropdownMenuItem @click="isOpenDialogDetails = true">
        <span>Editar</span>
        <DropdownMenuShortcut>
          <Icon name="Edit" :size="16" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="!text-red-500"
        @click="isOpenDialogDelete = true"
      >
        Excluir
        <DropdownMenuShortcut>
          <Icon name="Trash" :size="16" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DataTableRowActions>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import DataTableRowActions from '@/components/ui/data-table/datatable-row-actions.vue'
// import DialogInvestmentDetails from './dialog-investment-details.vue'
// import DialogInvestmentDelete from './dialog-investment-delete.vue'
import type { ProviderCompactDTO } from '@/core/dto/provider-dto'

defineProps<{
  row: ProviderCompactDTO
  toogleRefreshTable: () => void
}>()

const isOpenDialogDetails = ref(false)
const isOpenDialogDelete = ref(false)
</script>
