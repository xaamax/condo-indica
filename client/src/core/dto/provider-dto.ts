import { CategoryDTO } from './category-dto';


export interface ProviderCompactDTO {
  id: number
  category: string
  phone: string   
  description: string   
  address: string
}

export interface ProviderDTO {
  id: number
  description: string   
  phone: string   
  category: CategoryDTO
}