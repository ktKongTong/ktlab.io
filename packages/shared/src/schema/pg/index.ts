import {comment} from "./comment";
import {user} from "./user";
import {event} from "./event";
import {contents, documents, obsidian} from "./documents";

export const createPgSchema = () => {
  return {
    comment,
    user,
    obsidian,
    event,
    contents,
    documents,
  }
}