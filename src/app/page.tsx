import { HeroDemo } from "@/components/ui/demo";
import { HeaderDemo } from "@/components/ui/header-demo";
import { StatsDemo } from "@/components/ui/stats-demo";
import { FeatureDemo } from "@/components/ui/feature-demo";
import { FeatureDemo as SecurityFeatureDemo } from "@/components/ui/feature-demo-new";
import { HowItWorksDemo } from "@/components/ui/how-it-works-demo";
import { TestimonialsDemo } from "@/components/ui/testimonials-demo";
import { PricingDemo } from "@/components/ui/pricing-demo";
import { FooterDemo } from "@/components/ui/footer-demo";

export default function Home() {
  return (
    <div>
      <HeaderDemo />
      <HeroDemo />
      <StatsDemo />
      <div id="features">
        <FeatureDemo />
      </div>
      <div id="how-it-works">
        <HowItWorksDemo />
      </div>
      <TestimonialsDemo />
      <div id="pricing">
        <PricingDemo />
      </div>
      <SecurityFeatureDemo />
      <div id="contact">
        <FooterDemo />
      </div>
    </div>
  );
}
