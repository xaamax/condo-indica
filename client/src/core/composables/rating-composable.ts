import { ref } from 'vue'
import { ratingService } from '@/services/rating-service'
import type { RatingDTO } from '../dto/rating-dto'

export const useRating = () => {
  const { getRatings, getRatingDetails, submitRating } = ratingService()

  const ratings = ref<RatingDTO[]>([])
  const rating = ref<RatingDTO>()

  const loadRatings = () => getRatings().then((response) => (ratings.value = response.data))
  
  const loadRatingDetails = (id: number) => getRatingDetails(id).then((response) => (rating.value = response.data))

  return {
    loadRatings,
    loadRatingDetails,
    submitRating,
    ratings,
    rating,
  }
}
