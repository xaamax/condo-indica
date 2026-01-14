<template>
  <div>
    <DataTableRowActions>
      <DropdownMenuItem
        @click="$router.push(`/prestadores_servicos/${row.id}`)"
        :disabled="!store.canUpdate($route.path)"
      >
        <span>Editar</span>
        <DropdownMenuShortcut>
          <Icon name="Edit" :size="16" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="!text-red-500"
        :disabled="!store.canDelete($route.path)"
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
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'
import DataTableRowActions from '@/components/ui/data-table/datatable-row-actions.vue'
// import DialogInvestmentDetails from './dialog-investment-details.vue'
// import DialogInvestmentDelete from './dialog-investment-delete.vue'
import type { ProviderDTO } from '@/core/dto/provider-dto'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

defineProps<{
  row: ProviderDTO
  toogleRefreshTable: () => void
}>()

const isOpenDialogDetails = ref(false)
const isOpenDialogDelete = ref(false)
</script>
