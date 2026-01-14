<template>
  <Card class="w-full">
    <CardContent class="space-y-4 pt-4">
      <div class="flex items-center justify-between">
        <div class="flex gap-1">
          <p class="text-base font-semibold">
            {{ rating.provider }}
          </p>
        </div>

        <span class="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">
          {{ rating.category }}
        </span>
      </div>
      <div class="flex gap-1">
        <Icon
          v-for="i in 5"
          :key="i"
          name="Star"
          class="h-5 w-5"
          :class="i <= rating.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
        />
      </div>
      <div v-if="rating.comment" class="text-sm text-muted-foreground italic">
        “{{ rating.comment }}”
      </div>
      <div class="border-t pt-3"></div>
      <div class="text-xs text-muted-foreground space-y-1">
        <p><strong>Condomínio:</strong> {{ rating.resident.condominium }}</p>
        <p>Bloco {{ rating.resident.block }} • Apto {{ rating.resident.apartment }}</p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import type { RatingListDTO } from '@/core/dto/rating-dto'

defineProps<{
  rating: RatingListDTO
}>()
</script>
