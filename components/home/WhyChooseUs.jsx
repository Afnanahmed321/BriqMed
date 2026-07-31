"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    title: "Fast Turnaround Times",
    description: "We move cases forward proactively.",
  },
  {
    number: "02",
    title: "Accurate & Compliant",
    description: "Every application is checked thoroughly.",
  },
  {
    number: "03",
    title: "Transparent Updates",
    description: "Regular status reports.\nNo guessing.",
  },
  {
    number: "04",
    title: "Secure & HIPAA-Friendly",
    description: "All documents safely stored in Microsoft 365.",
  },
  {
    number: "05",
    title: "Credentialing Experts",
    description:
      "Extensive expertise in provider enrollment & credentialing.",
  },
];

function Card({ item }) {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-start p-6 lg:p-10">
      <div>
        <div className="border-t border-gray-200 mb-4 lg:mb-6 w-full"></div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-[36px] lg:text-[56px] leading-none font-medium tracking-tight text-gray-900">
            {item.number}
          </h3>
        </div>
        <h4 className="mt-3 lg:mt-5 text-[18px] lg:text-[24px] font-semibold leading-snug tracking-tight text-gray-900">
          {item.title}
        </h4>
        <p className="mt-2 lg:mt-3 text-[15px] lg:text-[20px] leading-relaxed whitespace-pre-line text-[#52525b]">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const breathTweens = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;

      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            zIndex: 1,
            willChange: "transform, opacity, filter",
          });
        } else {
          gsap.set(card, {
            y: "100%",
            scale: 0.96,
            opacity: 0.6,
            filter: "blur(8px)",
            zIndex: index + 1,
            willChange: "transform, opacity, filter",
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top 15%",
          end: `+=${(cards.length - 1) * 100}%`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentIdx = Math.min(
              Math.floor(progress * cards.length),
              cards.length - 1
            );
            setActiveIndex(currentIdx);
          },
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const prevCard = cards[index - 1];

        tl.to(
          card,
          {
            y: "0%",
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power2.out",
          },
          `step-${index}`
        ).to(
          prevCard,
          {
            y: "-35px",
            scale: 0.94,
            opacity: 0.2,
            filter: "blur(4px)",
            ease: "power2.inOut",
          },
          `step-${index}`
        );
      });

      cards.forEach((card, index) => {
        const tween = gsap.to(card, {
          scale: 1.01,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });
        breathTweens.current[index] = tween;
      });

      if (breathTweens.current[0]) breathTweens.current[0].play();

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `top+= ${index * 100}% top`,
          end: `top+= ${(index + 1) * 100}% top`,
          onEnter: () => {
            breathTweens.current.forEach((t, i) => {
              if (i === index) t.play();
              else t.pause();
            });
          },
          onEnterBack: () => {
            breathTweens.current.forEach((t, i) => {
              if (i === index) t.play();
              else t.pause();
            });
          },
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      breathTweens.current.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#FAFAFC] py-12 lg:py-24 lg:min-h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden border-y border-gray-100">
      
      {/* Background Architectural Grid & Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-gray-200/40 via-transparent to-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Oversized background feature number watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none -z-10">
        <span className="text-[18vw] lg:text-[14rem] font-bold text-gray-900/[0.02] tracking-tighter leading-none">
          0{activeIndex + 1}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center">
        
        {/* Header and Progress Indicator */}
        <div className="w-full max-w-xl flex flex-col items-center mb-8 lg:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-gray-300"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 font-mono">
              0{activeIndex + 1} / 0{features.length}
            </span>
            <span className="h-px w-8 bg-gray-300"></span>
          </div>
          
          <h2 className="text-center text-2xl lg:text-[44px] font-semibold tracking-tight text-gray-900">
            Why Choose BriqMed?
          </h2>
        </div>

        {/* Premium Stage Container */}
        <div className="relative w-full max-w-[360px] lg:max-w-[520px] h-[340px] lg:h-[380px] flex justify-center items-center">
          {features.map((item, index) => (
            <div
              key={item.number}
              ref={(el) => (cardRefs.current[index] = el)}
              className="absolute top-0 left-0 w-full h-full rounded-2xl border border-gray-100/80 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.02)] bg-white overflow-hidden"
              style={{ zIndex: index + 1 }}
            >
              <Card item={item} />
            </div>
          ))}
        </div>

        {/* Minimal Bottom Progress Bar Indicator */}
        <div className="w-48 h-1 bg-gray-100 rounded-full mt-10 lg:mt-16 overflow-hidden">
          <div 
            className="h-full bg-gray-900 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
          />
        </div>

      </div>
    </section>
  );
}