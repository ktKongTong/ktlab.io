import {z} from "zod";

export const CommentDtoSchema = z.object({
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
    address: z.string()
  }),
  parentId: z.string().nullish(),
  createdAt: z.string()
})

export type CommentDto = z.infer<typeof CommentDtoSchema>
const userInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  address: z.string()
})
const bodySchema = z.object({
  paragraphId: z.optional(z.string()),
  inlineParagraphId: z.optional(z.string()),
  text: z.string()
})
export type CommentUserInfoDto = z.infer<typeof userInfoSchema>
export type CommentBodyDto = z.infer<typeof bodySchema>

export type CommentInsertDto = Omit<CommentDto, 'version' | 'userInfo' | 'createdAt'>