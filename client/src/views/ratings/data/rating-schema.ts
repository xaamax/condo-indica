import type { CreateUpdateRatingDTO } from '@/core/dto/rating-dto'
import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'
import * as z from 'zod'

const formSchema = z.object({
  provider: z.number({
    required_error: '* Campo obrigatório'
  }),

  stars: z
    .number({
      required_error: '* Campo obrigatório'
    })
    .min(1)
    .max(5),

  comment: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.trim().length >= 5,
      '* Mínimo 5 caracteres'
    )
})

export const initialValues: CreateUpdateRatingDTO = {
  provider: undefined as unknown as number,
  stars: 1,
  comment: ''
}

export type RatingFormValues = z.infer<typeof formSchema>
export const schema: TypedSchema<RatingFormValues> = toTypedSchema(formSchema)
