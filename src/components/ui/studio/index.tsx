"use client";
import HeroSection from "./hero-section";
import OurStory from "./our-story";
import Footer from "../home/footer";
import Navigation from "@/components/common/navigation";

const StudioInject = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <OurStory />
      <Footer />
    </div>
  );
};

export default StudioInject;
