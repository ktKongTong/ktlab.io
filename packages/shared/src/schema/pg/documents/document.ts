import {jsonb, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";

export const documents = pgTable('documents', {
  id: varchar('id').notNull().primaryKey(),
  parentId: varchar('parent_id'),
  dataSource: varchar('data_source', { enum: ['obsidian', 'cms','self', 'chat-wall'] }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
  namespace: varchar('namespace').notNull(),
  tags: varchar('tags').array().notNull().default([]),
})


