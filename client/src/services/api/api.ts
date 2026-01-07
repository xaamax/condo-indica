import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  HttpStatusCode,
  type InternalAxiosRequestConfig
} from 'axios'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { toastError } from '@/plugins/toaster'
import type { ResponseBaseDTO } from '@/core/dto/response-base-dto'
import { authService } from '@/services/auth-service'
import { useAppStore } from '@/stores/app'

const { URL_REFRESH_TOKEN, refreshToken } = authService()

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const SEGUNDOS_ANTES_EXPIRAR = 0
let refreshTokenPromise: Promise<any> | null = null

const submitRefreshToken = (token: string) => refreshToken(token).then((resp) => resp)

const revalidateAuth = async (tokenAntigo: string) => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = submitRefreshToken(tokenAntigo)
      .then((resposta) => {
        refreshTokenPromise = null
        return resposta?.data
      })
      .catch((e) => {
        refreshTokenPromise = null
        console.error('Erro ao revalidar token', e)
        throw e
      })
  }

  const dadosRefresh = await refreshTokenPromise

  const store = useAppStore()

  if (dadosRefresh?.token) {
    store.setAuth(dadosRefresh)
  } else {
    store.logout()
  }

  return dadosRefresh
}

const configAuthentication = async (
  requestConfig: InternalAxiosRequestConfig,
  token?: string,
  expiresIn?: string
) => {
  const now = dayjs()
  const diff = expiresIn ? dayjs(expiresIn).diff(now, 'seconds') : 0

  if (requestConfig.headers && token) {
    requestConfig.headers.Authorization = `Bearer ${token}`
  }

  if (
    requestConfig.url !== URL_REFRESH_TOKEN &&
    token &&
    expiresIn &&
    diff <= SEGUNDOS_ANTES_EXPIRAR
  ) {
    const dadosRevalidacao = await revalidateAuth(token)
    if (dadosRevalidacao?.token && requestConfig.headers) {
      requestConfig.headers.Authorization = `Bearer ${dadosRevalidacao.token}`
    } else {
      return Promise.reject()
    }
  }

  return requestConfig
}

const configRevalidateAuth = async (requestConfig: InternalAxiosRequestConfig, token?: string) => {
  if (requestConfig.headers && token) {
    requestConfig.headers.Authorization = `Bearer ${token}`
  }
  return requestConfig
}

api.interceptors.request.use(
  async (requestConfig) => {
    const { token, tokenExpiresIn } = JSON.parse(Cookies.get('persist:condoindica') || '{}') || {}

    if (requestConfig.url !== URL_REFRESH_TOKEN) {
      return configAuthentication(requestConfig, token, tokenExpiresIn)
    }

    return configRevalidateAuth(requestConfig, token)
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const store = useAppStore()

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      store.logout()
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export type ApiResult<T> = {
  data: T
  success: boolean
  messages: string[]
}

const openNotificationError = (mensagens: string[]) => {
  mensagens?.forEach((m) => toastError(m))
}

export const treatThen = <T>(response: AxiosResponse<T>): ApiResult<T> => ({
  success: true,
  data: response.data,
  messages: []
})

export const treatCatch = (error: AxiosError<ResponseBaseDTO>): ApiResult<any> => {
  const messages: string[] = []
  const message = error.response?.data?.detail

  if (Array.isArray(message)) messages.push(...message)
  else if (message) messages.push(message)

  openNotificationError(messages)

  return { success: false, messages, data: null }
}

const withLoading = async <T>(fn: () => Promise<ApiResult<T>>): Promise<ApiResult<T>> => {
  const store = useAppStore()

  store.isLoading = true
  try {
    return await fn()
  } finally {
    store.isLoading = false
  }
}

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>> =>
  withLoading(() =>
    api
      .get(url, config)
      .then(treatThen<T>)
      .catch(treatCatch)
  )

export const post = async <T>(url: string, params: any, config?: AxiosRequestConfig) =>
    withLoading(() =>
    api
      .post(url, params, config)
      .then(treatThen<T>)
      .catch(treatCatch)
  )

export const update = async <T>(url: string, params?: any, config?: AxiosRequestConfig) =>
    withLoading(() =>
    api
      .put(url, params, config)
      .then(treatThen<T>)
      .catch(treatCatch)
  )

export const remove = async <T>(url: string, config?: AxiosRequestConfig) =>
  withLoading(() =>
    api
      .delete(url, config)
      .then(treatThen<T>)
      .catch(treatCatch)
  )

export const patch = async <T>(url: string, params?: any) =>
    withLoading(() =>
    api
      .put(url, params)
      .then(treatThen<T>)
      .catch(treatCatch)
  )

export default api
