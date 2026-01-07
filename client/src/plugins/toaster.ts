import type { App } from 'vue'
import { toast, type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function toastSuccess(message: string) {
  setTimeout(() => {
    toast.success(message, {
      position: 'top-right',
      theme: 'colored',
      type: 'success',
      closeButton: false,
      limit: 1000
    } as ToastContainerOptions)
  }, 1000)
}

export const toastError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    closeButton: false,
    theme: 'colored',
    type: 'error',
    hideProgressBar: true,
  } as ToastContainerOptions)
}

export const toastAsync = async <T>(
  promise: Promise<T>,
  messages: {
    pending?: string
    success: string
    error?: string
  },
  onSuccess?: (data: T) => void
): Promise<T> => {
  const wrappedPromise = promise.then((result) => {
    if (onSuccess) onSuccess(result)
    return result
  })

  return toast.promise(
    wrappedPromise,
    {
      ...(messages.pending && { pending: messages.pending }),
      success: messages.success,
      error: {
        render({ data }) {
          return (
            messages.error ||
            data?.response?.data?.message ||
            'Erro ao processar'
          )
        },
      },
    },
    {
      position: 'top-right',
      closeButton: false,
      theme: 'colored',
      hideProgressBar: true,
    }
  )
}

export default {
  install(app: App) {
    app.config.globalProperties.$toastSuccess = toastSuccess
    app.config.globalProperties.$toastError = toastError
    app.config.globalProperties.$toastAsync = toastAsync
  },
}
