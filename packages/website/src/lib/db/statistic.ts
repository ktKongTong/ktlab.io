import {and, count, eq, like, sql, sum} from "drizzle-orm";
import {db} from "@/lib/db/index";
import {pathPrefix} from "@/config";
import {comment, documents} from "@/interfaces";


export const getCommentStatistic = async ()=> {
  const [commentsCount] = await db.execute<{
    today_count: number
    this_week_count: number
    this_month_count: number
  }>(
    sql`SELECT
  (SELECT COUNT(*) FROM ${comment} WHERE ${comment.createdAt}::date = CURRENT_DATE) AS today_count,
  (SELECT COUNT(*) FROM ${comment} WHERE EXTRACT('YEAR' FROM ${comment.createdAt}) = EXTRACT('YEAR' FROM CURRENT_DATE) AND EXTRACT('WEEK' FROM ${comment.createdAt}) = EXTRACT('WEEK' FROM CURRENT_DATE)) AS this_week_count,
  (SELECT COUNT(*) FROM ${comment} WHERE EXTRACT(YEAR FROM ${comment.createdAt}) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM ${comment.createdAt}) = EXTRACT(MONTH FROM CURRENT_DATE)) AS this_month_count`
  )
  return commentsCount
}

export const getDocumentStatistic = async ()=> {
  // total wordcount
  // total document count
  // published in this month
  // recent blog
  // recent view count
  const [commentsCount] = await db.execute<{
    today_count: number
    this_week_count: number
    this_month_count: number
  }>(
    sql`SELECT
  (SELECT COUNT(*) FROM ${comment} WHERE ${comment.createdAt}::date = CURRENT_DATE) AS today_count,
  (SELECT COUNT(*) FROM ${comment} WHERE EXTRACT('YEAR' FROM ${comment.createdAt}) = EXTRACT('YEAR' FROM CURRENT_DATE) AND EXTRACT('WEEK' FROM ${comment.createdAt}) = EXTRACT('WEEK' FROM CURRENT_DATE)) AS this_week_count,
  (SELECT COUNT(*) FROM ${comment} WHERE EXTRACT(YEAR FROM ${comment.createdAt}) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM ${comment.createdAt}) = EXTRACT(MONTH FROM CURRENT_DATE)) AS this_month_count`
  )
  return commentsCount
}
export const getStatistic = () => {
  return db.execute<{
    comments: number,
  }>(
    sql`
        SELECT
          (SELECT COUNT(*) FROM ${comment}) as comments,
    `)
}

export const getDocumentStats = async () => {
  const currentMonth = sql`EXTRACT('MONTH' FROM CURRENT_DATE)`;
  const currentYear = sql`EXTRACT('YEAR' FROM CURRENT_DATE)`;
  const docMonth = sql`EXTRACT('MONTH' FROM ${documents.createdAt})`;
  const docYear = sql`EXTRACT('YEAR' FROM ${documents.createdAt})`;

  const wordcount = sql`(${documents.mdMetadata}->>'wordcount')::INTEGER`;

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
    .from(documents)
    .where(
      and(
        eq(documents.type, 'file' as const),
        like(documents.relativePath, `${pathPrefix.knowledgebases.basePath}%`),
      )
    );
  const [ docstats ] = await mysql.execute()
  return docstats
};

// TypeScript type for the return value
type DocumentStats = {
  document_count: number;
  total_wordcount: number;
  wordcount_this_month: number;
  wordcount_this_year: number;
  this_month_document_count: number;
  this_year_document_count: number;
};