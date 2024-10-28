import { drizzle } from "drizzle-orm/postgres-js";
import { eq, or, and, like, arrayContains, notLike} from "drizzle-orm";
import postgres from "postgres";
import {documents, DocumentSelect} from "@/lib/db/schema";
import DB from "@/lib/db/db";
import {pathPrefix} from "@/config";

const connectionString = process.env.DATABASE_URL as string;

export const slcDB = DB(connectionString)
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


//add ignore path pattern

export const getAllDocumentWithFolders = () => {
  return  db.select().from(documents).where(notLike(documents.relativePath, `%\.excalidraw\.md`)).execute()
}

export const getAllDocumentWithoutFolder = () => {
  return  db.select().from(documents).where(and(eq(documents.type, 'file'), like(documents.parentId, `${pathPrefix.blog}%`), notLike(documents.relativePath, `%\.excalidraw\.md`)))
}

export const getAllDocumentWithoutFolderByStartPath = (startPath:string) => {
  return db.select().from(documents).where(and(eq(documents.type, 'file'), like(documents.parentId, `${startPath}%`), notLike(documents.relativePath, `%\.excalidraw\.md`)))
}


// ignore path pattern
export const getDocumentsByTags = (tags: string[]) => {
  return  db.select().from(documents).where(
    and(
      arrayContains(documents.tags, tags),
      eq(documents.type, 'file'),
      like(documents.parentId, `${pathPrefix.blog}%`),
      notLike(documents.relativePath, `%\.excalidraw\.md`)
    )
  )
}
