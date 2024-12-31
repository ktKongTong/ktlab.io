import {index, int, json, mysqlTable, primaryKey, timestamp, varchar, text, uniqueIndex} from "drizzle-orm/mysql-core";

import {documents} from "./document";
import {MDMetadata} from "../../../base";

export const obsidian = mysqlTable('obsidian_content', {
    id: varchar('id').notNull().primaryKey(),
    title: varchar('title').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
    parentId: varchar('parent_id'),
    documentId: varchar('document_id').references(() => documents.id),
    tags: json('tags').notNull().default([]),
    type: varchar('type', {enum: ['folder', 'file']}).notNull(),
    relativePath: varchar('path').notNull().default(''),
    mdMetadata: json('md_metadata').$type<MDMetadata>(),
},
  // (t) => ({
  //   foreignerKey: t.id,
  // })
)