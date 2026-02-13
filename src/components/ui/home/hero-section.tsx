"use client";
import { hero_banner } from "@/constants/images";
import Image from "next/image";
import { useContext, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/common/text-reveal";
import {
  DiagonalReveal,
} from "@/components/common/image-reveal";
import { LoadingContext } from "@/components/layout";
import Navigation from "@/components/common/navigation";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useGSAP(
    () => {
      if (!isLoading && animationComplete) {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.refresh();

        setTimeout(() => {
          gsap.to(imageRef.current, {
            objectPosition: "85% center",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "bottom bottom-=300",
            end: "bottom top-=300",
            pin: true,
            pinSpacing: false,
            id: "hero-pin",
          });

          gsap.to(containerRef.current, {
            rotateX: "12deg",
            scale: 0.92,
            opacity: 0.8,
            transformOrigin: "center bottom",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "bottom bottom-=300",
              end: "bottom bottom-=500",
              scrub: true,
            },
          });
        }, 100);
      }
    },
    {
      dependencies: [isLoading, animationComplete],
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen relative z-10 overflow-hidden"
    >
      <div ref={leftSideRef} className="h-[50vh] lg:h-screen w-full lg:w-1/2 lg:sticky lg:top-0 shrink-0">
        <DiagonalReveal className="h-full" delay={1.5} duration={2}>
          <div className="relative h-full">
            <Image
              ref={imageRef}
              src={hero_banner}
              alt="ARK SPACE hero"
              className="object-cover w-full h-full"
              priority
              quality={100}
              fill
              style={{ objectPosition: "15% center" }}
            />
          </div>
        </DiagonalReveal>
      </div>

      <div className="w-full lg:w-1/2 flex-1">
        <div ref={contentRef} className="transform-container">
          <Navigation isHomePage={true} />

          <div className="px-4 md:px-[4.5rem] pt-8 md:pt-[4.37rem] pb-12 text-center md:text-left">
            <h1 className="font-anton-sc text-5xl md:text-[7rem] lg:text-[10rem] uppercase flex flex-col leading-[100%] items-center md:items-start">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={1}
              >
                ARK
              </TextReveal>

              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                delay={1.2}
                stagger={0.08}
              >
                SPACE
              </TextReveal>
            </h1>

            <span className="text-lg md:text-2xl font-gambetta text-white/60 tracking-widest mt-2 block">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.06}
                delay={1.4}
              >
                Build & Design
              </TextReveal>
            </span>

            <p className="text-xl md:text-4xl mt-12 md:mt-32 -tracking-[0.02345rem] leading-[130%] font-semibold max-w-xl md:max-w-none mx-auto md:mx-0">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={1.7}
              >
                Designing spaces that
              </TextReveal>
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                delay={1.9}
                stagger={0.08}
              >
                define you. Building dreams
              </TextReveal>
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                delay={2.1}
                stagger={0.08}
              >
                with precision.
              </TextReveal>
            </p>
          </div>

          <div className="px-4 md:px-[6rem] pt-8 md:pt-[4.5rem] pb-8 md:pb-[6rem] space-y-12 md:space-y-[8rem]">
            <div>
              <span className="font-gambetta leading-[100%] text-xl md:text-2xl mb-6">
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                >
                  (About Us)
                </TextReveal>
              </span>
              <h2 className="flex flex-col leading-[110%] text-3xl md:text-[4.25rem] font-anton-sc uppercase mb-4">
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                >
                  Refined Spaces,
                </TextReveal>
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={0.2}
                >
                  Timeless Design
                </TextReveal>
              </h2>

              <p className="flex flex-col gap-6 md:gap-8 text-base md:text-xl text-white/60 font-normal leading-[170%]">
                <span>
                  {[
                    "We are passionate about crafting extraordinary",
                    "spaces that blend luxury with functionality.",
                    "Our team combines architectural vision with",
                    "meticulous craftsmanship to deliver bespoke",
                    "interiors and constructions that stand the test",
                    "of time. From concept to completion, we focus on",
                    "creating environments that inspire, elevate,",
                    "and transform the way you live and work.",
                  ].map((lines, i) => (
                    <TextReveal
                      splitType="lines"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={i * 0.05}
                      key={i}
                    >
                      {lines}
                    </TextReveal>
                  ))}
                </span>
                <span>
                  {[
                    "With every project, we ensure that your vision",
                    "is brought to life with uncompromising quality,",
                    "attention to detail, and a deep respect for the",
                    "spaces we shape. Let us help you build something",
                    "truly remarkable.",
                  ].map((lines, i) => (
                    <TextReveal
                      splitType="lines"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={i * 0.05}
                      key={i}
                    >
                      {lines}
                    </TextReveal>
                  ))}
                </span>
              </p>
            </div>

            <div>
              <span className="font-gambetta leading-[100%] text-2xl mb-6">
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                >
                  (Our Expertise)
                </TextReveal>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {[
                  "Interior Design",
                  "Construction Management",
                  "Space Planning",
                  "Architectural Consulting",
                  "Renovation & Remodeling",
                  "3D Visualization",
                ].map((service, index) => (
                  <div key={index}>
                    <p className="text-lg md:text-2xl font-semibold leading-[130%]">
                      <TextReveal
                        splitType="lines"
                        direction="up"
                        duration={0.7}
                        stagger={0.08}
                        delay={index * 0.1}
                      >
                        {service}
                      </TextReveal>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
