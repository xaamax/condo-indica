import type { AddressDTO } from './address-dto'

interface ProviderBaseDTO extends AddressDTO {
  name: string
  description: string
  phone: string
  category: number
}

export interface ProviderCompactDTO extends ProviderBaseDTO {
  id: number
  reputation: number
}

export interface ProviderDTO extends ProviderBaseDTO {
  id: number
}

export interface CreateUpdateProviderDTO extends ProviderBaseDTO {
  id?: number
}
