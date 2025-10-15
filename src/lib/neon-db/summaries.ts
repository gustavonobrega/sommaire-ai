import { executeQuery } from "@/lib/neon-db/db";
import type { SummaryType } from "@/types/database";

export async function getSummaries(userId: string) {
  const query = `SELECT * from pdf_summaries
      WHERE user_id = $1
      ORDER BY created_at DESC`;

  const summaries = await executeQuery<SummaryType[]>(query, userId);

  return summaries;
}
