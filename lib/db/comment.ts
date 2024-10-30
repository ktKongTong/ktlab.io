import {db} from "@/lib/db/index";
import {comment, documents} from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import {z} from "zod";
import {CommentWithDocumentDto} from "@/interfaces/dbo";

export const getRecentComments = (limit: number = 10) => {
  return db.select(
    {
      id: comment.id,
      version: comment.version,
      documentId: comment.documentId,
      authorId: comment.authorId,
      body: comment.body,
      userInfo: comment.userInfo,
      parentId: comment.parentId,
      createdAt: comment.createdAt,
      documentInfo: documents,
    }
  ).from(comment)
    .innerJoin(documents, eq(comment.documentId, documents.id))
    .orderBy(comment.createdAt)
    .limit(limit)
}


export const getRecentDocuments = (limit: number = 10) => {
  return db.select().from(documents)
    .orderBy(documents.createdAt)
    .limit(limit)
}

// export const DocumentDTO