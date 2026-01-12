import type { AddressDTO } from '@/core/dto/address-dto'
import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'
import * as z from 'zod'

export const addressFormSchema = z.object({
  cep: z
    .string()
    .min(1, { message: '* Campo obrigatório' })
    .min(8, { message: '* Mínimo 8 caracteres' })
    .max(8, { message: '* Mínimo 8 caracteres' }),
  street: z
    .string()
    .min(1, { message: '* Campo obrigatório' })
    .min(3, { message: '* Mínimo 3 caracteres' }),
  number: z.preprocess(
    (val) => (val === '' || val === null ? undefined : Number(val)),
    z.number().optional()
  ),
  neighborhood: z
    .string()
    .min(1, { message: '* Campo obrigatório' })
    .min(3, { message: '* Mínimo 3 caracteres' }),

  city: z
    .string()
    .min(1, { message: '* Campo obrigatório' })
    .min(3, { message: '* Mínimo 3 caracteres' }),

  state: z.string().min(1, { message: '* Campo obrigatório' })
})

export const initialValues: AddressDTO = {
  cep: '',
  street: '',
  number: undefined as unknown as number,
  neighborhood: '',
  city: '',
  state: ''
}

export type AddressFormValues = z.infer<typeof addressFormSchema>
export const schema: TypedSchema<AddressFormValues> = toTypedSchema(addressFormSchema)
