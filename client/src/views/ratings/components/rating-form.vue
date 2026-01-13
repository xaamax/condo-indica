<template>
  <FormData
    :schema="schema"
    :default-values="form"
    :on-submit="(form, addOther) => saveRating(form, addOther)"
  >
    <template #meta>
      <div class="space-y-2 mb-4">
        <FormField v-slot="{ componentField }" name="provider">
          <FormItem>
            <FormControl>
              <FormLabel>Prestador</FormLabel>
              <SelectCategories
                :model-value="componentField.modelValue"
                @update:model-value="componentField.onChange(Number($event))"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="stars">
          <FormItem>
            <FormLabel>Estrelas</FormLabel>
            <FormControl>
              <StarRating
                :model-value="componentField.modelValue"
                @update:model-value="componentField.onChange"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="comment">
          <FormItem>
            <FormLabel>Comentário</FormLabel>
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
import { schema, initialValues, type RatingFormValues } from '../data/rating-schema'
import type { RatingDTO } from '@/core/dto/rating-dto'
import FormData from '@/components/form-data.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import SelectCategories from '@/components/custom/select-categories.vue'
import { ratingService } from '@/services/rating-service'
import { useRouter } from 'vue-router'
import { toastSuccess } from '@/plugins/toaster'
import StarRating from '@/views/providers/components/star-rating.vue'

const router = useRouter()
const { submitRating } = ratingService()

const props = defineProps<{
  defaultValues?: Partial<RatingDTO>
}>()

const form = ref(props?.defaultValues || { ...initialValues })

function saveRating(payload: RatingFormValues, addOther: boolean) {
  const { id } = form.value
  submitRating(payload, id).then((response) => {
    if (response.success) {
      toastSuccess('Avaliação salva com sucesso!')
      addOther && !id ? (form.value = { ...initialValues }) : emit('save:rating', addOther)
    }
  })
}

const emit = defineEmits<{
  (e:'save:rating', addOther: boolean): void
}>()

watch(
  () => props.defaultValues,
  (values) => {
    if (values) form.value = values
  },
  { immediate: true }
)
</script>
