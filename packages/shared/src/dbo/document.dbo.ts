import {z} from "zod";
import {documentMDMetadataSchema, documentType} from "../base";


export const documentDBOSchema = z.object({
  id: z.string(),
  title: z.string(),
  relativePath: z.string(),
  parentId: z.string().nullish(),
  type: z.string(z.enum(documentType)),
  mdMetadata: documentMDMetadataSchema,
  createdAt: z.date(),
  lastModifiedAt: z.date(),
  tags: z.string().array().default([])
})

type _DocumentDBO = z.infer<typeof documentDBOSchema>
export type DocumentDBO = _DocumentDBO

export const contentDBOSchema = z.object({
  id: z.string(),
  content: z.string(),
  // may follow by some content
  parentId: z.string().nullish(),
  createdAt: z.date(),
  lastModifiedAt: z.date(),
})

type _ContentDBO = z.infer<typeof contentDBOSchema>
export type ContentDBO = _ContentDBO
