
import {z} from "zod";
import { CommentDBOSchema } from "../dbo";
import {documentVOSchema} from "./document.vo";
export const commentVOSchema = CommentDBOSchema
  .omit({
  createdAt: true,
}).extend({
  createdAt: z.coerce.number(),
})

export const zodCommentDBOToVO = z.array(CommentDBOSchema)
  .transform((data) => {
  return data.map(it => ({
    ...it,
    createdAt: Math.floor(it.createdAt.getTime()/1000)
  }))
})


export const CommentVOWithContentInfoSchema = commentVOSchema.merge(z.object({
  documentInfo: documentVOSchema
}))

export type CommentWithDocumentVO = z.infer<typeof CommentVOWithContentInfoSchema>
export type CommentVO = z.infer<typeof commentVOSchema>

export const commentInsertVOSchema = commentVOSchema.omit({
  id: true,
  version: true,
  createdAt: true,
  state: true,
  authorId: true,
  userInfo: true
})


export type CommentInsertVO = z.infer<typeof commentInsertVOSchema>