import {z} from "zod";

export const commentStateEnumArr = ['NORMAL', 'BLOCKED', 'DELETED'] as const;

export const commentUserInfoSchema = z.object({
  userid: z.string().nullish(),
  name: z.string(),
  email: z.string(),
  imageUrl: z.string(),
})
export const commentBodySchema = z.object({
  text: z.string(),
  paragraphId: z.optional(z.string()),
  inlineParagraphId: z.optional(z.string()),
})

export type CommentUserInfo = z.infer<typeof commentUserInfoSchema>
export type CommentBody = z.infer<typeof commentBodySchema>

export const CommentDBOSchema = z.object({
  id: z.string(),
  version: z.number(),
  state: z.string(),
  documentId: z.string(),
  authorId: z.string(),
  body: commentBodySchema,
  userInfo: commentUserInfoSchema,
  parentId: z.string().nullish(),
  createdAt: z.date()
})


export type CommentDBO = z.infer<typeof CommentDBOSchema>

export const CommentInsertDBOSchema = CommentDBOSchema.omit({
  id: true,
  version: true,
  state: true,
  createdAt: true,
})

export const CommentUpdateDBOSchema = CommentDBOSchema.omit({
  version: true,
  state: true,
  createdAt: true,
})

export type CommentInsertDBO = z.infer<typeof CommentInsertDBOSchema>
export type CommentUpdateDBO = z.infer<typeof CommentUpdateDBOSchema>