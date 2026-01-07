<script setup lang="ts">
import { DataTable } from '@/components/ui/data-table'
import { ProviderCompactDTO } from '@/core/dto/provider-dto'
import { providerService } from '@/services/provider-sevice'
import { onMounted, ref } from 'vue'
import { columns } from './components/provider-columns'
import { Button } from '@/components/ui/button'

const { getProviders } = providerService()
const providers = ref<ProviderCompactDTO[]>([])

const loadProviders = async () => {
  await getProviders().then((response) => {
    providers.value = response.data
  })
}

const displayLabels = [
  { field: 'category', label: 'Categoria' },
  { field: 'phone', label: 'Telefone' },
  { field: 'address', label: 'Endereço' },
]

onMounted(() => loadProviders())
</script>
  
<template>
    <page-header title="Prestadores" />
    <data-table
      :columns="columns"
      :facetedFilters="displayLabels"
      :data="providers"
      @update:table="loadProviders"
    >
      <template #toolbar-actions>
        <Button size="sm" class="h-8" >
          <Icon name="PlusCircle" class="mr-1 h-4 w-4" />
          Incluir prestador
        </Button>
      </template>
    </data-table>
</template>
