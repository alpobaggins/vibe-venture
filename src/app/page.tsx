import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { BenefitsSection } from "@/components/benefits-section";
import { FaqSection } from "@/components/faq-section";
import { ApplySection } from "@/components/apply-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <FaqSection />
      <ApplySection />
    </>
  );
}
