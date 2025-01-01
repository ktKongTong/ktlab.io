import {drizzle, type PostgresJsDatabase} from "drizzle-orm/postgres-js";
import {eq, or, and, like, arrayContains, notLike, sql} from "drizzle-orm";
import {Schema} from "../schema";
import { DocumentVO } from "../vo";
import {createPgSchema} from "../schema/pg";
import {DBMap} from "./type";


// const connectionString = process.env.DATABASE_URL as string;

const dbFactory = () => {



}

//  const slcDB = DB(connectionString)
// const client = postgres(connectionString, { prepare: false });
//
//  const db = drizzle(client);


// const t = createPgSchema()

// export type DB = PostgresJsDatabase<Schema['PG']>

export const createDAO = (db: DBMap['pgjs'], t: Schema['PG'])=> {
   const getDocumentByPath = async (path: string):Promise<DocumentVO|null> => {
      const [res] = await db.select().from(t.documents)
        .where(or(eq(t.obsidian.relativePath, path), eq(t.documents.relativePath, path+".md"), eq(documents.relativePath, path+"/index.md")))
      return res || null
    }

   const getDocumentById = async (id: string):Promise<DocumentVO|null> => {
    const [res] = await db.select().from(t.documents)
      .where(and(eq(t.documents.id, id), eq(t.documents.type, 'file')))
    return res || null
  }

   const getDocumentByIdOrSlug = async (id: string):Promise<DocumentVO|null> => {
    const [res] = await db.select().from(t.documents)
      .where(and(
        eq(t.documents.type, 'file'),
        or(eq(t.documents.id, id), sql`${t.documents.mdMetadata}->>'slug' = ${id}`)
      ))
    return res || null
  }

   const getDocumentsByTags = async (tags: string[]):Promise<DocumentDBO[]> => {
    return db.select().from(t.documents).where(
      and(
        arrayContains(t.documents.tags, tags),
        eq(t.documents.type, 'file'),
        like(t.documents.parentId, `${pathPrefix.blog}%`),
        notLike(t.documents.relativePath, `%\.excalidraw\.md`)
      )
    )
  }

   const getAllDocumentWithFolders = () => {
    return  db.select().from(t.documents).where(notLike(t.documents.relativePath, `%\.excalidraw\.md`)).execute()
  }

   const getAllDocumentWithoutFolder = () => {
    return  db.select().from(t.documents).where(and(eq(t.documents.type, 'file'), like(t.documents.parentId, `${pathPrefix.blog}%`), notLike(t.documents.relativePath, `%\.excalidraw\.md`)))
  }

// config ignore path pattern

   const getAllDocumentWithoutFolderByStartPath = (startPath:string) => {
    return db.select().from(t.documents).where(and(eq(t.documents.type, 'file'), like(t.documents.parentId, `${startPath}%`), notLike(t.documents.relativePath, `%\.excalidraw\.md`)))
  }
}