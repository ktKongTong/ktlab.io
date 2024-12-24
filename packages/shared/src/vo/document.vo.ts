
import {z} from "zod";
import {contentDBOSchema, documentDBOSchema} from "../dbo";

export const documentVOSchema = documentDBOSchema

export const contentVOSchema = contentDBOSchema
  .omit({lastModifiedAt: true, createdAt: true})
  .extend({
    lastModifiedAt: z.number(),
    createdAt: z.number(),
    reactions: z.record(z.number()).nullish()
  })


export const zodContentDBOToVO = z.array(contentDBOSchema)
  .transform((data) => {
    return data.map(it => ({
      ...it,
      createdAt: Math.floor(it.createdAt.getTime()/1000),
      lastModifiedAt:  Math.floor(it.createdAt.getTime()/1000)
    }))
  })


export type DocumentVO = z.infer<typeof documentVOSchema>

export type ContentVO = z.infer<typeof contentVOSchema>