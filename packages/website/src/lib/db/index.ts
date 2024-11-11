import { drizzle } from "drizzle-orm/postgres-js";
import {eq, or, and, like, arrayContains, notLike, sql} from "drizzle-orm";
import postgres from "postgres";
import DB from "@/lib/db/db";
import {pathPrefix} from "@/config";
import {documents, DocumentVO, DocumentDBO} from "@/interfaces";

const connectionString = process.env.DATABASE_URL as string;

export const slcDB = DB(connectionString)
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client);

export const getDocumentByPath = async (path: string):Promise<DocumentVO|null> => {
  const [res] = await db.select().from(documents)
    .where(or(eq(documents.relativePath, path), eq(documents.relativePath, path+".md"), eq(documents.relativePath, path+"/index.md")))
  return res || null
}

export const getDocumentById = async (id: string):Promise<DocumentVO|null> => {
const [res] = await db.select().from(documents)
  .where(and(eq(documents.id, id), eq(documents.type, 'file')))
  return res || null
}

export const getDocumentByIdOrSlug = async (id: string):Promise<DocumentVO|null> => {
  const [res] = await db.select().from(documents)
    .where(and(
      eq(documents.type, 'file'),
      or(eq(documents.id, id), sql`${documents.mdMetadata}->>'slug' = ${id}`)
    ))
  return res || null
}

export const getDocumentsByTags = async (tags: string[]):Promise<DocumentDBO[]> => {
  return db.select().from(documents).where(
    and(
      arrayContains(documents.tags, tags),
      eq(documents.type, 'file'),
      like(documents.parentId, `${pathPrefix.blog}%`),
      notLike(documents.relativePath, `%\.excalidraw\.md`)
    )
  )
}

export const getAllDocumentWithFolders = () => {
  return  db.select().from(documents).where(notLike(documents.relativePath, `%\.excalidraw\.md`)).execute()
}

export const getAllDocumentWithoutFolder = () => {
  return  db.select().from(documents).where(and(eq(documents.type, 'file'), like(documents.parentId, `${pathPrefix.blog}%`), notLike(documents.relativePath, `%\.excalidraw\.md`)))
}

// config ignore path pattern

export const getAllDocumentWithoutFolderByStartPath = (startPath:string) => {
  return db.select().from(documents).where(and(eq(documents.type, 'file'), like(documents.parentId, `${startPath}%`), notLike(documents.relativePath, `%\.excalidraw\.md`)))
}


