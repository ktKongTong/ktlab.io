import {f} from '@/lib/fetch'
import {AvailableReactionType} from "@/config/reaction";
import {CommentVO, ContentReaction, ContentVO} from "@repo/shared/vo";
import {Paging} from "@repo/shared";
class API {


  constructor() {


  }

  getFragmentContent(page: number) {
    return f.get<Paging<ContentVO>>(`/api/fragment`, {
      query: {
        page: page
      }
    })
  }

  getRecentActivity(type: string) {
    return f.get(`/api/route/${type}/activity/recent`)
  }

  getDocumentDetailById(type:string) {

  }
  getComments(id: string, page: number = 1) {
    return f.get<Paging<CommentVO>>(`/api/document/${id}/comment`, {
      query: {
        page: page
      }
    })
  }

  getCommentEditHistory(id: string) {
  }

  addComment(id: string, comment: string, parentId?: string) {
    return f.put<CommentVO>(`/api/document/${id}/comment`, {
      body: {
        documentId: id,
        body: {
          text: comment,
        },
        parentId: parentId,
      },
    })
  }

  getReaction(id: string) {
    return f.get<ContentReaction>(`/api/document/${id}/interaction-data`)
  }
  patchReaction(id: string, type: AvailableReactionType) {
    return f.patch(`/api/document/${id}/reactions?type=${type}`)
  }
}

export const api = new API()