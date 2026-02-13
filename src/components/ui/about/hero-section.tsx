"use client";
import { useRef, useContext, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { ABOUT_IMAGES } from "@/constants/images";
import { TextReveal } from "@/components/common/text-reveal";
import { DiagonalReveal } from "@/components/common/image-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
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
      <div className="w-[90%] mx-auto max-w-[1440px] py-12 md:py-[6rem] px-4 md:px-0">
        <header className="space-y-8 md:space-y-[6rem] mb-12 md:mb-[6rem]">
          <div className="flex items-center justify-between">
            <p className="font-gambetta text-lg md:text-2xl text-white/60">
              <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08}>
                (Who We Are)
              </TextReveal>
            </p>
            <p className="font-gambetta text-lg md:text-2xl text-white/60">
              <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08} delay={0.2}>
                (About)
              </TextReveal>
            </p>
          </div>

          <div>
            <h1 className="text-4xl md:text-[8rem] lg:text-[12rem] font-anton-sc uppercase leading-[100%]">
              {["About", "ARK SPACE"].map((word, i) => (
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
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <DiagonalReveal className="h-[300px] md:h-[500px]" delay={0.5} duration={1.5}>
              <div className="relative h-full">
                <Image
                  src={ABOUT_IMAGES[0]}
                  alt="About ARK SPACE"
                  className="object-cover"
                  fill
                  quality={90}
                />
              </div>
            </DiagonalReveal>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p className="font-gambetta text-lg md:text-2xl text-white/60 mb-6">
              <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08}>
                (Our Story)
              </TextReveal>
            </p>
            <div className="space-y-6 md:space-y-8 text-base md:text-xl text-white/60 font-normal leading-[170%]">
              <p>
                {[
                  "Founded in 2010, ARK SPACE began with a",
                  "simple belief: that great architecture has the",
                  "power to transform lives. What started as a",
                  "small studio has grown into an award-winning",
                  "practice spanning three continents.",
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
              <p>
                {[
                  "We combine architectural vision with meticulous",
                  "craftsmanship to deliver bespoke interiors and",
                  "constructions that stand the test of time.",
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
