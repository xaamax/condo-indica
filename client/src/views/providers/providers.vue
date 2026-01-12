<script setup lang="ts">
import { DataTable } from '@/components/ui/data-table'
import type { ProviderCompactDTO } from '@/core/dto/provider-dto'
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
  { field: 'name', label: 'Nome' },
  { field: 'category', label: 'Categoria' },
  { field: 'reputation', label: 'Reputação' },
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
        <Button size="sm" class="h-8" @click="$router.push({ name: 'prestadores_include' })">
          <Icon name="PlusCircle" class="mr-1 h-4 w-4" />
          Incluir prestador
        </Button>
      </template>
    </data-table>
</template>
