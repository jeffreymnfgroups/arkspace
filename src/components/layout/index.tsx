"use client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { FC, ReactNode, useState, createContext, useRef } from "react";
import { Preloader } from "../common/preloader";
import { AnimatePresence, motion } from "framer-motion";
import ScrollProgress from "../common/scroll-progress";

export const LoadingContext = createContext({
  isLoading: true,
  animationComplete: false,
});

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const contentVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration:1,
        ease: [0.87, 0, 0.13, 1],
        onComplete: () => {
          setAnimationComplete(true);
          // Clear transform so sticky positioning works in children
          if (contentWrapperRef.current) {
            contentWrapperRef.current.style.transform = "none";
          }
        },
      },
    },
  };

  return (
    <LoadingContext.Provider value={{ isLoading, animationComplete }}>
      <main className="bg-background min-h-screen">
        <ReactLenis root>
          <Preloader onComplete={() => setIsLoading(false)} />
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                ref={contentWrapperRef}
                key="content"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <ScrollProgress />
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </ReactLenis>
      </main>
    </LoadingContext.Provider>
  );
};

export default Layout;
