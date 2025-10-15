import type { QueryResult } from "@/types/database";
import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Neon Database URL is not defined");
  }
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

export async function executeQuery<T = unknown>(
  query: string,
  ...params: unknown[]
): Promise<QueryResult<T>> {
  const sql = await getDbConnection();

  try {
    const result = await sql.query(query, params);
    return { success: true, data: result as T, error: null };
  } catch (error) {
    console.error("Error querying the database:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error ? error.message : "Error querying the database",
    };
  }
}
