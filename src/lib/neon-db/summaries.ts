import { executeQuery } from "@/lib/neon-db/db";
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
