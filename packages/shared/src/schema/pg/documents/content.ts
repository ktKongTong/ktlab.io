
import {pgTable, timestamp, varchar} from "drizzle-orm/pg-core";

import { documents } from "./document";

export const contents = pgTable('contents', {
  id: varchar('id').notNull(),
  documentId: varchar('document_id').references(() => documents.id),
  title: varchar('title', { length: 256 }),
  content:varchar('content').notNull(),
  tags: varchar('tags').array().notNull().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
})