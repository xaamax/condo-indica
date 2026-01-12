import { get, type ApiResult } from '@/services/api/api'

import { URL_CATEGORIES } from '@/core/constants/urls-api'
import type { CategoryDTO } from '@/core/dto/category-dto'

export function categoryService() {  
    const getCategories = async(): Promise<ApiResult<CategoryDTO[]>> => {
    return get(URL_CATEGORIES)
  }

  return {
    getCategories
  }
}