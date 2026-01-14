import type { AddressDTO } from './address-dto'
import type { CategoryDTO } from './category-dto'

interface ProviderBaseDTO extends AddressDTO {
  name: string
  description: string
  phone: string
  category: number
}

export interface ProviderDTO extends ProviderBaseDTO {
  id: number
  reputation: number
  address: string
}

export interface CreateUpdateProviderDTO extends ProviderBaseDTO {
  id?: number
}

export interface ProviderCategoryDTO {
  id: number
  name: string
  category: CategoryDTO
}
