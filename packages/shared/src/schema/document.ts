import {jsonb, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {documentType, MDMetadata} from "../base";


export const documents = pgTable('obsidiandocuments', {
  id: varchar('id').notNull(),
  title: varchar('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
  parentId: varchar('parent_id'),
  relativePath: varchar('path').notNull().default(''),
  tags: varchar('tags').array().notNull().default([]),
  type: varchar('type', {enum: ['folder', 'file']}).notNull(),
  mdMetadata: jsonb('md_metadata').$type<MDMetadata>(),
})


export type DocumentSelect = typeof documents.$inferSelect
export type DocumentInsert = typeof documents.$inferInsert
