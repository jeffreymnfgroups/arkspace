"use client";
import { useRef, useContext, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MILESTONES } from "@/constants/projects";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const Milestones = () => {
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
                (Our Journey)
              </TextReveal>
            </p>
            <h2 className="text-4xl md:text-[5rem] lg:text-[8rem] font-anton-sc uppercase leading-[100%]">
              {["Key", "Milestones"].map((word, i) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MILESTONES.map((milestone, index) => (
              <MilestoneCard key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Milestones;

const MilestoneCard = ({
  milestone,
  index,
}: {
  milestone: IMilestone;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border-t border-white/10 pt-8 group hover:border-white/30 transition-colors duration-300"
    >
      <span className="text-[2.5rem] md:text-[4rem] font-anton-sc text-white/20 leading-[100%] block mb-4 group-hover:text-white/50 transition-colors duration-300">
        {milestone.year}
      </span>
      <h3 className="text-xl md:text-2xl font-semibold leading-[130%] mb-3 group-hover:translate-x-2 transition-transform duration-300">
        {milestone.title}
      </h3>
      <p className="text-base text-white/50 leading-[170%]">
        {milestone.description}
      </p>
    </motion.div>
  );
};
