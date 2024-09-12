"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef } from "react";
import { SignedOut } from "@clerk/clerk-react";

// import ArrowIcon from "/assets/arrow-right.svg";
import cogImage from "@/public/assets/cog.png";
import cylinderImage from "@/public/assets/cylinder.png";
import noodleImage from "@/public/assets/noodle.png";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">Version 2.0 is here</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              This is Enterprise AI.
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Blnc Tech delivers a comprehensive Enterprise AI application
              development platform and a large and growing family of Worldwide
              enterprise AI applications
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <SignedOut>
                <a href="/sign-up">
                  <button className="btn btn-primary"> Sign Up</button>
                </a>
              </SignedOut>
              <button className="btn btn-text gap-1">
                <a href="#product">Learn More</a>
                {/* <ArrowIcon className="h-5 w-5" /> */}
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={cogImage.src}
              alt="Cog Image"
              className="w-full md:w-auto md:h-full md:max-h-[648px] md:absolute md:object-contain md:left-1/2 md:-translate-x-1/2 lg:left-0 lg:translate-x-0"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={cylinderImage.src}
              width={220}
              height={220}
              alt="Cylinder Image"
              className="hidden md:block -top-8 -left-32 md:absolute"
              style={{
                translateY: translateY,
              }}
            />
            <motion.img
              src={noodleImage.src}
              width={220}
              height={220}
              alt="Noodle Image"
              className="hidden lg:block absolute top-[524px] left-[448px]"
              style={{
                rotate: 30,
                translateY: translateY,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
