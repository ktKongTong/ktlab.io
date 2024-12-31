import type {PostgresJsDatabase} from "drizzle-orm/postgres-js";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import type { MySql2Database } from "drizzle-orm/mysql2";
import { type Schema } from "../schema";
import {createPgSchema} from "../schema/pg";
import {Paging} from "../paging";
import {
  AnonymousInsertDBO,
  CommentDBO,
  CommentInsertDBO,
  CommentUpdateDBO,
  ContentDBO,
  ContentInsertDBO,
  DocumentDBO
} from "../dbo";

export type DB =
  | DrizzleD1Database<Schema['Sqlite']>
  | BetterSQLite3Database<Schema['Sqlite']>
  | PostgresJsDatabase<Schema['PG']>
  | MySql2Database<Schema['Mysql']>


export type DBMap = {
    'd1-sqlite': DrizzleD1Database<Schema['Sqlite']>,
    'better-sqlite3': BetterSQLite3Database<Schema['Sqlite']>,
    'pgjs': PostgresJsDatabase<Schema['PG']>,
    'mysql2': MySql2Database<Schema['Mysql']>
}

export const schema = {
  pg: createPgSchema(),
  sqlite: createPgSchema(),
  mysql: createPgSchema()
}


export interface IDAO {
  queryCommentByDocId:(documentId:string,page:number, pageSize:number) => Promise<Paging<CommentDBO>>,
  queryContent:(page:number, pageSize:number) => Promise<Paging<ContentDBO>>,
  // getContentOrDocumentById: (contentId: string) => Promise<ContentDBO | DocumentDBO | null>
  insertContent: (content: ContentInsertDBO) => Promise<ContentDBO>
  insertComment: (comment:CommentInsertDBO)=> Promise<CommentDBO>,
  modifyCommentByCommentId: (comment:CommentUpdateDBO)=>Promise<CommentDBO>,
  createUserIfNeed: (user:AnonymousInsertDBO) => Promise<string>,
  queryHistoryByCommentId: (commentId:string) => Promise<CommentDBO[]>
  getCommentByCommentId: (commentId: string) => Promise<CommentDBO | null>
}

export const creatDBClient = () => {

}
