"use client";
import { useRef, FC, useContext, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";
import ParallaxMarquee from "@/components/common/parallax-text";

gsap.registerPlugin(ScrollTrigger);

const STORY_CHAPTERS = [
  {
    title: ["How We", "Started"],
    paragraphs: [
      "ARK SPACE began with a simple belief: every space has a story waiting to be told. We started as a small studio focused on bringing clarity and intention to interior design and construction.",
      "From our first project to today, we have stayed true to that vision—building and designing spaces that reflect who you are.",
    ],
  },
  {
    title: ["Our", "Philosophy"],
    paragraphs: [
      "We believe in the marriage of build and design. Great spaces are not just beautiful; they are thoughtfully crafted, durable, and functional.",
      "Every detail—from material choice to spatial flow—is considered to create environments that inspire and endure.",
    ],
  },
  {
    title: ["What", "Drives Us"],
    paragraphs: [
      "Our drive comes from seeing a concept become reality. We are passionate about precision, quality, and the trust our clients place in us.",
      "We aim to exceed expectations at every stage, from initial concept to final handover.",
    ],
  },
  {
    title: ["Our", "Vision"],
    paragraphs: [
      "We envision a future where every project we touch becomes a benchmark for excellence. We continue to push boundaries in design and construction while staying rooted in craftsmanship and client partnership.",
      "Build & Design is not just our slogan—it is the promise we live by.",
    ],
  },
];

const OurStory = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useEffect(() => {
    if (!isLoading && animationComplete) {
      const ctx = gsap.context(() => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.refresh();

        setTimeout(() => {
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
    <section ref={sectionRef} className="bg-background min-h-screen z-20">
      <main>
        <header className="w-[90%] mx-auto max-w-[1440px] py-12 md:py-[6rem] space-y-8 md:space-y-[6rem] px-4 md:px-0">
          <div className="flex items-center justify-between">
            <p className="font-gambetta text-lg md:text-2xl text-white/60">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
              >
                (Our Story)
              </TextReveal>
            </p>
            <p className="font-gambetta text-lg md:text-2xl text-white/60">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.2}
              >
                (01)
              </TextReveal>
            </p>
          </div>

          <div>
            <h2 className="text-4xl md:text-[7rem] lg:text-[11.25rem] font-anton-sc uppercase leading-[100%]">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.4}
              >
                Build &
              </TextReveal>
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.4}
              >
                Design
              </TextReveal>
            </h2>
            <p className="text-xl md:text-[2.5rem] lg:text-[3.75rem] font-semibold leading-[120%] tracking-[-0.125rem]">
              {[
                "The journey behind our spaces—",
                "our philosophy, drive, and vision.",
              ].map((lines, i) => (
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={i === 0 ? 0.05 : i * 0.1}
                  key={i}
                >
                  {lines}
                </TextReveal>
              ))}
            </p>
          </div>
        </header>
      </main>

      <div className="flex flex-col md:flex-row relative" ref={contentRef}>
        <div className="hidden md:block h-screen w-full md:w-1/2 md:sticky md:top-0">
          <ParallaxMarquee />
        </div>

        <div className="w-full md:w-1/2 bg-inverse-1 p-[3rem] md:p-[6rem]">
          <div className="space-y-[6rem]">
            {STORY_CHAPTERS.map((chapter, i) => (
              <StoryChapter key={i} {...chapter} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

interface StoryChapterProps {
  title: string[];
  paragraphs: string[];
  index: number;
}

const StoryChapter: FC<StoryChapterProps> = ({
  title,
  paragraphs,
  index,
}) => {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, {
    once: false,
    amount: 0.3,
    margin: "0px 0px -100px 0px",
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05 * index,
      },
    },
  };

  const titleVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const charVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.article
      ref={rowRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex flex-col gap-8">
        <motion.h2
          className="font-anton-sc uppercase flex flex-col leading-[100%] text-2xl md:text-[3rem] lg:text-[4.5rem]"
          variants={titleVariants}
        >
          {title.map((t, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span className="inline-block" variants={titleVariants}>
                {t.split("").map((char, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    variants={charVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
          ))}
        </motion.h2>

        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="text-[1.25rem] leading-[170%] text-white/80"
              variants={textVariants}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
