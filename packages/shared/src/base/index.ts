import {z} from "zod";


export const documentMDMetadataSchema = z.union([z.object({
  excerpt: z.string(),
  slug: z.string().optional(),
  wordcount: z.number(),
  timeliness: z.boolean().nullish().default(false),
  image: z.union([z.string(), z.string().array()]).optional(),
}), z.record(z.any())]).nullish()

export type MDMetadata = z.infer<typeof documentMDMetadataSchema>

export const documentType = ['folder', 'type'] as const;
