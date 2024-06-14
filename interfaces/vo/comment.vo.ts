
import {z} from "zod";
export const commentVOSchema = z.object({
  id: z.string(),
  version: z.number(),
  documentId: z.string(),
  authorId: z.string(),
  body: z.object({
    paragraphId: z.optional(z.string()),
    inlineParagraphId: z.optional(z.string()),
    text: z.string()
  }),
  userInfo: z.object({
    name: z.string(),
    email: z.string(),
    imageUrl: z.string(),
  }),
  parentId: z.string().nullish(),
  createdAt: z.string()
})

export type CommentVO = z.infer<typeof commentVOSchema>


export const commentInsertVOSchema = commentVOSchema.omit({
  id: true,
  version: true,
  createdAt: true,
  authorId: true,
  userInfo: true
})

export type CommentInsertVO = z.infer<typeof commentInsertVOSchema>

export type CommentInsertBO = Omit<CommentVO, 'id' |'version' | 'createdAt'>

export type CommentUpdateBO = Omit<CommentVO,  'createdAt'>