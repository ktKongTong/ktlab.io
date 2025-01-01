import {and, count, eq, like, sql, sum} from "drizzle-orm";
import {DBMap} from "./type";
import type {Schema} from "../schema";


export const createDAO = (db: DBMap['pgjs'], t: Schema['PG']) => {

  const getCommentStatistic = async ()=> {
    const [commentsCount] = await db.execute<{
      today_count: number
      this_week_count: number
      this_month_count: number
    }>(
      sql`SELECT
  (SELECT COUNT(*) FROM ${t.comment} WHERE ${t.comment.createdAt}::date = CURRENT_DATE) AS today_count,
  (SELECT COUNT(*) FROM ${t.comment} WHERE EXTRACT('YEAR' FROM ${t.comment.createdAt}) = EXTRACT('YEAR' FROM CURRENT_DATE) AND EXTRACT('WEEK' FROM ${t.comment.createdAt}) = EXTRACT('WEEK' FROM CURRENT_DATE)) AS this_week_count,
  (SELECT COUNT(*) FROM ${t.comment} WHERE EXTRACT(YEAR FROM ${t.comment.createdAt}) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM ${t.comment.createdAt}) = EXTRACT(MONTH FROM CURRENT_DATE)) AS this_month_count`
    )
    return commentsCount
  }

  const getDocumentStatistic = async ()=> {
    const [commentsCount] = await db.execute<{
      today_count: number
      this_week_count: number
      this_month_count: number
    }>(
      sql`SELECT
  (SELECT COUNT(*) FROM ${t.comment} WHERE ${t.comment.createdAt}::date = CURRENT_DATE) AS today_count,
  (SELECT COUNT(*) FROM ${t.comment} WHERE EXTRACT('YEAR' FROM ${t.comment.createdAt}) = EXTRACT('YEAR' FROM CURRENT_DATE) AND EXTRACT('WEEK' FROM ${t.comment.createdAt}) = EXTRACT('WEEK' FROM CURRENT_DATE)) AS this_week_count,
  (SELECT COUNT(*) FROM ${t.comment} WHERE EXTRACT(YEAR FROM ${t.comment.createdAt}) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM ${t.comment.createdAt}) = EXTRACT(MONTH FROM CURRENT_DATE)) AS this_month_count`
    )
    return commentsCount
  }

  const getStatistic = () => {
    return db.execute<{
      comments: number,
    }>(
      sql`
        SELECT
          (SELECT COUNT(*) FROM ${t.comment}) as comments,
    `)
  }

  const getDocumentStats = async () => {
    const currentMonth = sql`EXTRACT('MONTH' FROM CURRENT_DATE)`;
    const currentYear = sql`EXTRACT('YEAR' FROM CURRENT_DATE)`;
    const docMonth = sql`EXTRACT('MONTH' FROM ${t.documents.createdAt})`;
    const docYear = sql`EXTRACT('YEAR' FROM ${t.documents.createdAt})`;

    const wordcount = sql`(${t.documents.mdMetadata}->>'wordcount')::INTEGER`;

    const mysql = db.select({
      document_count: sql<number>`COUNT(*)`,
      total_wordcount: sql<number>`SUM(${wordcount})`,
      wordcount_this_month: sql<number>`SUM(
      CASE
        WHEN ${docMonth} = ${currentMonth}
        AND ${docYear} = ${currentYear}
        THEN ${wordcount}
        ELSE 0
      END
    )`,
      wordcount_this_year: sql<number>`SUM(
      CASE
        WHEN ${docYear} = ${currentYear}
        THEN ${wordcount}
        ELSE 0
      END
    )`,
      this_month_document_count: sql<number>`COUNT(
      CASE
        WHEN ${docMonth} = ${currentMonth}
        AND ${docYear} = ${currentYear}
        THEN 1
      END
    )`,
      this_year_document_count: sql<number>`COUNT(
      CASE
        WHEN ${docYear} = ${currentYear}
        THEN 1
      END
    )`
    })
      .from(t.documents)
      .where(
        and(
          eq(t.documents.type, 'file' as const),
          like(t.documents.relativePath, `${pathPrefix.knowledgebases.basePath}%`),
        )
      );
    const [ docstats ] = await mysql.execute()
    return docstats
  };
}





// TypeScript type for the return value
type DocumentStats = {
  document_count: number;
  total_wordcount: number;
  wordcount_this_month: number;
  wordcount_this_year: number;
  this_month_document_count: number;
  this_year_document_count: number;
};