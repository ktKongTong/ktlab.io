import postgres from "postgres";
import {drizzle, PostgresJsDatabase} from "drizzle-orm/postgres-js";
import {AnonymousInsertDBO, CommentDBO, CommentInsertDBO, CommentUpdateDBO, contents} from '@/interfaces'
import {IDBProvider} from "./db";
import { user, comment } from '@/interfaces'
import * as table from '@repo/shared/schema'
import { desc, eq, sql} from "drizzle-orm";
import type {DrizzleConfig} from "drizzle-orm/utils";
import {uniqueId} from "@/lib/utils";
import {parseIntOrDefault} from "@/app/api/[[...route]]/_utils";


export default class DrizzlePGDB<TSchema extends Record<string, unknown>> implements IDBProvider {
  private readonly client: postgres.Sql
  db: PostgresJsDatabase<typeof import('@repo/shared/schema')>
  private userTable = user
  private commentTable = comment

  constructor(connectString:string, config?: DrizzleConfig<TSchema>) {
    this.client = postgres(connectString, { prepare: false })
    this.db = drizzle(this.client, {
      schema: table
    })
  }

  async queryContent( page: number = 1, pageSize: number = 100) {
    const [data, [{count}]] = await Promise.all([
      this.db.query.contents.findMany({
        limit: pageSize,
        offset: (page - 1) * pageSize
      }),
      this.db.select({count: sql<string>`COUNT(*)`}).from(contents)
    ]);

    return {
      data: data,
      total: Math.ceil(parseInt(count) / pageSize),
      page,
      pageSize
    };
  }


  async queryCommentByDocId(documentId: string, page: number = 1, pageSize: number = 100) {
    const [comments, [{count}]] = await Promise.all([
      this.db.query.comment.findMany({
        where:eq(this.commentTable.documentId, documentId),
        orderBy: desc(this.commentTable.createdAt),
        limit: pageSize,
        offset: (page - 1) * pageSize
      }),
      this.db.select({
        count: sql<number>`COUNT(*)`
      }).from(this.commentTable)
      .where(eq(this.commentTable.documentId, documentId))
    ]);

    return {
      data: comments,
      total: count,
      page,
      pageSize
    };
  }

  async insertComment(comment:CommentInsertDBO):Promise<CommentDBO> {
    const id = uniqueId()
    const [res] = await this.db.insert(this.commentTable).values({
      id:id,
      body: comment.body,
      version: 1,
      userInfo: comment.userInfo,
      documentId: comment.documentId,
      authorId: comment.authorId,
      parentId: comment.parentId
    }).returning()
    return res
  }

  async modifyCommentByCommentId(comment:CommentUpdateDBO):Promise<CommentDBO>{
    const [{latestVersion}] = await this.db.select({
      latestVersion: sql<number>`max(${this.commentTable.version})`
    }).from(this.commentTable)
      .where(eq(this.commentTable.id, comment.id))
    const [res] = await this.db.insert(this.commentTable)
      .values({
        id:comment.id,
        body: comment.body,
        version: latestVersion + 1,
        userInfo: comment.userInfo,
        documentId: comment.documentId,
        authorId: comment.authorId,
        parentId: comment.parentId
      }).returning()
    return res
  }

  async createUserIfNeed(user: AnonymousInsertDBO): Promise<string> {
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

  async queryHistoryByCommentId(commentId:string): Promise<CommentDBO[]> {
    const history = await this.db
      .query.comment.findMany({
        where: eq(this.commentTable.id, commentId),
        orderBy: desc(this.commentTable.version)
      })
    return history
  }
}
