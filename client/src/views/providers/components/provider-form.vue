<template>
  <FormData
    :schema="schema"
    :default-values="form"
    :on-submit="(form, addOther) => saveProvider(form, addOther)"
    @update:values="emit('update:provider', $event)"
  >
    <template #meta>
      <div class="space-y-2 mb-4">
        <Grid cols="12 12 2 2" class="gap-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </Grid>
        <FormField v-slot="{ componentField }" name="category">
          <FormItem>
            <FormControl>
              <FormLabel>Categoria</FormLabel>
              <SelectCategories
                :model-value="componentField.modelValue"
                @update:model-value="componentField.onChange(Number($event))"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea v-bind="componentField" style="resize: none" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </template>
  </FormData>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ProviderDTO } from '@/core/dto/provider-dto'
import { schema, initialValues, type ProviderFormValues } from '../data/provider-schema'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'vue-router'
import { toastSuccess } from '@/plugins/toaster'
import { useProvider } from '@/core/composables/provider-composable'
import Grid from '@/components/layouts/grid.vue'
import FormData from '@/components/form-data.vue'
import SelectCategories from '@/components/custom/select-categories.vue'

const router = useRouter()
const { submitProvider } = useProvider()

const props = defineProps<{
  defaultValues?: Partial<ProviderDTO>
}>()

const form = ref<ProviderFormValues>(initialValues)

function saveProvider(payload: ProviderFormValues, addOther: boolean) {
  const id = props.defaultValues?.id
  submitProvider(payload).then((response) => {
    if (response.success) {
      toastSuccess('Prestador salvo com sucesso!')
      addOther && !id ? (form.value = { ...initialValues }) : router.push('/prestadores_servicos')
    }
  })
}

const emit = defineEmits<{
  (e: 'update:provider', values: Partial<ProviderDTO>): void
}>()

watch(
  () => props.defaultValues,
  (values) => {
    if (!values) return

    form.value = {
      ...initialValues,
      ...values
    }
  },
  { immediate: true }
)
</script>
