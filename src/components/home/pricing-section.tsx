import { cn } from "@/lib/utils";
import { PLANS } from "@/utils/constants";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  paymentLink: string;
  priceId: string;
  items: string[];
};

export default function PricingSection() {
  return (
    <section id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
          {PLANS.map((plan: Plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: Plan) {
  return (
    <div className="w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "flex flex-col h-full gap-4 lg:gap-8 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2",
        )}
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
          <p>{description}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <ul className="space-y-2.5 leading-relaxed text-base">
          {items.map((item, idx) => (
            <li className="flex items-center gap-2" key={idx}>
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-2 flex justify-center mt-auto w-full">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:bg-linear-to-l text-white border-2 py-2",
              id === "pro"
                ? "border-rose-900"
                : "from-rose-400 to-rose-500 border-rose-100",
            )}
          >
            Buy Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
