import ServicesInject from "@/components/ui/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARK SPACE | Services",
  description: "Comprehensive interior design, construction management, and space planning services tailored to your vision.",
};

const Services = () => {
  return (
    <main>
      <ServicesInject />
    </main>
  );
};

export default Services;
