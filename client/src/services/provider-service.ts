import { get, post, put, type ApiResult } from '@/services/api/api'

import { URL_PROVIDERS } from '@/core/constants/urls-api'
import type {
  CreateUpdateProviderDTO,
  ProviderDTO
} from '@/core/dto/provider-dto'

export function providerService() {
  const getProviders = async (): Promise<ApiResult<ProviderDTO[]>> => {
    return get(URL_PROVIDERS)
  }

  const getProviderDetails = async (id: number): Promise<ApiResult<ProviderDTO>> => {
    return get(`${URL_PROVIDERS}${id}/`)
  }

  const submitProvider = async (payload: CreateUpdateProviderDTO) => {
    const url = payload.id ? `${URL_PROVIDERS}${payload.id}/` : URL_PROVIDERS
    return !payload.id
      ? post<CreateUpdateProviderDTO>(url, payload)
      : put<CreateUpdateProviderDTO>(url, payload)
  }

  return {
    getProviders,
    getProviderDetails,
    submitProvider
  }
}
