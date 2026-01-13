import { get, post, put, type ApiResult } from '@/services/api/api'

import { URL_RATINGS } from '@/core/constants/urls-api'
import type { CreateUpdateRatingDTO, RatingDTO } from '@/core/dto/rating-dto'

export function ratingService() {
  const getRatings = async (): Promise<ApiResult<RatingDTO[]>> => {
    return get(URL_RATINGS)
  }

  const getRatingDetails = async (id: number): Promise<ApiResult<RatingDTO>> => {
    return get(`${URL_RATINGS}${id}/`)
  }

  const submitRating = async (payload: CreateUpdateRatingDTO, id?: number) => {
    const url = id ? `${URL_RATINGS}${id}/` : URL_RATINGS
    return !id
      ? post<CreateUpdateRatingDTO>(url, payload)
      : put<CreateUpdateRatingDTO>(url, payload)
  }

  return {
    getRatings,
    getRatingDetails,
    submitRating
  }
}
