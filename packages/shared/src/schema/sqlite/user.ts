import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const user = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name', { length: 256 }),
  email: text('email', { length: 256 }),
  imageUrl: text('image_url'),
  type: text('user_type', {enum: ['TRAVELLER', 'USER']}),
  role: text('role_type', {enum: ['USER', 'ADMIN']})
}, (user) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(user.name),
    emailIndex: uniqueIndex('email_idx').on(user.email)
  }
});