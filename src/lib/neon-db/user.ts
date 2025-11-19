import { BASIC_UPLOAD_LIMIT, PLANS } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

  return query?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit(userId: string, email: string) {
  const uploadCount = await getUserUploadCount(userId);

  const priceId = await getPriceIdForActiveUser(email);

  const isPro = PLANS.find((plan) => plan.priceId === priceId)?.id === "pro";

  const uploadLimit = isPro ? 1000 : BASIC_UPLOAD_LIMIT;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}

export async function hasActivePlan(email: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id, status FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`;

  return query && query.length > 0;
}
