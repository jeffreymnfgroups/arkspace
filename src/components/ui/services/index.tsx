"use client";
import Navigation from "@/components/common/navigation";
import ServicesHero from "./hero-section";
import ServiceAccordion from "./service-accordion";
import StatsCounter from "./stats-counter";
import ProcessTimeline from "./process-timeline";
import Footer from "../home/footer";

const ServicesInject = () => {
  return (
    <div>
      <Navigation />
      <ServicesHero />
      <ServiceAccordion />
      <StatsCounter />
      <ProcessTimeline />
      <Footer />
    </div>
  );
};

export default ServicesInject;
