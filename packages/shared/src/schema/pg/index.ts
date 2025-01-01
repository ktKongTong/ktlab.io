import {comment} from "./comment";
import {user} from "./user";
import {event} from "./event";
import {contents, contentView, documents, obsidian, obsidianView} from "./documents";

export const createPgSchema = () => {
  return {
    comment,
    user,
    obsidian,
    event,
    contents,
    documents,
    obsidianView,
    contentView,
  }
}

export {
  comment,
  user,
  obsidian,
  event,
  contents,
  documents,
  obsidianView,
  contentView,
}