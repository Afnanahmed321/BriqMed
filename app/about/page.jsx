"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const NAVY = "#0F1F3D";
const NAVY_SOFT = "#3B4B6B";
const GOLD = "#C9A227";
const GOLD_SOFT = "#E4C767";
const CREAM = "#FAF8F3";
const NAVY_TINT = "#F1F3F8";

const NAVBAR_HEIGHT_MOBILE = 64;

const labelClass = "text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium block";

export default function AboutEditorialExperience() {
  const containerRef = useRef(null);

  const section2Ref = useRef(null);
  const section6Ref = useRef(null);

  const goalWordsRef = useRef(null);
  const commitmentRef = useRef(null);

  useEffect(() => {
    let ctx;
    const mm = gsap.matchMedia();

    ["goal-trigger", "commitment-trigger"].forEach((id) => {
      const existing = ScrollTrigger.getById(id);
      if (existing) existing.kill();
    });

    const setup = () => {
      ctx = gsap.context(() => {
        mm.add(
          {
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
          },
          (context) => {
            const { isMobile } = context.conditions;

            // ============================================================
            // SECTION 2: OUR GOAL
            // ============================================================
            const goalSplit = new SplitType(goalWordsRef.current, {
              types: "words",
              wordClass: "goal-word",
            });

            gsap.set(goalSplit.words, { color: NAVY_SOFT, fontWeight: 300, opacity: 0.4 });

            const section2Tl = gsap.timeline({
              scrollTrigger: {
                id: "goal-trigger",
                trigger: section2Ref.current,
                start: isMobile ? `top ${NAVBAR_HEIGHT_MOBILE}px` : "top top",
                // Mobile: short pin, just long enough for the words to
                // finish revealing — then release immediately, no dead space.
                end: isMobile ? "+=25%" : "+=80%",
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            goalSplit.words.forEach((word, i) => {
              section2Tl.to(
                word,
                { color: NAVY, fontWeight: 400, opacity: 1, duration: 0.4, ease: "none" },
                i * 0.05
              );
            });

            // ============================================================
            // SECTION 6: OUR COMMITMENT
            // ============================================================
            const commitmentSplit = new SplitType(commitmentRef.current, {
              types: "words",
              wordClass: "commitment-word",
            });

            gsap.set(commitmentSplit.words, { color: NAVY_SOFT, fontWeight: 300, opacity: 0.4 });

            gsap.timeline({
              scrollTrigger: {
                id: "commitment-trigger",
                trigger: section6Ref.current,
                start: isMobile ? `top ${NAVBAR_HEIGHT_MOBILE}px` : "top top",
                end: isMobile ? "+=35%" : "+=100%",
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            }).to(commitmentSplit.words, {
              color: NAVY,
              fontWeight: 400,
              opacity: 1,
              duration: 0.3,
              stagger: 0.02,
              ease: "power1.out",
            });

            return () => {
              goalSplit.revert();
              commitmentSplit.revert();
            };
          }
        );
      }, containerRef);
    };

    setup();

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const fallbackTimer = setTimeout(refresh, 500);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(fallbackTimer);
      mm.revert();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white overflow-hidden">
      {/* SECTION 1: ABOUT US */}
      <section className="relative w-full px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 flex items-center bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl space-y-4 md:space-y-6">
            <span className={labelClass} style={{ color: GOLD }}>
              About Us
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.15] md:leading-[1.1]"
              style={{ color: NAVY }}
            >
              BriqMed
            </h1>
            <div className="pt-2 md:pt-4">
              <p className="text-base md:text-xl lg:text-[22px] font-light leading-[1.6] max-w-2xl text-gray-700">
                BriqMed Healthcare Solutions is a trusted partner for healthcare providers across the United States, offering provider credentialing, insurance enrollment, and medical billing support. We simplify complex administrative processes so you can focus on delivering quality patient care and growing your practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR GOAL — mobile: content-sized, not full-screen */}
      <section
        ref={section2Ref}
        className="relative md:h-screen w-full px-5 sm:px-8 md:px-16 lg:px-24 py-20 md:py-0 flex items-center justify-center"
        style={{ backgroundColor: CREAM }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
          <span className={labelClass} style={{ color: GOLD }}>
            Our Goal is simple
          </span>
          <h2
            ref={goalWordsRef}
            className="text-2xl sm:text-3xl md:text-5xl font-light leading-[1.4] md:leading-[1.3]"
            dangerouslySetInnerHTML={{ __html: "To make credentialing and enrollment hassle-free, accurate, and fully compliant." }}
          />
        </div>
      </section>

      {/* SECTION 3: WHO WE ARE */}
      <section
        className="relative w-full px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 flex items-center"
        style={{ backgroundColor: NAVY_TINT }}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <div className="space-y-3 md:space-y-4">
            <span className={labelClass} style={{ color: GOLD }}>
              Who We Are
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.2]"
              style={{ color: NAVY }}
            >
              The Vision
            </h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-xl lg:text-[22px] font-light leading-[1.6] text-gray-700 max-w-2xl">
              BriqMed is built on a strong foundation of hands-on experience in U.S. healthcare credentialing and payer enrollment. Having worked closely with providers, insurance payers, and regulatory platforms, we understand the common challenges — delays, rejections, and administrative burden.
            </p>
            <p className="text-base md:text-xl lg:text-[22px] font-light leading-[1.6] text-gray-700 max-w-2xl">
              We bring that expertise into every engagement, ensuring smooth submissions, proactive follow-ups, and accurate documentation at every step.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR MISSION */}
      <section
        className="relative w-full px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 flex items-center justify-center"
        style={{ backgroundColor: NAVY }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-8">
          <span className={labelClass} style={{ color: GOLD_SOFT }}>
            Our Mission
          </span>
          <p className="text-xl sm:text-2xl md:text-5xl font-light leading-[1.5] md:leading-[1.4] text-white">
            To simplify provider credentialing and enrollment by delivering reliable, transparent, and compliant solutions that help healthcare practices operate efficiently and grow with confidence.
          </p>
        </div>
      </section>

      {/* SECTION 5: OUR VALUES */}
      <section
        className="relative w-full px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 flex flex-col justify-center"
        style={{ backgroundColor: CREAM }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <span className={`${labelClass} mb-6 md:mb-10`} style={{ color: GOLD }}>
            Our Values
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 md:gap-y-12">
            {[
              { title: "Integrity", desc: "We maintain accuracy, compliance, and confidentiality." },
              { title: "Efficiency", desc: "Timely submissions and proactive monitoring." },
              { title: "Transparency", desc: "Regular updates and clear communication." },
              { title: "Security", desc: "Safe handling and storage of sensitive information." },
            ].map((value, index) => (
              <div key={index} className="space-y-2 md:space-y-3">
                <h3 className="text-2xl md:text-4xl font-light" style={{ color: NAVY }}>
                  {value.title}
                </h3>
                <p className="text-sm md:text-xl font-light leading-[1.6] text-gray-700 max-w-md">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR COMMITMENT — mobile: content-sized, not full-screen */}
      <section
        ref={section6Ref}
        className="relative md:h-screen w-full px-5 sm:px-8 md:px-16 lg:px-24 py-20 md:py-0 flex items-center justify-center bg-white"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-8">
          <span className={labelClass} style={{ color: GOLD }}>
            Our Commitment
          </span>
          <p
            ref={commitmentRef}
            className="text-xl sm:text-2xl md:text-4xl font-light leading-[1.5] md:leading-[1.4]"
            dangerouslySetInnerHTML={{ __html: "We treat every provider as a priority. Whether you are starting a new practice, joining a group, or expanding into new insurance networks, BriqMed ensures your credentialing journey is smooth, efficient, and stress-free." }}
          />
        </div>
      </section>
    </div>
  );
}