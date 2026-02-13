import AboutInject from "@/components/ui/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARK SPACE | About Us",
  description: "Learn about ARK SPACE - our story, team, milestones, and commitment to architectural excellence.",
};

const About = () => {
  return (
    <main>
      <AboutInject />
    </main>
  );
};

export default About;
