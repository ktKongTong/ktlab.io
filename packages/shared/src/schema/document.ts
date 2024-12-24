import {jsonb, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {documentType, MDMetadata} from "../base";

// content store in obsdian&cdn
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

// content store in db
export const contents = pgTable('contents', {
  id: varchar('id').notNull(),
  content:varchar('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
  tags: varchar('tags').array().notNull().default([]),
})

export type ContentSelect = typeof contents.$inferSelect
export type ContentInsert = typeof contents.$inferInsert


export type DocumentSelect = typeof documents.$inferSelect
export type DocumentInsert = typeof documents.$inferInsert
