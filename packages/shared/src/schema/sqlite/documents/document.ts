import {integer, sqliteTable, text, uniqueIndex} from "drizzle-orm/sqlite-core";

export const documents = sqliteTable('documents', {
  id: text('id').notNull().primaryKey(),
  parentId: text('parent_id'),
  title: text('title').notNull(),
  dataSource: text('data_source', { enum: ['obsidian', 'cms','self'] }),
  createdAt: integer('created_at', {mode: 'timestamp'}).notNull().defaultNow(),
  lastModifiedAt: integer('last_modified_at', {mode: 'timestamp'}).notNull().defaultNow(),
  namespace: text('namespace').notNull(),
  tags: text('tags', {mode: 'json'}).notNull().default([]),
})


