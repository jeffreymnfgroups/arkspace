import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import arc9 from "../../../public/Arcspace/arc9.jpeg";
import arc10 from "../../../public/Arcspace/arc10.jpeg";
import arc11 from "../../../public/Arcspace/arc11.jpeg";
import arc12 from "../../../public/Arcspace/arc12.jpeg";
import arc13 from "../../../public/Arcspace/arc13.jpeg";
import arc14 from "../../../public/Arcspace/arc14.jpeg";
import arc15 from "../../../public/Arcspace/arc15.jpeg";
import arc16 from "../../../public/Arcspace/arc16.jpeg";
import arc17 from "../../../public/Arcspace/arc17.jpeg";
import Image from "next/image";

export const CART_ONE = [arc9, arc10, arc11];
export const CART_TWO = [arc12, arc13, arc14];
export const CART_THREE = [arc15, arc16, arc17];

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const y = useTransform(baseY, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseY.set(baseY.get() + moveBy);
  });

  return (
    <div className="parallax-vertical">
      <motion.div className="scroller-vertical" style={{ y }}>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

export default function ParallaxMarquee() {
  return (
    <section className="flex w-full h-screen overflow-hidden">
      <div className="w-full min-w-0 md:w-1/3 shrink-0">
        <ParallaxText baseVelocity={2}>
          {CART_ONE.map((item, index) => (
            <Image key={index} src={item} alt="" className="w-full object-cover" />
          ))}
        </ParallaxText>
      </div>
      <div className="hidden md:block w-1/3 min-w-0 shrink-0">
        <ParallaxText baseVelocity={-2}>
          {CART_TWO.map((item, index) => (
            <Image key={index} src={item} alt="" />
          ))}
        </ParallaxText>
      </div>
      <div className="hidden md:block w-1/3 min-w-0 shrink-0">
        <ParallaxText baseVelocity={2}>
          {CART_THREE.map((item, index) => (
            <Image key={index} src={item} alt="" />
          ))}
        </ParallaxText>
      </div>
    </section>
  );
}
