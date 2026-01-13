import type { AddressDTO } from "./address-dto"

export interface CondominiumDTO extends AddressDTO {
    name: string
}

export interface CondominiumResidentDTO {
  id: number
  condominium: string
  apartment: number
  block: string
}
