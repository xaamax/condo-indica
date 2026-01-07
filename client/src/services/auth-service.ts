import type { LoginDTO, LoginResponseDTO } from '@/core/dto/auth-dto'
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import api from '@/services/api/api'

export function authService() {
  const isLoading = ref(false)

  const URL_LOGIN = '/v1/authentication/'
  const URL_REFRESH_TOKEN = '/v1/authentication/refresh_token/'

  const login = (payload: LoginDTO): Promise<AxiosResponse<LoginResponseDTO>> =>
    api.post(URL_LOGIN, payload)

  const refreshToken = (token: string): Promise<AxiosResponse> =>
    api.post(URL_REFRESH_TOKEN, { token })


  return {
    URL_LOGIN,
    URL_REFRESH_TOKEN,
    login,
    refreshToken,
    isLoading,
  }
}
