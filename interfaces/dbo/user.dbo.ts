import {z} from 'zod'

export const AnonymousDBOSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  address: z.string().nullish(),
  type: z.string()
})

export type AnonymousUserDBO = z.infer<typeof AnonymousDBOSchema>
export type IDLessAnonymousUserDBO = Omit<AnonymousUserDBO, 'id'>
export type AnonymousInsertDBO = Omit<IDLessAnonymousUserDBO, 'type'>