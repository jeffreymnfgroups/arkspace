"use client";
import { useRef, useState, useContext, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { OUR_TEAM } from "@/constants/our-team";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const TeamShowcase = () => {
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
      className="bg-background min-h-screen perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        <div className="w-[90%] mx-auto max-w-[1440px] py-12 md:py-[6rem] px-4 md:px-0">
          <div className="mb-12 md:mb-16">
            <p className="font-gambetta text-lg md:text-2xl text-white/60 mb-6">
              <TextReveal splitType="lines" direction="up" duration={0.7} stagger={0.08}>
                (The People)
              </TextReveal>
            </p>
            <h2 className="text-4xl md:text-[5rem] lg:text-[8rem] font-anton-sc uppercase leading-[100%]">
              {["Meet Our", "Team"].map((word, i) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUR_TEAM.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default TeamShowcase;

const TeamCard: FC<{ member: IOurTeam; index: number }> = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-inverse-1 aspect-[3/4]">
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          <Image
            src={member.image}
            alt={member.name.join(" ")}
            className="object-cover w-full h-full"
            quality={90}
          />
        </motion.div>

        {/* Hover overlay with bio */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6"
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-sm text-white/70 leading-[170%] mb-4"
              >
                {member.description}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex gap-4"
              >
                {member.socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Image src={social.icon} alt="" width={14} height={14} />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-4">
        <h3 className="text-xl md:text-2xl font-semibold leading-[130%]">
          {member.name.join(" ")}
        </h3>
        <p className="font-gambetta text-white/60 text-base mt-1">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
};
