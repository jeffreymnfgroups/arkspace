"use client";
import { useRef, useContext, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/constants/projects";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const ProcessTimeline = () => {
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
          <div className="mb-12 md:mb-16">
            <p className="font-gambetta text-lg md:text-2xl text-white/60 mb-6">
              <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08}>
                (Our Process)
              </TextReveal>
            </p>
            <h2 className="text-4xl md:text-[5rem] lg:text-[8rem] font-anton-sc uppercase leading-[100%]">
              {["How We", "Work"].map((word, i) => (
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={i * 0.2}
                  key={i}
                >
                  {word}
                </TextReveal>
              ))}
            </h2>
          </div>

          <div className="space-y-0">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProcessTimeline;

const ProcessStep = ({
  step,
  index,
}: {
  step: IProcessStep;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border-t border-white/10 py-8 md:py-10 flex flex-col md:flex-row items-start gap-4 md:gap-12 group hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4"
    >
      <span className="text-[2.5rem] md:text-[4rem] font-anton-sc text-white/20 leading-[100%] group-hover:text-white/60 transition-colors duration-300 w-auto md:w-32 shrink-0">
        {step.number}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl md:text-[2.5rem] font-semibold leading-[120%] tracking-[-0.0625rem] mb-4 group-hover:translate-x-4 transition-transform duration-300">
          {step.title}
        </h3>
        <p className="text-base md:text-xl text-white/50 leading-[170%] max-w-[600px]">
          {step.description}
        </p>
      </div>
      <motion.div
        className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:border-white/40 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 12L12 4M12 4H6M12 4V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
};
