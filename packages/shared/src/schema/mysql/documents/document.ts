import {index, int, json, mysqlTable, primaryKey, timestamp, varchar, text, uniqueIndex} from "drizzle-orm/mysql-core";

export const documents = mysqlTable('documents', {
  id: varchar('id').notNull().primaryKey(),
  parentId: varchar('parent_id'),
  title: varchar('title').notNull(),
  dataSource: varchar('data_source', { enum: ['obsidian', 'cms','self'] }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
  namespace: varchar('namespace').notNull(),
  tags: json('tags').notNull().default([]),
})


