import postgres from "postgres";
import {drizzle, PostgresJsDatabase} from "drizzle-orm/postgres-js";
import {CommentDto, TravellerInsertDBO, UserIDLessTravellerBo} from '@/interfaces/dbo'
import {CommentInsertBO, CommentUpdateBO} from '@/interfaces/vo'
import {IDBProvider} from "./db";
import {user, comment, documents} from './schema'
import * as table from './schema'
import {and, desc, eq, isNull, sql} from "drizzle-orm";
import type {DrizzleConfig} from "drizzle-orm/utils";
import {nanoid} from "nanoid";

 function uniqueId() {
  return nanoid(10)
}
export default class DrizzlePGDB<TSchema extends Record<string, unknown>> implements IDBProvider {
  private readonly client: postgres.Sql
  db: PostgresJsDatabase<typeof import('./schema')>
  private userTable = user
  private commentTable = comment

  constructor(connectString:string, config?: DrizzleConfig<TSchema>) {
    this.client = postgres(connectString, { prepare: false })
    this.db = drizzle(this.client, {
      schema: table
    })
  }

  async queryCommentByDocId(documentId:string,page:number = 1, pageSize:number = 100):Promise<CommentDto[]>{
    const res = await
      this.db.query.comment.findMany({
        where:eq(this.commentTable.documentId, documentId),
        orderBy: desc(this.commentTable.createAt),
      })
    return (res as any as CommentDto[])
  }

  async insertComment(comment:CommentInsertBO):Promise<any> {
    const id = uniqueId()
    const res = await this.db.insert(this.commentTable).values({
      id:id,
      body: comment.body,
      version: 1,
      userInfo: comment.userInfo,
      documentId: comment.documentId,
      authorId: comment.authorId,
      parentId: comment.parentId
    }).returning()
    return res[0]
  }

  async modifyCommentByCommentId(comment:CommentUpdateBO):Promise<void>{
    const [{latestVersion}] = await this.db.select({
      latestVersion: sql<number>`max(${this.commentTable.version})`
    }).from(this.commentTable)
      .where(eq(this.commentTable.id, comment.id))
    const res = await this.db.insert(this.commentTable)
      .values({
        id:comment.id,
        body: comment.body,
        version: latestVersion+1,
        userInfo: comment.userInfo,
        documentId: comment.documentId,
        authorId: comment.authorId,
        parentId: comment.parentId
      }).returning()
  }

  async createUserIfNeed(user: TravellerInsertDBO): Promise<string> {
    const dbUser =  (await this.db
      .select({
        id: this.userTable.id,
      })
      .from(this.userTable)
      .where(eq(this.userTable.email, user.email))
      .limit(1))[0]
    if (!dbUser) {
      const cnt = await this.db.select({
        cnt:{ count: sql`COUNT(*)` }
      }).from(this.userTable)
        .where(eq(this.userTable.name, user.name))
      const id = uniqueId()
      const result = await this.db
        .insert(this.userTable)
        .values({
          email:user.email,
          id: id,
          name: user.name,
          role: "USER",
          type: "TRAVELLER"
        }).returning()
      return id
    }
    return dbUser.id!
  }

  async queryHistoryByCommentId(commentId:string): Promise<CommentDto[]> {
    const history = await this.db
      .query.comment.findMany({
        where: eq(this.commentTable.id, commentId),
        orderBy: desc(this.commentTable.version)
      })
    return history as any as CommentDto[]
  }
}
