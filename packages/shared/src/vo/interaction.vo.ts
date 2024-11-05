import {z} from "zod";

export const ContentLastVisitorSchema = z.object({
  ip: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
})
export const ContentInteractionSchema = z.object({
  view: z.number(),
  lastVisitor: z.string(),
  reactions: z.record(z.number())
})