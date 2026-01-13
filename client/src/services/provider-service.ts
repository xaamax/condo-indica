import { get, post, put, type ApiResult } from '@/services/api/api'

import { URL_PROVIDERS } from '@/core/constants/urls-api'
import type {
  ProviderCompactDTO,
  CreateUpdateProviderDTO,
  ProviderDTO
} from '@/core/dto/provider-dto'

export function providerService() {
  const getProviders = async (): Promise<ApiResult<ProviderCompactDTO[]>> => {
    return get(URL_PROVIDERS)
  }

  const getProviderDetails = async (id: number): Promise<ApiResult<ProviderDTO>> => {
    return get(`${URL_PROVIDERS}${id}/`)
  }

  const submitProvider = async (payload: CreateUpdateProviderDTO, id?: number) => {
    const url = `${URL_PROVIDERS}${id}/`
    return !id
      ? post<CreateUpdateProviderDTO>(url, payload)
      : put<CreateUpdateProviderDTO>(url, payload)
  }

  return {
    getProviders,
    getProviderDetails,
    submitProvider
  }
}
