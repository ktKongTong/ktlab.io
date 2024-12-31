import {comment} from "./comment";
import {user} from "./user";
import {contents, documents, obsidian} from "./documents";
import {event} from './event'
export const createSqliteSchema = () => {
  return {
    comment,
    user,
    obsidian,
    event,
    contents,
    documents,
  }
}