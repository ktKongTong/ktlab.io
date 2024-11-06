import {z} from "zod";


export const revalidateCacheDTO = z.object({
  paths: z.string().array(),
  tags: z.string().array(),
});


export type RevalidateCacheRequest = z.infer<typeof revalidateCacheDTO>