import PortfolioInject from "@/components/ui/portfolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARK SPACE | Portfolio",
  description: "Explore our curated collection of architectural masterpieces, luxury interiors, and transformative spaces.",
};

const Portfolio = () => {
  return (
    <main>
      <PortfolioInject />
    </main>
  );
};

export default Portfolio;
