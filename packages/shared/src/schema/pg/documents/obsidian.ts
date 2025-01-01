import {jsonb, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {documents} from "./document";
import {MDMetadata} from "../../../base";

export const obsidian = pgTable('obsidian_content', {
    id: varchar('id').notNull().primaryKey(),
    title: varchar('title').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastModifiedAt: timestamp('last_modified_at').notNull().defaultNow(),
    parentId: varchar('parent_id'),
    documentId: varchar('document_id').references(() => documents.id),
    tags: varchar('tags').array().notNull().default([]),
    type: varchar('type', {enum: ['folder', 'file']}).notNull(),
    relativePath: varchar('path').notNull().default(''),
    mdMetadata: jsonb('md_metadata').$type<MDMetadata>(),
    }
)

//obsidian
// paging by namespace
// use store -> metadata