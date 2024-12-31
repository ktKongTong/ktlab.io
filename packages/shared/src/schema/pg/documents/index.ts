import {documents} from "./document";
import {contents} from "./content";
import {obsidian} from "./obsidian";
export type ContentSelect = typeof contents.$inferSelect
export type ContentInsert = typeof contents.$inferInsert


export type DocumentSelect = typeof documents.$inferSelect
export type DocumentInsert = typeof documents.$inferInsert

export {documents, contents, obsidian}