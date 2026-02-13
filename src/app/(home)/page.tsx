import { HomeInject } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARK SPACE | Build & Design",
  description: "Designing spaces that define you. Premium interior design, construction, and space planning.",
};

export default function Home() {
  return (
    <div className="">
      <HomeInject />
    </div>
  );
}
