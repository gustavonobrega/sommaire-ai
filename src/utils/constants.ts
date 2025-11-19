export const BASIC_UPLOAD_LIMIT = 5;

export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_4gMfZg49de7M7Xvfcvawo00"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1SL0TxCzhal9DsPs4RsI8fo2"
        : "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_8x24gyaxB0gWgu1d4nawo01"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1SL0WLCzhal9DsPsLIK5mltq"
        : "",
  },
];
