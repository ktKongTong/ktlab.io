import {documents} from "./document";
import {contents} from "./content";
import {obsidian} from "./obsidian";
import {pgView, timestamp, varchar} from "drizzle-orm/pg-core";
import {eq, sql} from "drizzle-orm";
export type ContentSelect = typeof contents.$inferSelect
export type ContentInsert = typeof contents.$inferInsert


export type DocumentSelect = typeof documents.$inferSelect
export type DocumentInsert = typeof documents.$inferInsert

export {documents, contents, obsidian}

export const obsidianView = pgView("document_obsidian_view")
  .as((qb) =>
    qb.select({
      id: documents.id,
      parentId: documents.parentId,
      createdAt: documents.createdAt,
      lastModifiedAt: documents.lastModifiedAt,
      namespace: documents.namespace,
      dataSource: documents.dataSource,
      type: sql<string | null>`${obsidian.type}`.as('type'),
      tags: obsidian.tags,
      title: sql<string | null>`${obsidian.title}`.as('title'),
      content: sql<string | null>`null::text`.as('content'),
      path: sql<string | null>`${obsidian.relativePath}::text`.as('path'),
      metadata: sql<object | null>`${obsidian.mdMetadata}::jsonb`.as('metadata'),
    })
      .from(documents)
      .where(eq(documents.dataSource, 'obsidian'))
      .leftJoin(obsidian, eq(obsidian.documentId, documents.id))
  )
export const contentView = pgView("document_content_view")
  .as((qb) =>
    qb.select({
      id: documents.id,
      parentId: documents.parentId,
      createdAt: documents.createdAt,
      lastModifiedAt: documents.lastModifiedAt,
      namespace: documents.namespace,
      dataSource: documents.dataSource,
    type: sql<string | null>`null::text`.as('type'),
      tags: contents.tags,
      title: contents.title,
      content: sql<string | null>`${contents.content}`.as('content'),
      path: sql<string | null>`null::text`.as('path'),
      metadata: sql<object | null>`null::jsonb`.as('metadata'),
    })
      .from(documents)
      .where(eq(documents.dataSource, 'self'))
      .leftJoin(contents, eq(contents.documentId, documents.id))
  );

export const documentView = pgView('document_view')
  .as((qb) =>
    qb
    .select()
    .from(obsidianView)
    .union(qb.select().from(contentView))
  )