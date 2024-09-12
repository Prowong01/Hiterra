"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

// import ArrowIcon from "/assets/arrow-right.svg";
import cogImage from "../public/assets/cog.png"
import cylinderImage from "../public/assets/cylinder.png";
import noodleImage from "../public/assets/noodle.png";
import Navbar from "../components/NavBar";

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
      className="w-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    >
      <div className="container min-h-screen pt-20">
        <SignedOut>
          <div className="md:top-8 md:right-8 mb-20 flex justify-center">
            <Navbar />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="md:top-8 md:right-8 mb-12 flex justify-center">
            <a href="/dashboard">
              <button className="btn btn-primary px-6 py-2">Go To Dashboard</button>
            </a>
            <div className="item-center ml-10 py-2">
              <UserButton />
            </div>
          </div>
        </SignedIn>
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              One Solution AI Enterprise Platform
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              All necessary software services in one integrated suite to rapidly
              develop, provision, and operate Enterprise AI applications
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <SignedOut>
                <a href="/sign-up">
                  <button className="btn btn-primary"> Sign Up</button>
                </a>
              </SignedOut>
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
              className="hidden md:block -top-8 -left-32 md:absolute ml-12"
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
