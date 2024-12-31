
import {and, desc, eq, sql} from "drizzle-orm";

import {DB, DBMap, IDAO, schema} from "../../type";

import {
  AnonymousInsertDBO,
  CommentDBO,
  CommentInsertDBO,
  CommentUpdateDBO,
  ContentDBO,
  ContentInsertDBO
} from "../../../dbo";
import {uniqueId} from "lodash-es";

export default class DrizzlePGDB implements IDAO {
  db: DBMap['pgjs']
  t = schema.pg
  constructor(drizzleInstance: DBMap['pgjs']) {
    this.db = drizzleInstance
  }
  async insertContent(content: ContentInsertDBO): Promise<ContentDBO> {
    const id = uniqueId()
    const [res] = await this.db.insert(this.t.contents).values({
      ...content,
      id,
    }).returning()
    return res
  }
  async queryContent( page: number = 1, pageSize: number = 100) {
    const [data, [{count}]] = await Promise.all([
      this.db.query.contents.findMany({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        orderBy: desc(this.t.contents.createdAt)
      }),
      this.db.select({count: sql<string>`COUNT(*)`}).from(this.t.contents)
    ]);

    return {
      data: data,
      total: Math.ceil(parseInt(count) / pageSize),
      page,
      pageSize
    };
  }
  async getContentOrDocumentById(contentId: string) {
    const content = await this.db.query.contents.findFirst({
      where: eq(this.t.contents.id, contentId)
    })

    const document = await this.db.query.documents.findFirst({
      where: eq(this.t.documents.id, contentId)
    })
    return content ?? document ?? null
  }

  async queryCommentByDocId(documentId: string, page: number = 1, pageSize: number = 100) {
    const [comments, [{count}]] = await Promise.all([
      this.db.query.comment.findMany({
        where:eq(this.t.comment.documentId, documentId),
        orderBy: desc(this.t.comment.createdAt),
        limit: pageSize,
        offset: (page - 1) * pageSize
      }),
      this.db.select({
        count: sql<number>`COUNT(*)`
      }).from(this.t.comment)
      .where(eq(this.t.comment.documentId, documentId))
    ]);

    return {
      data: comments,
      total: count,
      page,
      pageSize
    };
  }

  async insertComment(comment:CommentInsertDBO) {
    const id = uniqueId()
    const [res] = await this.db.insert(this.t.comment).values({
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
      latestVersion: sql<number>`max(${this.t.comment.version})`
    }).from(this.t.comment)
      .where(eq(this.t.comment.id, comment.id))
    const [res] = await this.db.insert(this.t.comment)
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
        id: this.t.user.id,
      })
      .from(this.t.user)
      .where(eq(this.t.user.email, user.email))
      .limit(1))[0]
    if (!dbUser) {
      const cnt = await this.db.select({
        cnt:{ count: sql`COUNT(*)` }
      }).from(this.t.user)
        .where(eq(this.t.user.name, user.name))
      const id = uniqueId()
      const result = await this.db
        .insert(this.t.user)
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
        where: eq(this.t.comment.id, commentId),
        orderBy: desc(this.t.comment.version)
      })
    return history
  }
  async getCommentByCommentId (commentId: string): Promise<CommentDBO | null> {
    const history = await this.db.query.comment.findFirst({
        where: eq(this.t.comment.id, commentId),
        orderBy: desc(this.t.comment.version),
      })
    return history ?? null
  }
}
