import DrizzlePGDB from "@/lib/db/pg";
import {CommentDto, TravellerInsertDBO} from "@/interfaces/dbo";
import {CommentInsertBO, CommentUpdateBO} from "@/interfaces/vo";

export interface IDBProvider {
  queryCommentByDocId:(documentId:string,page:number, pageSize:number) => Promise<CommentDto[]>,
  insertComment: (comment:CommentInsertBO)=> Promise<any>,
  modifyCommentByCommentId: (comment:CommentUpdateBO)=>Promise<void>,
  createUserIfNeed: (user:TravellerInsertDBO) => Promise<string>,
  queryHistoryByCommentId: (commentId:string) => Promise<CommentDto[]>
}

const DB = (connectionString:string):IDBProvider => {
  return new  DrizzlePGDB(connectionString)
}

export default DB