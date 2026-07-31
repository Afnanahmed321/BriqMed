"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Provider Credentialing & Insurance Enrollment",
    subtitle: "Initial file setup and comprehensive review.",
    image: "/icons/credentialing.png",
  },
  {
    title: "CAQH Profile Creation, Updates & Maintenance",
    subtitle: "Reattestation and data synchronization.",
    image: "/icons/caqh.png",
  },
  {
    title: "NPPES / NPI Registration & Management",
    subtitle: "Type I and Type II taxonomy alignment.",
    image: "/icons/npi.png",
  },
  {
    title: "Medicare, Medicaid & Commercial Payer Enrollment",
    subtitle: "Application submission and direct follow-up.",
    image: "/icons/medicare.png",
  },
  {
    title: "Provider Demographic Updates",
    subtitle: "Syncing practice locations and panel statuses.",
    image: "/icons/demographic.png",
  },
  {
    title: "License & Certification Tracking",
    subtitle: "Proactive alerts for upcoming expirations.",
    image: "/icons/license.png",
  },
  {
    title: "ERA / EFT Setup",
    subtitle: "Electronic remittance and direct deposit integration.",
    image: "/icons/era.png",
  },
  {
    title: "End-to-End Provider Onboarding & Offboarding Support",
    subtitle: "Seamless transitions for new and departing staff.",
    image: "/icons/onboarding.png",
  },
];

const NODE_COUNT = services.length;
const VIEW_W = 600;
const VIEW_H = 900;
const PAD_TOP = 90;
const PAD_BOTTOM = 90;

// Reserve the last chunk of pinned scroll purely for the "destination reached" beat,
// so the road actually finishes drawing and the last node actually completes
// instead of the section just stopping mid-story.
const STEP_PHASE_END = 0.86;
const COMPLETE_THRESHOLD = 0.9;

// Node positions are generated once, from real geometry — not guessed percentages —
// so the road is mathematically guaranteed to pass through every card's node.
function getNodePositions() {
  const usableH = VIEW_H - PAD_TOP - PAD_BOTTOM;
  const positions = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = PAD_TOP + (usableH * i) / (NODE_COUNT - 1);
    const x = i % 2 === 0 ? VIEW_W / 2 + 40 : VIEW_W / 2 - 40;
    positions.push({ x, y });
  }
  return positions;
}

function buildWindingPath(positions) {
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function Services() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const stepRefs = useRef([]);
  const nodeRefs = useRef([]);
  const completionRef = useRef(null);
  const stepStatesRef = useRef(services.map(() => "future"));

  const nodePositions = useMemo(() => getNodePositions(), []);
  const pathD = useMemo(() => buildWindingPath(nodePositions), [nodePositions]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const applyStepState = (index, state, animate = true) => {
        const step = stepRefs.current[index];
        const node = nodeRefs.current[index];
        if (!step) return;

        const pill = step.querySelector(".step-pill");
        const pillMark = step.querySelector(".step-pill-mark");
        const pillTitle = step.querySelector(".step-pill-title");
        const card = step.querySelector(".step-card");
        const glow = step.querySelector(".step-glow");

        const set = animate ? gsap.to : gsap.set;

        if (state === "active") {
          gsap.set(pill, { display: "none" });
          gsap.set(card, { display: "block" });
          gsap.set(step, { zIndex: 20 });
          if (animate) {
            gsap.fromTo(
              card,
              { opacity: 0, scale: 0.94, y: 6 },
              { opacity: 1, scale: 1.03, y: 0, duration: 0.55, ease: "power3.out" }
            );
            set(glow, { opacity: 1, duration: 0.6 });
          } else {
            gsap.set(card, { opacity: 1, scale: 1.03, y: 0 });
            gsap.set(glow, { opacity: 1 });
          }
        } else {
          gsap.set(card, { display: "none" });
          gsap.set(pill, { display: "flex" });
          gsap.set(step, { zIndex: 1 });
          set(glow, { opacity: 0, duration: 0.3 });

          if (state === "completed") {
            if (pillMark) pillMark.textContent = "\u2713";
            set(pill, { opacity: 1, scale: 1, duration: 0.4 });
            set(pillMark, { backgroundColor: "#111827", color: "#ffffff", duration: 0.4 });
            set(pillTitle, { color: "#4B5563", opacity: 1, duration: 0.4 });
          } else {
            // future
            if (pillMark) pillMark.textContent = `0${index + 1}`;
            set(pill, { opacity: 0.45, scale: 0.96, duration: 0.4 });
            set(pillMark, { backgroundColor: "#E5E7EB", color: "#9CA3AF", duration: 0.4 });
            set(pillTitle, { color: "#9CA3AF", opacity: 0.7, duration: 0.4 });
          }
        }

        if (node) {
          if (state === "active") {
            gsap.to(node, { attr: { r: 7 }, fill: "#111827", duration: 0.4 });
          } else if (state === "completed") {
            gsap.to(node, { attr: { r: 4 }, fill: "#111827", duration: 0.4 });
          } else {
            gsap.to(node, { attr: { r: 3 }, fill: "#D1D5DB", duration: 0.4 });
          }
        }

        stepStatesRef.current[index] = state;
      };

      const updateJourney = (progress, animate = true) => {
        const path = pathRef.current;
        if (path) {
          const pathLength = path.getTotalLength();
          const drawProgress = Math.min(progress / STEP_PHASE_END, 1);
          gsap.set(path, { strokeDashoffset: pathLength * (1 - drawProgress) });
        }

        const stepProgress = Math.min(progress / STEP_PHASE_END, 1);
        const rawIndex = Math.floor(stepProgress * NODE_COUNT);
        const allComplete = progress >= COMPLETE_THRESHOLD;

        services.forEach((_, i) => {
          const state = allComplete ? "completed" : i < rawIndex ? "completed" : i === rawIndex ? "active" : "future";
          if (stepStatesRef.current[i] !== state) {
            applyStepState(i, state, animate);
          }
        });

        if (completionRef.current) {
          if (allComplete) {
            gsap.to(completionRef.current, { opacity: 1, y: 0, duration: 0.5, pointerEvents: "auto" });
          } else {
            gsap.to(completionRef.current, { opacity: 0, y: 10, duration: 0.3, pointerEvents: "none" });
          }
        }
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // initial state: step 0 active, everything else future, road undrawn
        services.forEach((_, i) => applyStepState(i, i === 0 ? "active" : "future", false));

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${NODE_COUNT * 320}px`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateJourney(self.progress, true),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (pathRef.current) gsap.set(pathRef.current, { strokeDashoffset: 0 });
        services.forEach((_, i) => applyStepState(i, "completed", false));
        if (completionRef.current) {
          gsap.set(completionRef.current, { opacity: 1, y: 0, pointerEvents: "auto" });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F7FACF] h-screen w-full flex items-center overflow-hidden relative pt-28"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.02)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* LEFT SIDE: Pinned Content */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.1]">
            What we do
          </h2>

          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            At BriqMed Healthcare Solutions, we handle every step of the provider credentialing and enrollment
            process for physicians, nurse practitioners, and healthcare practices across the U.S.
          </p>

          <div className="mt-6 pt-4 border-t border-gray-300/60">
            <p className="text-xs font-medium tracking-wide uppercase text-gray-500">
              A single specialist team for every step of credentialing.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Layout Container */}
        <div className="lg:col-span-8 relative">
          {/* MOBILE VIEW (unchanged simplified list — see note below) */}
          <div className="block lg:hidden flex flex-col space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/90 p-4 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 relative flex items-center justify-center">
                      <img src={service.image} alt={service.title} className="object-contain max-h-5 w-auto" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">{service.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 pl-7">{service.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW */}
          <div className="hidden lg:block relative h-[560px] w-full max-w-xl mx-auto items-center justify-center">
            {/* Winding road, generated from the exact node positions below */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d={pathD} stroke="#dcdfe3" strokeWidth="1.5" strokeLinecap="round" />
                <path ref={pathRef} d={pathD} stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />

                {nodePositions.map((pos, i) => (
                  <circle
                    key={i}
                    ref={(el) => (nodeRefs.current[i] = el)}
                    cx={pos.x}
                    cy={pos.y}
                    r={3}
                    fill="#D1D5DB"
                  />
                ))}
              </svg>
            </div>

            {/* Steps: each renders a compact pill by default, and a full hero card only while active */}
            <div className="w-full h-full relative">
              {services.map((service, index) => {
                const isLeft = index % 2 === 0;
                const pos = nodePositions[index];
                const isFirst = index === 0;
                const isLast = index === NODE_COUNT - 1;
                // Centering every card on its node is what caused the first card to
                // push up into the nav and the last card to push down past the
                // container edge. Anchoring the two extremes so they only grow
                // into open space fixes both, for any card height.
                const anchorClass = isFirst ? "translate-y-0" : isLast ? "-translate-y-full" : "-translate-y-1/2";
                return (
                  <div
                    key={index}
                    ref={(el) => (stepRefs.current[index] = el)}
                    className="absolute w-full flex items-center"
                    style={{ top: `${(pos.y / VIEW_H) * 100}%` }}
                  >
                    <div
                      className={`relative w-80 ${anchorClass} ${isLeft ? "right-[54%] ml-auto" : "left-[54%]"}`}
                    >
                      {/* glow behind the active card */}
                      <div className="step-glow absolute -inset-3 rounded-2xl bg-amber-100/50 blur-xl opacity-0 pointer-events-none" />

                      {/* compact milestone pill — default state for completed & future steps */}
                      <div className="step-pill flex items-center gap-2.5 bg-white/70 backdrop-blur-sm px-3.5 py-2.5 rounded-[1.25rem] border border-gray-200/50 shadow-sm w-72">
                        <span className="step-pill-mark w-6 h-6 rounded-full bg-gray-200 text-gray-400 text-xs font-mono flex items-center justify-center shrink-0">
                          {`0${index + 1}`}
                        </span>
                        <span
                          className="step-pill-title text-sm font-medium text-gray-400 leading-snug [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden"
                        >
                          {service.title}
                        </span>
                      </div>

                      {/* full hero card — only shown while this step is active */}
                      <div
                        className="step-card bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-gray-900/10 shadow-xl w-80"
                        style={{ display: "none" }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-gray-400">{`0${index + 1}`}</span>
                        </div>
                        <h3 className="step-title text-base text-gray-900 font-semibold leading-snug">
                          {service.title}
                        </h3>
                        <p className="step-desc text-sm text-gray-500 mt-2 leading-relaxed">{service.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* End state — a floating card, not pinned to an edge, so it never collides with the last pill */}
              <div
                ref={completionRef}
                className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-2 pointer-events-none z-30"
              >
                <div className="bg-white/95 backdrop-blur-md border border-gray-900/10 shadow-2xl rounded-2xl px-8 py-6 flex flex-col items-center text-center">
                  <span className="text-[11px] uppercase tracking-widest font-mono text-gray-500">
                    Credentialing Complete
                  </span>
                  <span className="text-xl font-semibold text-gray-900 mt-1">Provider Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}