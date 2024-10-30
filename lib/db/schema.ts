
import {
  integer,
  json,
  pgEnum,
  primaryKey,
  uniqueIndex,
  pgTable,
  timestamp,
  varchar,
  index, jsonb
} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";
type MDMetadata = {
  excerpt?: string;
  slug?: string;
  wordcount?: number;
  image?: string;
} & Record<string, any>

export const documents = pgTable('obsidiandocuments', {
  id: varchar('id').notNull(),
  title: varchar('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
  relativePath: varchar('path').notNull().default(''),
  parentId: varchar('parent_id'),
  tags: varchar('tags').array().notNull().default([]),
  type: varchar('type').notNull(),
  // metadata
  mdMetadata: jsonb('md_metadata').$type<MDMetadata>(),
})


export const userTypeEnum = pgEnum('user_type', ['TRAVELLER', 'USER']);

export const roleTypeEnum = pgEnum('role_type', ['USER', 'ADMIN']);

export const user = pgTable('users', {
  id: varchar('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  imageUrl: varchar('image_url'),
  type: userTypeEnum('user_type'),
  role: roleTypeEnum('role_type')
}, (user) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(user.name),
    emailIndex: uniqueIndex('email_idx').on(user.email)
  }
});

export const commentStateEnum = pgEnum('CommentState', ['NORMAL', 'BLOCKED', 'DELETED']);

export const comment = pgTable('comment', {
  id: varchar('id').notNull(),
  body: json("body").$type<{text: string;paragraphId?: string;inlineParagraphId?: string}>().notNull(),
  version: integer("version").notNull(),
  documentId: varchar("document_id", { length: 255 }).notNull(),
  state: commentStateEnum('state').notNull().default("NORMAL"),
  authorId: varchar("author_id").notNull(),
  userInfo: json('userInfo').$type<{imageUrl: string, name?: string, email: string}>().notNull(),
  parentId: varchar("parent_id"),
  createdAt: timestamp('create_at', { withTimezone: true }).defaultNow(),
  // lastModifiedAt: timestamp('lastModifiedAt', {withTimezone: true}).defaultNow()
}, (comment) => {
  return {
    pk: primaryKey({columns:[comment.id, comment.version]}),
    docIndex: index('doc_id_idx').on(comment.documentId),
    userIndex: index('author_id_idx').on(comment.authorId)
  }
});

export const commentToUserRelation = relations(comment,({one})=>({
  userInfo: one(user,{fields:[comment.authorId],references:[user.id]})
}))



// eslint-disable-next-line import/no-anonymous-default-export
export default {
  comment,
  user,
  documents
}

export type DocumentSelect = typeof documents.$inferSelect
export type DocumentInsert = typeof documents.$inferInsert
