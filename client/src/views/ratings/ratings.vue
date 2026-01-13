<template>
  <page-header title="Avaliações">
    <template #actions>
      <div class="flex">
        <Button
          variant="ghost_primary"
          prepend-icon="PlusCircle"
          size="sm"
          @click="isOpenDialogProfileDetails = true"
          >Incluir avaliação</Button
        >
        <Button variant="ghost_primary" prepend-icon="ListFilter" size="sm">Filtros</Button>
      </div>
      <BoxRating v-for="rating in ratings" :key="rating.id"
        :rating="rating"
      />
    </template>
  </page-header>

  <DialogRatingDetails
    :is-open="isOpenDialogProfileDetails"
    @update:isOpen="isOpenDialogProfileDetails = $event"
    @update:ratings="loadRatings"
  />
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { RatingDTO } from '@/core/dto/rating-dto'
import { ratingService } from '@/services/rating-service'
import { onMounted, ref } from 'vue'
import DialogRatingDetails from './components/dialog-rating-details.vue'
import BoxRating from '@/widgets/box-rating.vue'

const { getRatings } = ratingService()
const ratings = ref<RatingDTO[]>([])
const isOpenDialogProfileDetails = ref<boolean>(false)

const loadRatings = async () =>
  await getRatings().then((response) => (ratings.value = response.data))

onMounted(() => loadRatings())
</script>
