import {index, int, json, mysqlTable, primaryKey, timestamp, varchar, text, uniqueIndex} from "drizzle-orm/mysql-core";
import {documents} from "./document";

export const contents = mysqlTable('contents', {
  id: varchar('id').notNull(),
  documentId: varchar('document_id').references(() => documents.id),
  content:varchar('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
  tags: json('tags').notNull().default([]),
})