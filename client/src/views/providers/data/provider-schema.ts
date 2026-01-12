import { addressFormSchema } from '@/components/address/data/address-schema'
import type { CreateUpdateProviderDTO } from '@/core/dto/provider-dto'
import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'
import * as z from 'zod'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: '* Campo obrigatório' })
    .min(3, { message: '* Mínimo 3 caracteres' }),

  description: z
    .string()
    .min(1, { message: '* Campo obrigatório' })
    .min(3, { message: '* Mínimo 3 caracteres' }),

  phone: z
    .string()
    .min(1, { message: '* Campo obrigatório' })
    .min(10, { message: '* Mínimo 10 caracteres' }),

  category: z.number({
    required_error: '* Campo obrigatório'
  }),

  ...addressFormSchema.shape
})

export const initialValues: CreateUpdateProviderDTO = {
  name: '',
  description: '',
  phone: '',
  category: undefined as unknown as number,
  cep: '',
  street: '',
  number: undefined as unknown as number,
  neighborhood: '',
  city: '',
  state: ''
}

export type ProviderFormValues = z.infer<typeof formSchema>
export const schema: TypedSchema<ProviderFormValues> = toTypedSchema(formSchema)
