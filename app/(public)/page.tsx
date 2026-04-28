import type { Metadata } from "next";

import { HeroVideo } from "@/components/home/HeroVideo";
import { MapSection } from "@/components/home/MapSection";
import { MethodSteps } from "@/components/home/MethodSteps";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StatsBar } from "@/components/home/StatsBar";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { WelcomeBlock } from "@/components/home/WelcomeBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["BeautySalon", "MedicalBusiness"],
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: CONTACT.phone1,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pasaje Dulcinea del Toboso 3",
    addressLocality: "Ciudad Real",
    postalCode: "13001",
    addressCountry: "ES",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: [CONTACT.instagram, CONTACT.facebook, CONTACT.youtube],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "200",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
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
