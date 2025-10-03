import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import GradientBadge from "../common/gradient-badge";
import HighlightedText from "../common/highlighted-text";

export default function HeroSection() {
  return (
    <section className="relative z-0 max-w-7xl mx-auto flex flex-col items-center justify-center animate-in transition-all py-16 sm:py-20 lg:pb-28 lg:px-12">
      <GradientBadge icon={Sparkles}>Powered By AI</GradientBadge>
      <h1 className="font-bold py-6 text-center">
        Transform PDFs into <HighlightedText>concise</HighlightedText> summaries
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds.
      </h2>
      <Button
        variant="link"
        asChild
        className="text-white mt-6 font-bold text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:bg-linear-to-l hover:scale-x-105 duration-300 hover:duration-500 ease-[linear(0,0.253_15.1%,0.418_23.4%,0.608_31%,0.999_44.7%,0.837_52.4%,0.798_55.8%,0.786_59.1%,0.795_62.1%,0.824_65.3%,0.999_77.4%,0.969_81.2%,0.96_84.7%,0.995_95.4%,1)] hover:no-underline transition-transform will-change-transform"
      >
        <Link href="/#pricing" className="flex gap-2 items-center">
          Try Sommaire
          <span>
            <ArrowRight className="animate-pulse" />
          </span>
        </Link>
      </Button>
    </section>
  );
}
