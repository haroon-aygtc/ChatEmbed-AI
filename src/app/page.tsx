import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { DashboardPreview } from "@/components/sections/dashboard-preview";
import { IntegrationSection } from "@/components/sections/integration-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <IntegrationSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />

      {/* Authentication Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/auth/login">
          <Button size="lg" className="shadow-lg">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
