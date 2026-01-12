<template>
  <form class="p-2">
    <template v-if="displayCard">
      <Card>
        <CardContent>
          <slot name="meta" :form="form" />
        </CardContent>
      </Card>
    </template>
    <template v-else>
      <slot name="meta" :form="form" />
    </template>

    <div v-if="!hideSubmit" class="flex py-4 justify-end gap-2">
      <Button
        v-if="!defaultValues?.id && !hideAddOther"
        type="button"
        variant="outline_primary"
        :disabled="!meta.valid"
        @click="submit(true)"
      >
        Salvar e incluir outro
      </Button>

      <Button type="button" :disabled="!meta.valid" @click="submit(false)"> Salvar </Button>
    </div>
  </form>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { useForm, type TypedSchema, type PartialDeep } from 'vee-validate'
import { onMounted, watch } from 'vue'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const props = defineProps<{
  defaultValues?: PartialDeep<T, {}>
  schema: TypedSchema<T>
  onSubmit: (values: T, addOther: boolean) => void
  displayCard?: boolean
  hideAddOther?: boolean
  hideSubmit?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:values', values: any): void
}>()

const submit = (addOther: boolean) => {
  handleSubmit((values) => {
    props.onSubmit(values, addOther)
  })()
}

const form = useForm<T>({
  validationSchema: props.schema,
  initialValues: props.defaultValues
})

watch(
  () => form.values,
  (newVals) => {
    emit('update:values', newVals)
  },
  { deep: true }
)

const { meta, handleSubmit } = form

watch(
  () => props.defaultValues,
  (values) => {
    if (values) form.setValues(values)
  },
  { immediate: true }
)

onMounted(() => form.setValues(props.defaultValues))
</script>
