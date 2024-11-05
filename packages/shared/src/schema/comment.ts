import {index, integer, json, pgEnum, pgTable, primaryKey, timestamp, varchar} from "drizzle-orm/pg-core";
import {CommentBody, commentStateEnumArr, CommentUserInfo} from "../dbo";






export const commentStateEnum = pgEnum('CommentState', commentStateEnumArr);

export const comment = pgTable('comment', {
  id: varchar('id').notNull(),
  body: json("body").$type<CommentBody>().notNull(),
  version: integer("version").notNull(),
  documentId: varchar("document_id", { length: 255 }).notNull(),
  state: commentStateEnum('state').notNull().default("NORMAL"),
  authorId: varchar("author_id").notNull(),
  userInfo: json('userInfo').$type<CommentUserInfo>().notNull(),
  parentId: varchar("parent_id"),
  createdAt: timestamp('create_at').notNull().defaultNow(),
}, (comment) => {
  return {
    pk: primaryKey({columns:[comment.id, comment.version]}),
    docIndex: index('doc_id_idx').on(comment.documentId),
    userIndex: index('author_id_idx').on(comment.authorId)
  }
})

