import {pgEnum, pgTable, uniqueIndex, varchar} from "drizzle-orm/pg-core";
import {comment} from "./comment";
import {contents, documents} from "./document";
export * from './comment'
export * from './document'

export const userTypeEnum = pgEnum('user_type', ['TRAVELLER', 'USER']);

export const roleTypeEnum = pgEnum('role_type', ['USER', 'ADMIN']);

export const user = pgTable('users', {
  id: varchar('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  imageUrl: varchar('image_url'),
  type: userTypeEnum('user_type'),
  role: roleTypeEnum('role_type')
}, (user) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(user.name),
    emailIndex: uniqueIndex('email_idx').on(user.email)
  }
});

export default {
  comment,
  documents,
  user,
  contents
}