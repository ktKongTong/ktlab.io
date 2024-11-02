import {documentDBOSchema} from "@/interfaces/base";
import {z} from "zod";

export const documentVOSchema = documentDBOSchema

export type DocumentVO = z.infer<typeof documentVOSchema>