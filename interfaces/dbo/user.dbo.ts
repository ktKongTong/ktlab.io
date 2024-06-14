import {z} from 'zod'

export const TravellerBoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  address: z.string().nullish(),
  type: z.string()
})

export type UserTravellerBo = z.infer<typeof TravellerBoSchema>
export type UserIDLessTravellerBo = Omit<UserTravellerBo, 'id'>
export type TravellerInsertDBO = Omit<UserIDLessTravellerBo, 'type'>


export const UserBoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  receiveEmailOn:z.boolean(),
  type: z.string(),
  role: z.string(),
  source: z.string(),
})