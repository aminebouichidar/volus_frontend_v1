"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ZoomParallaxProps {
  images: { src: string; alt: string }[];
}

export const ZoomParallax = ({ images }: ZoomParallaxProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: images[0]?.src,
      scale: scale4,
      classes: "w-[25vw] h-[25vh]",
    },
    {
      src: images[1]?.src,
      scale: scale5,
      classes: "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]",
    },
    {
      src: images[2]?.src,
      scale: scale6,
      classes: "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]",
    },
    {
      src: images[3]?.src,
      scale: scale5,
      classes: "left-[27.5vw] w-[25vw] h-[25vh]",
    },
    {
      src: images[4]?.src,
      scale: scale6,
      classes: "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]",
    },
    {
      src: images[5]?.src,
      scale: scale8,
      classes: "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]",
    },
    {
      src: images[6]?.src,
      scale: scale9,
      classes: "top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]",
    },
  ];

  return (
    <div ref={container} className="h-[300vh] relative">
      <div className="sticky top-0 h-[100vh] overflow-hidden bg-black">
        {pictures.map(({ src, scale, classes }, index) => {
          if (!src) return null;
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute flex items-center justify-center w-full h-full top-0`}
            >
              <div className={`relative ${classes}`}>
                <Image
                  src={src}
                  fill
                  alt="image"
                  className="object-cover rounded-xl border border-white/10 shadow-2xl"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

