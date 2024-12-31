import {index, integer, primaryKey, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {CommentBody, CommentUserInfo} from "../../dbo";

export const comment = sqliteTable('comment', {
  id: text('id').notNull(),
  body: text("body").$type<CommentBody>().notNull(),
  version: integer("version").notNull(),
  documentId: text("document_id", { length: 255 }).notNull(),
  state: text('state').notNull().default("NORMAL"),
  authorId: text("author_id").notNull(),
  userInfo: text('userInfo', {mode: 'json'}).$type<CommentUserInfo>().notNull(),
  parentId: text("parent_id"),
  createdAt: integer('create_at', {mode: "timestamp"}).notNull().$defaultFn(() => new Date()),
}, (comment) => {
  return {
    pk: primaryKey({columns:[comment.id, comment.version]}),
    docIndex: index('doc_id_idx').on(comment.documentId),
    userIndex: index('author_id_idx').on(comment.authorId)
  }
})

