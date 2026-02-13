"use client";
import { useRef, useContext, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const ServicesHero = () => {
  const sectionRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useEffect(() => {
    if (!isLoading && animationComplete) {
      const ctx = gsap.context(() => {
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
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [isLoading, animationComplete]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen perspective-section relative z-20"
    >
      <header className="w-[90%] mx-auto max-w-[1440px] py-12 md:py-[6rem] space-y-8 md:space-y-[6rem] px-4 md:px-0">
        <div className="flex items-center justify-between">
          <p className="font-gambetta text-lg md:text-2xl text-white/60">
            <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08}>
              (What We Do)
            </TextReveal>
          </p>
          <p className="font-gambetta text-lg md:text-2xl text-white/60">
            <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08} delay={0.2}>
              (Services)
            </TextReveal>
          </p>
        </div>

        <div>
          <h1 className="text-4xl md:text-[8rem] lg:text-[12rem] font-anton-sc uppercase leading-[100%]">
            {["Our", "Services"].map((word, i) => (
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
          </h1>
          <p className="text-xl md:text-[2.5rem] lg:text-[3.75rem] font-semibold leading-[120%] tracking-[-0.125rem] mt-4">
            {[
              "Comprehensive design and",
              "construction solutions tailored",
              "to your unique vision.",
            ].map((line, i) => (
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={i * 0.1}
                key={i}
              >
                {line}
              </TextReveal>
            ))}
          </p>
        </div>
      </header>
    </section>
  );
};

export default ServicesHero;
