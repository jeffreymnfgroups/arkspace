"use client";
import Navigation from "@/components/common/navigation";
import AboutHero from "./hero-section";
import Milestones from "./milestones";
import OurStory from "../studio/our-story";
import Footer from "../home/footer";

const AboutInject = () => {
  return (
    <div>
      <Navigation />
      <AboutHero />
      <Milestones />
      <OurStory />
      <Footer />
    </div>
  );
};

export default AboutInject;
