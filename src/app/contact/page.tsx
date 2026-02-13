import ContactInject from "@/components/ui/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARK SPACE | Contact",
  description: "Get in touch with ARK SPACE. Let us bring your architectural vision to life.",
};

const Contact = () => {
  return (
    <main>
      <ContactInject />
    </main>
  );
};

export default Contact;
