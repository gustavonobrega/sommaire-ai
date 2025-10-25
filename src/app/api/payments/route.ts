import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/neon-db/payments";
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  if (endpointSecret) {
    const signature = req.headers.get("stripe-signature");

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature!,
        endpointSecret,
      );

      switch (event.type) {
        case "checkout.session.completed":
          const sessionId = event.data.object.id;
          const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
          });
          await handleCheckoutSessionCompleted({ session, stripe });
          break;
        case "customer.subscription.deleted":
          const subscriptionId = event.data.object.id;
          await handleSubscriptionDeleted({ subscriptionId, stripe });
          break;
        default:
          console.log(`Unhanled event type ${event.type}`);
      }
    } catch (error) {
      console.log(`⚠️ Webhook signature verification failed.`, error);
      return NextResponse.json(
        { error: "Failed to trigger webhook" },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
