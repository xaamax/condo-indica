export interface AddressDTO {
  cep: string
  street: string
  number?: number
  neighborhood: string
  city: string
  state: string
  address_full?: string
}