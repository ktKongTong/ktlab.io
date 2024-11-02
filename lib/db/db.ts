import DrizzlePGDB from "@/lib/db/pg";
import {AnonymousInsertDBO, CommentDBO, CommentInsertDBO, CommentUpdateDBO} from "@/interfaces/dbo";

export interface IDBProvider {
  queryCommentByDocId:(documentId:string,page:number, pageSize:number) => Promise<CommentDBO[]>,
  insertComment: (comment:CommentInsertDBO)=> Promise<CommentDBO>,
  modifyCommentByCommentId: (comment:CommentUpdateDBO)=>Promise<CommentDBO>,
  createUserIfNeed: (user:AnonymousInsertDBO) => Promise<string>,
  queryHistoryByCommentId: (commentId:string) => Promise<CommentDBO[]>
}

const DB = (connectionString:string):IDBProvider => {
  return new  DrizzlePGDB(connectionString)
}

export default DB