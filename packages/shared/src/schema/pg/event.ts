import {pgTable, timestamp, uniqueIndex, varchar} from "drizzle-orm/pg-core";

export const event = pgTable('event', {
  id: varchar('id').notNull().primaryKey(),
  type: varchar('name', { length: 256 }),
  actor: varchar('user_id', { length: 256 }),
  actionType: varchar('action_type', { length: 256 }),
  subjectType: varchar('subject_type', {length: 256}),
  subjectInfo: varchar('subject_id', { length: 256 }),
  createdAt: timestamp('timestamp').notNull().defaultNow()
});