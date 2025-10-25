import { getDbConnection } from "@/lib/neon-db/db";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import type Stripe from "stripe";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDbConnection();

    await sql`UPDATE users SET status = 'inactive' WHERE customer_id = ${subscription.customer}`;

    console.log("Subscription cancelled successfully", subscriptionId);
  } catch (error) {
    console.error("Error handling subscription deletion:", error);
    throw error;
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && priceId) {
    try {
      const { email, name } = customer;

      const sql = await getDbConnection();

      await createOrUpdateUser({
        sql,
        email: email as string,
        full_name: name as string,
        customerId,
        priceId: priceId as string,
        status: "active",
      });

      await createPayment({
        sql,
        session,
        priceId: priceId as string,
        userEmail: email as string,
      });
    } catch (error) {
      console.error("Error handling checkout session:", error);
      throw error;
    }
  }
}

async function createOrUpdateUser({
  sql,
  email,
  full_name,
  customerId,
  priceId,
  status,
}: {
  sql: NeonQueryFunction<false, false>;
  email: string;
  full_name: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id, price_id, status)
            VALUES (${email}, ${full_name}, ${customerId}, ${priceId}, ${status})`;
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error;
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  userEmail,
}: {
  sql: NeonQueryFunction<false, false>;
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const { amount_total, id, status } = session;
    await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
            VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}
