"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const customEase = [0.16, 1, 0.3, 1];

  // Motion Variants without vertical displacement
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: customEase,
        staggerChildren: 0.12,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: customEase },
    },
  };

  const imageEntranceVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: customEase },
    },
  };

  return (
    <section className="w-full bg-white overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-30 pb-8 lg:pb-12"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif leading-tight text-[#2B2B2B]">
              <motion.span variants={textVariants} className="block">
                Credentializing,
              </motion.span>
              <motion.span variants={textVariants} className="block">
                Simplified.
              </motion.span>
            </h1>

            <motion.p
              variants={textVariants}
              className="mt-8 text-xl leading-8 text-gray-600 max-w-xl"
            >
              BriqMed helps healthcare providers across the United States
              streamline{" "}
              <span className="font-semibold text-gray-900">
                provider credentialing,
              </span>{" "}
              <span className="font-semibold text-gray-900">
                provider enrollment,
              </span>{" "}
              <span className="font-semibold text-gray-900">
                CAQH management,
              </span>{" "}
              and{" "}
              <span className="font-semibold text-gray-900">
                insurance credentialing,
              </span>{" "}
              so you can focus on patient care.
            </motion.p>

            <motion.div variants={textVariants} className="mt-10 inline-block">
              <motion.button
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.03,
                        boxShadow:
                          "0 10px 25px -5px rgba(28, 41, 201, 0.15), 0 8px 10px -6px rgba(28, 41, 201, 0.1)",
                        transition: { duration: 0.25, ease: "easeOut" },
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? {}
                    : { scale: 0.97, transition: { duration: 0.1 } }
                }
                className="bg-[#1C29C9] hover:bg-[#1620a6] text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300"
              >
                Discover More
              </motion.button>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            variants={imageEntranceVariants}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="w-full max-w-2xl flex justify-center">
              <Image
                src="/images/hero_image.png"
                alt="Healthcare Credentialing"
                width={700}
                height={550}
                priority
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}