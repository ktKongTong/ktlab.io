import {db} from "@/lib/db/index";
import {comment, documents, DocumentVO, CommentWithDocumentVO} from "@/interfaces";
import {eq} from "drizzle-orm";

export const getRecentComments = async (limit: number = 10):Promise<CommentWithDocumentVO[]> => {
  const res = await db.select(
    {
      id: comment.id,
      version: comment.version,
      documentId: comment.documentId,
      state: comment.state,
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
  return res
}


export const getRecentDocuments = (limit: number = 10):Promise<DocumentVO[]> => {
  return db.select().from(documents)
    .orderBy(documents.createdAt)
    .limit(limit)
}

// export const DocumentDTO