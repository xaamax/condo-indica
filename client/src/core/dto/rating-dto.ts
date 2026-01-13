import type { CondominiumResidentDTO } from "./condominium-dto"
import type { ProviderCategoryDTO, ProviderDTO } from "./provider-dto"

export interface RatingDTO {
    id: number
    stars: number
    comment?: string
    provider: ProviderCategoryDTO
    resident: CondominiumResidentDTO
}

export interface CreateUpdateRatingDTO {
    id?: number
    stars: number
    comment?: string
    provider: number
}