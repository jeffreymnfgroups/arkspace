"use client";
import { useRef, useContext, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navigation from "@/components/common/navigation";
import { TextReveal } from "@/components/common/text-reveal";
import ContactForm from "./contact-form";
import Footer from "../home/footer";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const ContactInject = () => {
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
    <div>
      <Navigation />
      {/* Hero */}
      <section
        ref={sectionRef}
        className="min-h-[70vh] perspective-section relative z-20 flex items-end"
      >
        <header className="w-[90%] mx-auto max-w-[1440px] pb-[6rem]">
          <div className="flex items-center justify-between mb-[4rem]">
            <p className="font-gambetta text-2xl text-white/60">
              <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08}>
                (Say Hello)
              </TextReveal>
            </p>
            <p className="font-gambetta text-2xl text-white/60">
              <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08} delay={0.2}>
                (Contact)
              </TextReveal>
            </p>
          </div>

          <h1 className="text-[10rem] font-anton-sc uppercase leading-[100%]">
            {["Let's Build", "Something", "Together"].map((word, i) => (
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={i * 0.15}
                key={i}
              >
                {word}
              </TextReveal>
            ))}
          </h1>
        </header>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactInject;
