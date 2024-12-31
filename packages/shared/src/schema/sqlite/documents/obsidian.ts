import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import {documents} from "./document";
import {MDMetadata} from "../../../base";

export const obsidian = sqliteTable('obsidian_content', {
    id: text('id').notNull().primaryKey(),
    title: text('title').notNull(),
    createdAt: integer('created_at', {mode: 'timestamp'}).notNull().defaultNow(),
    lastModifiedAt: integer('last_modified_at', {mode: 'timestamp'}).notNull().defaultNow(),
    parentId: text('parent_id'),
    documentId: text('document_id').references(() => documents.id),
    tags: text('tags', {mode: 'json'}).notNull().default([]),
    type: text('type', {enum: ['folder', 'file']}).notNull(),
    relativePath: text('path').notNull().default(''),
    mdMetadata: text('md_metadata', {mode: 'json'}).$type<MDMetadata>(),
    },
  // (t) => ({
  //   foreignerKey: t.id,
  // })
)