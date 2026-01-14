<template>
  <PageHeader :title="`${id ? 'Editar' : 'Incluir'} Prestador de Serviço`" />
  <Card class="p-4">
    <CardContent class="h-full p-0">
      <div class="flex h-full flex-col lg:flex-row lg:space-x-12">
        <aside class="w-full lg:w-1/5 lg:sticky lg:top-0">
          <SidebarNav :items="tabs" :tab-active="tabActive" @update:tab="tabActive = $event" />
        </aside>

        <div class="flex-1 overflow-y-auto px-4 py-2">
          <TabsCustom :tabs="tabs" :hide-tab-list="true" v-model="tabActive">
            <template #register>
              <ContentSection
                title="Cadastro"
                desc="São as informações que serão exibidas para os moradores."
              >
                <ProviderForm
                  :default-values="defaultValues"
                  @update:provider="defaultValues = { ...defaultValues, ...$event }"
                />
              </ContentSection>
            </template>
            <template #address>
              <ContentSection title="Endreço" desc="Informações de endereço do prestador.">
                <AddressForm
                  :default-values="defaultValues"
                  @update:address="defaultValues = { ...defaultValues, ...$event }"
                />
              </ContentSection>
            </template>
          </TabsCustom>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ProviderDTO } from '@/core/dto/provider-dto'
import ContentSection from '@/components/layouts/content-section.vue'
import { Card, CardContent } from '@/components/ui/card'
import SidebarNav from '@/components/sidebar-nav.vue'
import TabsCustom from '@/components/tabs-custom.vue'
import ProviderForm from './components/provider-form.vue'
import { useRoute } from 'vue-router'
import AddressForm from '@/components/address/address-form.vue'
import { useProvider } from '@/core/composables/provider-composable'

const route = useRoute()
const id = computed(() => Number(route.params.id))
const tabActive = ref<string>('register')

const { loadProviderDetails, provider } = useProvider()

const tabs = computed(() => [
  { target: 'register', label: 'Cadastro', icon: 'User' },
  { target: 'address', label: 'Endereço', icon: 'MapPin' },
  { target: 'buildings', label: 'Condomínios', icon: 'Building' }
])

const defaultValues = ref<Partial<ProviderDTO>>({})

watch(provider, (values) => {
  if (!values) return false
  defaultValues.value = { ...values }
})

watch(
  id,
  (newId) => {
    if (newId) loadProviderDetails(newId)
  },
  { immediate: true }
)
</script>
