import { ref } from 'vue'
import { providerService } from '@/services/provider-service'
import type { ProviderDTO } from '../dto/provider-dto'

export const useProvider = () => {
  const { getProviders, getProviderDetails, submitProvider } = providerService()

  const providers = ref<ProviderDTO[]>([])
  const provider = ref<ProviderDTO>()

  const loadProviders = () => getProviders().then((response) => (providers.value = response.data))
  
  const loadProviderDetails = (id: number) => getProviderDetails(id).then((response) => (provider.value = response.data))

  return {
    loadProviders,
    loadProviderDetails,
    submitProvider,
    providers,
    provider,
  }
}
