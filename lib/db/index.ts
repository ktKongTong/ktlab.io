import { drizzle } from "drizzle-orm/postgres-js";
import {arrayContained, eq, or, and, sql, like, arrayContains} from "drizzle-orm";
import postgres from "postgres";
import {documents, DocumentSelect} from "@/lib/db/schema";
import DB from "@/lib/db/db";

const connectionString = process.env.DATABASE_URL as string;

export const slcDB = DB(connectionString)
//Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client);


export const getDocumentByPath = async (path: string):Promise<DocumentSelect|null> => {
  const res = await db.select().from(documents)
    .where(or(eq(documents.relativePath, path), eq(documents.relativePath, path+".md"), eq(documents.relativePath, path+"/index.md")))
  if(res.length > 0) {
    return res[0]
  }
  return null
}

export const getDocumentById = async (id: string):Promise<DocumentSelect|null> => {
const res = await db.select().from(documents)
  .where(and(eq(documents.id, id), eq(documents.type, 'file')))
  if(res.length > 0) {
    return res[0]
  }
  return null
}

export const getAllDocumentWithFolders = () => {
  return  db.select().from(documents).execute()
}

export const getAllDocumentWithoutFolder = () => {
  return  db.select().from(documents).where(and(eq(documents.type, 'file'), like(documents.parentId, `%blog`)))
}


export const getDocumentsByTags = (tags: string[]) => {
  return  db.select().from(documents).where(and(arrayContains(documents.tags, tags), eq(documents.type, 'file'), like(documents.parentId, `%blog`)))
}