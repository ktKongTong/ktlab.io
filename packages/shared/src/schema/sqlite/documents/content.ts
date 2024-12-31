import {integer, sqliteTable, text, uniqueIndex} from "drizzle-orm/sqlite-core";
import {documents} from "./document";

export const contents = sqliteTable('contents', {
  id: text('id').notNull(),
  documentId: text('document_id').references(() => documents.id),
  content:text('content').notNull(),
  createdAt: integer('created_at', {mode: 'timestamp'}).notNull().defaultNow(),
  lastModifiedAt: integer('last_modified_at', {mode: 'timestamp'}).notNull().defaultNow(),
  tags: text('tags', {mode: 'json'}).notNull().$defaultFn(() => []),
})