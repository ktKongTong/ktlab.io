import {z} from 'zod'

const commentRequestVOSchema = z.object({
    documentId: z.string(),
    refContent: z.string().nullish(),
    authorType: z.string(),
    userInfo: z.object({
      email: z.string(),
      name: z.string(),
      address: z.string().nullish()
    }).nullish()
})

export type CommentRequestVO = z.infer<typeof commentRequestVOSchema>

