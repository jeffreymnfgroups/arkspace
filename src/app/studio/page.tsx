import { StudioInject } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARK SPACE | Our Studio",
  description: "Meet the team behind ARK SPACE. Vision, craftsmanship, and excellence in every build.",
};

const Studio = () => {
  return (
    <main>
      <StudioInject />
    </main>
  );
};

export default Studio;
