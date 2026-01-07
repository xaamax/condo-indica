import { get, type ApiResult } from '@/services/api/api'

import { URL_PROVIDERS } from '@/core/constants/urls-api'
import type { ProviderCompactDTO } from '@/core/dto/provider-dto'

export function providerService() {  
    const getProviders = async(): Promise<ApiResult<ProviderCompactDTO[]>> => {
    return get(URL_PROVIDERS)
  }

  return {
    getProviders
  }
}