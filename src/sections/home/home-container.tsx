import HomeHeroSection from "./home-hero-section/home-hero-section";
import HomeFeaturesSection from "./home-features-section/home-features-section";
import HomeProcessSection from "./home-process-section/home-process-section";
import HomeCtaSection from "./home-cta-section/home-cta-section";

export default function HomeContainer() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <HomeHeroSection />

      {/* Features Section */}
      <HomeFeaturesSection />

      {/* Process Section */}
      <HomeProcessSection />

      {/* CTA Section */}
      <HomeCtaSection />
    </div>
  );
}
