import DrizzlePGDB from "@/lib/db/pg";
import {
  AnonymousInsertDBO,
  CommentDBO,
  CommentInsertDBO,
  CommentUpdateDBO,
  ContentDBO,
  DocumentDBO,
  ContentInsertDBO
} from "@/interfaces";
import { Paging } from "@repo/shared";

export interface IDBProvider {
  queryCommentByDocId:(documentId:string,page:number, pageSize:number) => Promise<Paging<CommentDBO>>,
  queryContent:(page:number, pageSize:number) => Promise<Paging<ContentDBO>>,
  getContentOrDocumentById: (contentId: string) => Promise<ContentDBO | DocumentDBO | null>
  insertContent: (content: ContentInsertDBO) => Promise<ContentDBO>
  insertComment: (comment:CommentInsertDBO)=> Promise<CommentDBO>,
  modifyCommentByCommentId: (comment:CommentUpdateDBO)=>Promise<CommentDBO>,
  createUserIfNeed: (user:AnonymousInsertDBO) => Promise<string>,
  queryHistoryByCommentId: (commentId:string) => Promise<CommentDBO[]>
  getCommentByCommentId: (commentId: string) => Promise<CommentDBO | null>
}


const DB = (connectionString:string):IDBProvider => {
  return new  DrizzlePGDB(connectionString)
}

export default DB