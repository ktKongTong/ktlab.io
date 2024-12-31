import {comment} from "./comment";
import {user} from "./user";
import {event} from "./event";
import {contents, documents, obsidian} from "./documents";

export const createMysqlSchema = () => {
  return {
    comment,
    user,
    obsidian,
    contents,
    documents,
    event
  }
}