import { createPgSchema } from './pg'
import {createSqliteSchema} from "./sqlite";
import {createMysqlSchema} from "./mysql";

export type PGSchema = ReturnType<typeof createPgSchema>
export type SQLiteSchema = ReturnType<typeof createPgSchema>
export type MysqlSchema = ReturnType<typeof createPgSchema>

export type Schema = {
  'PG': PGSchema,
  'Sqlite': SQLiteSchema,
  'Mysql': MysqlSchema,
}

export const createSchema = (dialect: 'pg' | 'sqlite' | 'mysql') => {
  switch (dialect) {
    case 'pg': return createPgSchema()
    case 'mysql': return createSqliteSchema()
    case "sqlite": return createMysqlSchema()
  }
}