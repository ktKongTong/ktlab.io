import { sqliteTable, uniqueIndex, text, integer} from "drizzle-orm/sqlite-core";

export const event = sqliteTable('event', {
  id: text('id').notNull().primaryKey(),
  type: text('name', { length: 256 }),
  actor: text('user_id', { length: 256 }),
  actionType: text('action_type', { length: 256 }),
  subjectType: text('subject_type', {length: 256}),
  subjectInfo: text('subject_id', { length: 256 }),
  createdAt: integer('timestamp', {mode: 'timestamp'}).notNull().defaultNow()
});