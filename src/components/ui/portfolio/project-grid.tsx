"use client";
import { useState, useRef, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROJECTS, PROJECT_CATEGORIES } from "@/constants/projects";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const ProjectGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
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

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className="bg-inverse-1 min-h-screen perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        {/* Filter Tabs */}
        <div className="w-[90%] mx-auto max-w-[1440px] pt-8 md:pt-[4rem] pb-6 md:pb-[3rem] px-4 md:px-0">
          <div className="flex flex-wrap items-center gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 md:px-6 md:py-3 text-base md:text-lg font-semibold rounded-full transition-colors duration-300 ${
                  activeCategory === cat
                    ? "text-background"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="w-[90%] mx-auto max-w-[1440px] pb-8 md:pb-[6rem] px-4 md:px-0">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.name} {...project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </section>
  );
};

export default ProjectGrid;

const ProjectCard = ({
  image,
  name,
  year,
  category,
  description,
  index,
}: IProjects & { index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={image}
            alt={name}
            className="object-cover w-full aspect-[4/3]"
            quality={90}
          />
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-8"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white/70 text-base leading-[160%] mb-2"
          >
            {description}
          </motion.p>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm font-gambetta text-white/50 uppercase tracking-wider"
          >
            View Project →
          </motion.span>
        </motion.div>
      </div>

      <div className="py-4 md:py-6 flex items-center justify-between">
        <div>
          <h4 className="text-xl md:text-[1.875rem] font-semibold leading-[140%] tracking-[-0.0625rem]">
            <TextReveal splitType="chars" direction="up" duration={0.7} stagger={0.08}>
              {name}
            </TextReveal>
          </h4>
          {category && (
            <p className="text-white/40 text-sm font-gambetta mt-1">{category}</p>
          )}
        </div>
        <p className="font-gambetta text-lg md:text-2xl text-white/60 leading-[100%]">
          <TextReveal splitType="chars" direction="up" duration={0.7} stagger={0.08} delay={0.2}>
            {year}
          </TextReveal>
        </p>
      </div>
    </motion.article>
  );
};
