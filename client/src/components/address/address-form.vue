<template>
  <FormData
    :schema="schema"
    :default-values="form"
    :on-submit="() => {}"
    @update:values="$event = emit('update:address', { ...$event })"
    :hide-submit="true"
  >
    <template #meta>
      <div class="space-y-2 mb-4">
        <Grid cols="12 12 2 2" class="gap-4">
          <FormField v-slot="{ componentField }" name="cep">
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </Grid>
        <FormField v-slot="{ componentField }" name="street">
          <FormItem>
            <FormLabel>Endereço</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Grid cols="12 12 2 2" class="gap-4">
          <FormField v-slot="{ componentField }" name="number">
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="neighborhood">
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </Grid>
        <Grid cols="12 12 2 2" class="gap-4">
          <FormField v-slot="{ componentField }" name="city">
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="state">
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </Grid>
      </div>
    </template>
  </FormData>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Grid from '@/components/layouts/grid.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { initialValues, schema } from './data/address-schema'
import type { AddressDTO } from '@/core/dto/address-dto'
import FormData from '../form-data.vue'

const props = defineProps<{
  defaultValues?: Partial<AddressDTO>
}>()

const form = ref(props?.defaultValues || { ...initialValues })

const emit = defineEmits<{
  (e: 'update:address', value: AddressDTO): void
}>()
</script>
