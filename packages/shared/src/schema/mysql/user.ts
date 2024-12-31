import {index, int, json, mysqlTable, primaryKey, timestamp, varchar, text, uniqueIndex} from "drizzle-orm/mysql-core";


// export const userTypeEnum = pgEnum('user_type', ['TRAVELLER', 'USER']);
//
// export const roleTypeEnum = pgEnum('role_type', ['USER', 'ADMIN']);

export const user = mysqlTable('users', {
  id: varchar('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  imageUrl: varchar('image_url'),
  type: text('user_type'),
  role: text('role_type')
}, (user) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(user.name),
    emailIndex: uniqueIndex('email_idx').on(user.email)
  }
});