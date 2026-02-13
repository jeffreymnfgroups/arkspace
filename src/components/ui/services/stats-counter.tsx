"use client";
import { useRef, useEffect, useContext } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { STATS } from "@/constants/projects";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const StatsCounter = () => {
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
      className="bg-background min-h-[60vh] perspective-section relative z-20 flex items-center"
    >
      <main ref={contentRef} className="transform-container w-full">
        <div className="w-[90%] mx-auto max-w-[1440px] py-12 md:py-[6rem] px-4 md:px-0">
          <div className="mb-12 md:mb-16">
            <p className="font-gambetta text-lg md:text-2xl text-white/60 mb-6">
              <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08}>
                (By The Numbers)
              </TextReveal>
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, index) => (
              <CounterCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default StatsCounter;

const CounterCard = ({ stat, index }: { stat: IStat; index: number }) => {
  const ref = useRef(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current && numberRef.current) {
      hasAnimated.current = true;
      const target = stat.value;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        delay: index * 0.2,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(obj.val).toString();
          }
        },
      });
    }
  }, [isInView, stat.value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="border-t border-white/10 pt-8"
    >
      <div className="flex items-end gap-1 mb-4">
        <span
          ref={numberRef}
          className="text-[3rem] md:text-[5rem] font-anton-sc leading-[100%]"
        >
          0
        </span>
        <span className="text-[2rem] md:text-[3rem] font-anton-sc leading-[120%] text-white/60">
          {stat.suffix}
        </span>
      </div>
      <p className="text-base md:text-xl text-white/60 font-semibold">{stat.label}</p>
    </motion.div>
  );
};
