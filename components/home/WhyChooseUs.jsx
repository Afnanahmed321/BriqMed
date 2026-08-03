"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Fast Turnaround",
    description: "We proactively move every application forward.",
  },
  {
    number: "02",
    title: "Accurate & Compliant",
    description: "Every submission is checked against payer requirements.",
  },
  {
    number: "03",
    title: "Transparent Updates",
    description: "Regular status reports. No guessing, ever.",
  },
  {
    number: "04",
    title: "HIPAA-Friendly",
    description: "Documents stored securely within Microsoft 365.",
  },
  {
    number: "05",
    title: "Credentialing Experts",
    description: "Deep expertise in provider enrollment, start to finish.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FeatureCard({ number, title, description, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative w-full sm:w-[300px] min-h-[176px] rounded-[20px] border border-zinc-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.05)] hover:border-zinc-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_36px_rgba(15,23,42,0.08)] transition-[box-shadow,border-color] duration-200"
    >
      <span className="absolute top-5 right-6 text-[18px] font-semibold tracking-wider text-zinc-400 select-none">
        {number}
      </span>
      <h3 className="text-[18px] font-semibold tracking-tight text-zinc-900 pr-8">
        {title}
      </h3>
      <p className="mt-2.5 text-[17px] leading-relaxed text-zinc-500">
        {description}
      </p>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#FAFAFC] py-18 lg:py-22 overflow-hidden">
      {/* subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      {/* soft radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 lg:mb-16">
          <span className="text-[30px] font-bold tracking-[0.04em] uppercase text-[#0F1F3D] mb-3">
            Why BriqMed ?
          </span>
          <h2 className="text-[25px] lg:text-[34px] font-semibold tracking-tight text-zinc-900 max-w-xl">
            Credentialing, handled with precision
          </h2>
          <p className="mt-4 text-[16px] lg:text-[17.5px] leading-relaxed text-zinc-500 max-w-md">
            A dedicated team that keeps every application accurate,
            compliant, and moving — so your providers get to work sooner.
          </p>
        </div>

        {/* Cards: 3 + 2, wraps and centers naturally */}
        <div className="flex flex-wrap justify-center gap-5">
          {features.map((item, index) => (
            <FeatureCard key={item.number} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}