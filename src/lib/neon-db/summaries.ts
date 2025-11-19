import { executeQuery, getDbConnection } from "@/lib/neon-db/db";
import type { SummaryByIdType, SummaryType } from "@/types/database";

export async function getSummaries(userId: string) {
  const query = `SELECT * from pdf_summaries
      WHERE user_id = $1
      ORDER BY created_at DESC`;

  const summaries = await executeQuery<SummaryType[]>(query, userId);

  return summaries;
}

export async function getSummaryById(id: string) {
  const query = `SELECT *, 
      LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 AS word_count
      FROM pdf_summaries WHERE id = $1`;

  const { success, data, error } = await executeQuery<SummaryByIdType[]>(
    query,
    id,
  );

  if (!data) {
    return { success, data: null, error };
  }

  return { success, data: data[0], error };
}

export async function getUserUploadCount(userId: string) {
  const sql = await getDbConnection();

  try {
    const [result] = await sql`
      SELECT COUNT(*) AS count
      FROM pdf_summaries
      WHERE user_id = ${userId}
    `;

    const r = result as Record<string, unknown>;
    return r?.count ? Number(r.count) : 0;
  } catch (error: unknown) {
    console.error("Error fetching user upload count:", error);

    return 0;
  }
}
