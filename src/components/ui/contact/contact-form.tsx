"use client";
import { useRef, useState, useContext, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    label: "Email",
    value: "hello@arkspace.studio",
    href: "mailto:hello@arkspace.studio",
  },
  {
    label: "Phone",
    value: "+91 85084 14325",
    href: "tel:+918508414325",
  },
  {
    label: "Address",
    value: "Kanyakumari, Nagercoil",
    href: "#",
  },
];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Behance", href: "#" },
];

const ContactForm = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useEffect(() => {
    if (!isLoading && animationComplete) {
      const ctx = gsap.context(() => {
        setTimeout(() => {
          gsap.to(contentRef.current, {
            rotateX: "0deg",
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
          });
        }, 100);
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [isLoading, animationComplete]);

  return (
    <section
      ref={sectionRef}
      className="bg-inverse-1 min-h-screen perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        <div className="w-[90%] mx-auto max-w-[1440px] py-12 md:py-[6rem] px-4 md:px-0">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Left - Contact Info */}
            <div className="w-full md:w-[40%] flex flex-col justify-between">
              <div>
                <p className="font-gambetta text-lg md:text-2xl text-white/60 mb-6 md:mb-8">
                  <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08}>
                    (Get In Touch)
                  </TextReveal>
                </p>
                <p className="text-base md:text-xl text-white/60 leading-[170%] mb-8 md:mb-12">
                  {[
                    "Have a project in mind? We would",
                    "love to hear from you. Drop us a",
                    "line and let us bring your vision",
                    "to life.",
                  ].map((line, i) => (
                    <TextReveal
                      splitType="lines"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={i * 0.05}
                      key={i}
                    >
                      {line}
                    </TextReveal>
                  ))}
                </p>

                <div className="space-y-8">
                  {CONTACT_INFO.map((info, index) => (
                    <ContactInfoItem key={index} info={info} index={index} />
                  ))}
                </div>
              </div>

              <div className="mt-12 md:mt-16">
                <p className="font-gambetta text-lg text-white/40 mb-4">
                  (Follow Us)
                </p>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {SOCIAL_LINKS.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="text-lg font-semibold text-white/60 hover:text-white transition-colors duration-300 relative group"
                      whileHover={{ y: -2 }}
                    >
                      {social.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="w-full md:w-[60%]">
              <FormSection />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ContactForm;

const ContactInfoItem = ({
  info,
  index,
}: {
  info: { label: string; value: string; href: string };
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={info.href}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="block group"
    >
      <span className="text-sm font-gambetta text-white/40 uppercase tracking-wider">
        {info.label}
      </span>
      <p className="text-xl font-semibold mt-1 group-hover:translate-x-2 transition-transform duration-300">
        {info.value}
      </p>
    </motion.a>
  );
};

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const fields = [
    { name: "name", label: "Your Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
  ];

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-0">
      {fields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="border-t border-white/10"
        >
          <label className="block py-6">
            <span
              className={`text-sm font-gambetta uppercase tracking-wider transition-colors duration-300 ${
                focusedField === field.name ? "text-white" : "text-white/40"
              }`}
            >
              {field.label}
            </span>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent text-2xl font-semibold mt-2 outline-none placeholder:text-white/20 focus:placeholder:text-white/10 transition-colors"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
            />
          </label>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border-t border-white/10"
      >
        <label className="block py-6">
          <span
            className={`text-sm font-gambetta uppercase tracking-wider transition-colors duration-300 ${
              focusedField === "projectType" ? "text-white" : "text-white/40"
            }`}
          >
            Project Type
          </span>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            onFocus={() => setFocusedField("projectType")}
            onBlur={() => setFocusedField(null)}
            className="w-full bg-transparent text-2xl font-semibold mt-2 outline-none appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#1a1a1a]">
              Select a project type
            </option>
            <option value="residential" className="bg-[#1a1a1a]">
              Residential
            </option>
            <option value="commercial" className="bg-[#1a1a1a]">
              Commercial
            </option>
            <option value="renovation" className="bg-[#1a1a1a]">
              Renovation
            </option>
            <option value="interior" className="bg-[#1a1a1a]">
              Interior Design
            </option>
            <option value="consultation" className="bg-[#1a1a1a]">
              Consultation
            </option>
          </select>
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-white/10"
      >
        <label className="block py-6">
          <span
            className={`text-sm font-gambetta uppercase tracking-wider transition-colors duration-300 ${
              focusedField === "message" ? "text-white" : "text-white/40"
            }`}
          >
            Your Message
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            rows={4}
            className="w-full bg-transparent text-xl font-semibold mt-2 outline-none placeholder:text-white/20 resize-none"
            placeholder="Tell us about your project..."
          />
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="border-t border-white/10 pt-8"
      >
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-6 bg-white text-background text-xl font-bold uppercase tracking-wider hover:bg-white/90 transition-colors duration-300"
        >
          Send Message
        </motion.button>
      </motion.div>
    </form>
  );
};
