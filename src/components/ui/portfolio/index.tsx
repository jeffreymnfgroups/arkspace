"use client";
import Navigation from "@/components/common/navigation";
import PortfolioHero from "./hero-section";
import ProjectGrid from "./project-grid";
import Footer from "../home/footer";

const PortfolioInject = () => {
  return (
    <div>
      <Navigation />
      <PortfolioHero />
      <ProjectGrid />
      <Footer />
    </div>
  );
};

export default PortfolioInject;
