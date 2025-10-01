import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import PricingSection from "@/components/home/pricing-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <HeroSection />
      <HowItWorksSection />
      <PricingSection />
    </div>
  );
}
