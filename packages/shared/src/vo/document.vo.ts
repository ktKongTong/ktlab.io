
import {z} from "zod";
import {documentDBOSchema} from "../dbo";

export const documentVOSchema = documentDBOSchema

export type DocumentVO = z.infer<typeof documentVOSchema>