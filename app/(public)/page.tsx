import type { Metadata } from "next";

import { HeroVideo } from "@/components/home/HeroVideo";
import { MapSection } from "@/components/home/MapSection";
import { MethodSteps } from "@/components/home/MethodSteps";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StatsBar } from "@/components/home/StatsBar";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { WelcomeBlock } from "@/components/home/WelcomeBlock";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
};

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <StatsBar />
      <WelcomeBlock />
      <ServicesGrid />
      <MethodSteps />
      <TestimonialsSlider />
      <NewsletterSection />
      <MapSection />
    </>
  );
}
