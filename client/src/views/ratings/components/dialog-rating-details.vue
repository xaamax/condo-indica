<template>
  <CommandDialog :open="isOpen" @update:open="emit('update:isOpen', false)">
    <div class="p-4">
      <h2 class="pb-4 text-lg font-semibold">Detalhes da Avaliação</h2>
      <RatingForm :defaultValues="rating" @save:rating="saveRating($event)" />
    </div>
  </CommandDialog>
</template>

<script setup lang="ts">
import type { RatingDTO } from '@/core/dto/rating-dto'
import CommandDialog from '@/components/ui/command/CommandDialog.vue'
import RatingForm from './rating-form.vue';

defineProps<{
  rating?: RatingDTO
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', open: boolean): void
  (e: 'update:ratings'): void
}>()

function saveRating(open: boolean) {
  emit('update:isOpen', open)
  emit('update:ratings')
}
</script>
