"use client";
import { useState, useRef, useContext, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SERVICES } from "@/constants/projects";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const ServiceAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
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

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "bottom bottom-=300",
            end: "bottom top-=300",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(sectionRef.current, {
            rotateX: "12deg",
            scale: 0.92,
            opacity: 0.8,
            transformOrigin: "center bottom",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom bottom-=300",
              end: "bottom bottom-=500",
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
          <div className="space-y-0">
            {SERVICES.map((service, index) => (
              <AccordionItem
                key={index}
                service={service}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default ServiceAccordion;

const AccordionItem: FC<{
  service: IServices;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ service, index, isExpanded, onToggle }) => {
  return (
    <motion.div
      className="border-t border-white/10 cursor-pointer"
      onClick={onToggle}
    >
      {/* Header */}
      <div className="py-6 md:py-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <span className="font-gambetta text-base md:text-xl text-white/40 shrink-0">
            ({String(index + 1).padStart(2, "0")})
          </span>
          <h3 className="text-2xl md:text-[3.5rem] font-anton-sc uppercase leading-[100%] truncate">
            <TextReveal
              splitType="chars"
              direction="up"
              duration={0.7}
              stagger={0.08}
              delay={index * 0.1}
            >
              {service.title.join(" ")}
            </TextReveal>
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pb-12 flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="w-full md:w-[40%] overflow-hidden">
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={service.image}
                    alt={service.title.join(" ")}
                    className="object-cover w-full aspect-[4/3]"
                    quality={90}
                  />
                </motion.div>
              </div>
              <div className="w-full md:w-[60%] flex flex-col justify-between">
                <div>
                  <p className="text-lg md:text-2xl font-semibold leading-[140%] tracking-[-0.0625rem] mb-6 md:mb-8">
                    {service.description}
                  </p>
                  <h4 className="text-base md:text-xl text-white/60 font-gambetta mb-4">
                    ({service.details.title})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.details.services.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-white rounded-full shrink-0" />
                        <p className="text-base md:text-xl font-semibold leading-[130%]">{s}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
