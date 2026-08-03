// ============================================================================
// FILE: components/HealthcareStorytellingEditorial.jsx
// ============================================================================

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAVY = "#0F1F3D";
const NAVY_SOFT = "#3B4B6B";
const GOLD = "#C9A227";
const GOLD_SOFT = "#E4C767";
const CREAM = "#FAF8F3";
const WHITE = "#FFFFFF";

// Fallback only — the real value is measured from the DOM below.
const NAVBAR_HEIGHT_FALLBACK = 120;

// IMPORTANT: point this selector at your actual navbar element.
// If your navbar doesn't have a matching selector already, add
// `data-site-navbar` to its outer wrapper (e.g. <header data-site-navbar>...</header>)
// and leave this as-is.
const NAVBAR_SELECTOR = "[data-site-navbar], header";

const SECTIONS = [
  {
    id: "section-01",
    number: "01",
    title: "Provider Onboarding",
    description:
      "We begin every credentialing journey with precision. Our team collects all necessary documents and information to ensure your provider profile is complete and ready for enrollment.",
    includes: [
      "Document collection and verification",
      "Credentialing checklist preparation",
      "Provider profile setup",
    ],
    illustrationType: "onboarding",
  },
  {
    id: "section-02",
    number: "02",
    title: "NPI (NPPES) Management",
    description:
      "Ensure your NPI profile reflects accurate and up-to-date information. We assist with new applications, demographic updates, and maintenance for both individual and organizational NPIs.",
    includes: [
      "New NPI application (Type 1 & Type 2)",
      "Demographic updates and corrections",
      "Ongoing profile maintenance",
    ],
    illustrationType: "npi",
  },
  {
    id: "section-03",
    number: "03",
    title: "Payer Enrollment (Medicare, Medicaid & Commercial)",
    description:
      "Join the networks that matter most. We handle credentialing and enrollment with Medicare, Medicaid, and commercial insurance payers to ensure your participation and timely reimbursement.",
    includes: [
      "Application submission and tracking",
      "Payer follow-ups and communication",
      "Revalidations and re-enrollments",
    ],
    illustrationType: "credentialing",
  },
  {
    id: "section-04",
    number: "04",
    title: "CAQH Management",
    description:
      "Your CAQH profile — always current and attested. We create and maintain your CAQH account, ensuring that all information and attachments are accurate for smooth payer credentialing.",
    includes: [
      "CAQH ID creation and setup",
      "Profile updates and uploads",
      "Regular re-attestation management",
    ],
    illustrationType: "caqh",
  },
  {
    id: "section-05",
    number: "05",
    title: "Demographic & Practice Updates",
    description:
      "Keep your details consistent across all payers. We handle updates for address changes, group affiliations, and practice details to ensure all payers have accurate records.",
    includes: [
      "Address, contact, and practice updates",
      "Group/facility affiliation updates",
      "Payer portal corrections",
    ],
    illustrationType: "demographic",
  },
  {
    id: "section-06",
    number: "06",
    title: "License & Certification Tracking",
    description:
      "Stay compliant — no missed renewals. We monitor provider licenses and certifications, sending timely reminders before expiration.",
    includes: [
      "Tracking of all licenses and certifications",
      "Expiration alerts and renewal support",
      "Document updates post-renewal",
    ],
    illustrationType: "license",
  },
  {
    id: "section-07",
    number: "07",
    title: "ERA / EFT Setup",
    description:
      "Simplify how you receive payments. We assist in enrolling for ERA/EFT with insurance payers so that payments and remittance reports are received electronically.",
    includes: [
      "Form preparation and submission",
      "Banking verification coordination",
      "Setup confirmation and verification",
    ],
    illustrationType: "eraEft",
  },
  {
    id: "section-08",
    number: "08",
    title: "Provider Offboarding",
    description:
      "Close your credentialing cycle properly and securely. We handle credentialing terminations, remove practice details from portals, and ensure data is safely handed over and deleted from our systems.",
    includes: [
      "Payer and portal terminations",
      "CAQH and directory updates",
      "Secure data transfer and removal",
    ],
    illustrationType: "offboarding",
  },
  {
    id: "section-09",
    number: "09",
    title: "Ongoing Maintenance & Support",
    description:
      "Credentialing is continuous — and we're here for the long run. Our maintenance plans ensure providers stay compliant year-round through regular updates, renewals, and audits.",
    includes: [
      "Quarterly CAQH updates",
      "Annual recredentialing",
      "Renewal tracking and reminders",
      "Credentialing profile audits",
    ],
    illustrationType: "maintenance",
  },
];

export default function HealthcareStorytellingEditorial() {
  const containerRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(NAVBAR_HEIGHT_FALLBACK);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  // Measure the real navbar height so centering is always accurate,
  // even if the navbar's size changes (responsive breakpoints, font
  // loading, etc.)
  useEffect(() => {
    const measure = () => {
      const navEl = document.querySelector(NAVBAR_SELECTOR);
      if (navEl) {
        const rect = navEl.getBoundingClientRect();
        // rect.bottom already accounts for the navbar's own top offset/margin
        setNavbarHeight(Math.ceil(rect.bottom));
      }
    };

    measure();

    // Re-measure on resize and after fonts/images load, since navbar
    // height can shift as things settle.
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const t = setTimeout(measure, 300);

    // Watch for navbar size changes directly (e.g. mobile menu toggle)
    let resizeObserver;
    const navEl = document.querySelector(NAVBAR_SELECTOR);
    if (navEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(navEl);
    }

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      clearTimeout(t);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // Only register ScrollTrigger animations on desktop screen widths
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (!mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray(".story-chapter");

      chapters.forEach((chapter) => {
        const titleIntro = chapter.querySelector(".title-intro-screen");
        const chapterContent = chapter.querySelector(".chapter-content-grid");
        const illustration = chapter.querySelector(".illustration-box");
        const content = chapter.querySelector(".content-box");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            onUpdate: (self) => {
              gsap.to(chapter, { backgroundColor: WHITE, duration: 0.3 });
            },
          },
        });

        tl.to(titleIntro, {
          opacity: 0,
          y: -60,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.inOut",
        });

        tl.fromTo(
          chapterContent,
          { opacity: 0, y: 50, pointerEvents: "none" },
          { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6, ease: "power2.out" },
          "-=0.1"
        );

        tl.fromTo(
          illustration,
          { scale: 0.85, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, ease: "power2.out", duration: 0.6 },
          "<"
        );

        tl.fromTo(
          content,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, ease: "power3.out", duration: 0.6 },
          "<"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [navbarHeight]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: WHITE, color: NAVY }}
    >
      {/* --- LAYERED EDITORIAL BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40 animate-pulse"
          style={{ background: `radial-gradient(circle, ${GOLD_SOFT}33, transparent 70%)` }}
        />
        <div
          className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-30"
          style={{ background: `radial-gradient(circle, ${NAVY_SOFT}22, transparent 70%)` }}
        />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0F1F3D_1px,transparent_1px)] [background-size:24px_24px]" />

        <CursorGlow x={mouseX} y={mouseY} />
      </div>

      {/* --- STORY CHAPTERS --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-0 lg:px-0">
        {SECTIONS.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <section
              key={section.id}
              className="story-chapter relative w-full lg:min-h-screen lg:min-h-[100dvh] flex items-center justify-center py-12 lg:py-0 transition-colors duration-500 border-b border-gray-100 last:border-b-0 lg:border-b-0"
              style={{ backgroundColor: WHITE }}
            >
              {/* Centered Intro View - ONLY on Desktop */}
              <div
                className="title-intro-screen hidden lg:flex absolute inset-0 flex-col items-center justify-center text-center z-20 pointer-events-none px-6"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-[1px] w-12 sm:w-20" style={{ background: `linear-gradient(to left, ${GOLD}88, transparent)` }} />
                  <span
                    className="text-xs sm:text-sm font-mono tracking-widest px-4 py-1.5 rounded-md border shadow-sm"
                    style={{ color: GOLD, backgroundColor: `${NAVY}05`, borderColor: `${GOLD}40` }}
                  >
                    CHAPTER {section.number}
                  </span>
                  <div className="h-[1px] w-12 sm:w-20" style={{ background: `linear-gradient(to right, ${GOLD}88, transparent)` }} />
                </div>
                <h2 className="text-3xl sm:text-6xl md:text-7xl font-light tracking-tight max-w-4xl" style={{ color: NAVY }}>
                  {section.title}
                </h2>
                <p className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] mt-6 opacity-60" style={{ color: NAVY_SOFT }}>
                  Scroll down to view service content
                </p>
              </div>

              {/* Full Service Grid View - Directly visible on mobile, animated on Desktop */}
              <div
                className="chapter-content-grid w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center lg:opacity-0 lg:pointer-events-none"
                style={{ marginTop: 0 }}
                ref={(el) => {
                  if (el) {
                    if (window.matchMedia("(min-width: 1024px)").matches) {
                      el.style.marginTop = `${navbarHeight}px`;
                    }
                  }
                }}
              >
                {/* Mobile Chapter Badge */}
                <div className="lg:hidden flex items-center gap-3">
                  <span
                    className="text-[11px] font-mono tracking-wider px-3 py-1 rounded border"
                    style={{ color: GOLD, backgroundColor: `${NAVY}05`, borderColor: `${GOLD}30` }}
                  >
                    CHAPTER {section.number}
                  </span>
                  <div className="h-px flex-grow" style={{ backgroundColor: `${NAVY}10` }} />
                </div>

                <div
                  className={`illustration-box relative lg:col-span-6 flex items-center justify-center ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <IllustrationCard type={section.illustrationType} />
                </div>

                <div
                  className={`content-box lg:col-span-6 flex flex-col justify-center space-y-6 lg:space-y-8 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-6xl font-light tracking-tight" style={{ color: NAVY }}>
                    {section.title}
                  </h2>

                  <p className="text-base sm:text-lg lg:text-xl font-light leading-relaxed text-gray-700">
                    {section.description}
                  </p>

                  <div className="space-y-3.5 pt-1">
                    <h4 className="text-xs sm:text-sm uppercase tracking-[0.15em] font-medium block" style={{ color: GOLD }}>
                      Includes
                    </h4>
                    <ul className="grid gap-2.5">
                      {section.includes.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.08, duration: 0.4 }}
                          className="flex items-center gap-3 p-3.5 rounded-xl border backdrop-blur-sm shadow-sm"
                          style={{ backgroundColor: WHITE, borderColor: `${NAVY}10` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                          <span className="text-sm sm:text-base font-medium" style={{ color: NAVY }}>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>

      <div className="h-[10vh] lg:h-[20vh]" />
    </div>
  );
}

function CursorGlow({ x, y }) {
  const cursorX = useSpring(x, { stiffness: 500, damping: 50 });
  const cursorY = useSpring(y, { stiffness: 500, damping: 50 });

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: -200,
        top: -200,
        backgroundColor: `${GOLD_SOFT}15`,
      }}
      className="absolute pointer-events-none w-[400px] h-[400px] rounded-full blur-[90px]"
    />
  );
}

function IllustrationCard({ type }) {
  return (
    <div
      className="relative w-full aspect-[4/3] rounded-3xl border backdrop-blur-xl p-8 flex items-center justify-center overflow-hidden shadow-xl group"
      style={{ backgroundColor: WHITE, borderColor: `${NAVY}15` }}
    >
      <div
        className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
        style={{ background: `linear-gradient(to top right, ${GOLD_SOFT}15, transparent, ${NAVY_SOFT}10)` }}
      />
      {type === "onboarding" && <OnboardingVisual />}
      {type === "npi" && <NpiVisual />}
      {type === "caqh" && <CaqhVisual />}
      {type === "credentialing" && <CredentialingVisual />}
      {type === "demographic" && <DemographicVisual />}
      {type === "license" && <LicenseVisual />}
      {type === "eraEft" && <EraEftVisual />}
      {type === "offboarding" && <OffboardingVisual />}
      {type === "maintenance" && <MaintenanceVisual />}
    </div>
  );
}

function OnboardingVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold"
              style={{ backgroundColor: `${GOLD}20`, borderColor: GOLD, color: GOLD_SOFT }}
            >
              ✓
            </div>
            <div>
              <div className="text-xs font-mono opacity-70">CREDENTIAL ID</div>
              <div className="text-sm font-semibold">PRV-8492-AX</div>
            </div>
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-[10px] border"
            style={{ backgroundColor: `${GOLD}20`, color: GOLD_SOFT, borderColor: `${GOLD}50` }}
          >
            Verified
          </span>
        </div>

        <div className="space-y-3">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full"
              style={{ backgroundColor: GOLD }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono opacity-80">
            <span>Documents Synced</span>
            <span style={{ color: GOLD_SOFT }}>100%</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-6 left-12 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🛡️
        </div>
        <div
          className="absolute bottom-8 right-12 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          📄
        </div>
      </motion.div>
    </div>
  );
}

function NpiVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [6, -6, 6], rotate: [0, -1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-wider" style={{ color: GOLD_SOFT }}>NPPES REGISTRY</span>
          <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: GOLD }} />
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-xl border flex items-center justify-between" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="text-xs opacity-70">Type 1 (Individual)</span>
            <span className="text-xs font-mono">1942385910</span>
          </div>
          <div className="p-3 rounded-xl border flex items-center justify-between" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="text-xs opacity-70">Type 2 (Entity)</span>
            <span className="text-xs font-mono">1255890123</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-10 right-10 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          ⚡
        </div>
        <div
          className="absolute bottom-10 left-10 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🔍
        </div>
      </motion.div>
    </div>
  );
}

function CaqhVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 1, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-wider" style={{ color: GOLD_SOFT }}>CAQH PROVIEW</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-500/20 text-green-300 border border-green-500/30">Attested</span>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-xl border flex items-center justify-between" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="text-xs opacity-70">Re-attestation Due</span>
            <span className="text-xs font-mono text-amber-300">Q3 2026</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[90%]" style={{ backgroundColor: GOLD }} />
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-8 left-10 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🔄
        </div>
        <div
          className="absolute bottom-6 right-10 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          📋
        </div>
      </motion.div>
    </div>
  );
}

function CredentialingVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [6, -6, 6], rotate: [0, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-wider" style={{ color: GOLD_SOFT }}>PAYER ENROLLMENT</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">Active</span>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-xl border flex items-center justify-between" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="text-xs opacity-70">Commercial / Medicaid</span>
            <span className="text-xs font-mono text-emerald-300">Approved</span>
          </div>
          <div className="flex justify-between text-[11px] font-mono opacity-80 pt-1">
            <span>Network Status</span>
            <span style={{ color: GOLD_SOFT }}>In-Network</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-10 right-8 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🏥
        </div>
        <div
          className="absolute bottom-8 left-8 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🤝
        </div>
      </motion.div>
    </div>
  );
}

function DemographicVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 1, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-wider" style={{ color: GOLD_SOFT }}>
            PRACTICE RECORDS
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Synced
          </span>
        </div>
        <div className="space-y-3">
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Practice Address</span>
            <span className="text-xs font-mono text-emerald-300">Updated</span>
          </div>
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Group Affiliation</span>
            <span className="text-xs font-mono text-emerald-300">Confirmed</span>
          </div>
          <div className="flex justify-between text-[11px] font-mono opacity-80 pt-1">
            <span>Payer Portals</span>
            <span style={{ color: GOLD_SOFT }}>3/3 Synced</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 27, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-8 left-10 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          📍
        </div>
        <div
          className="absolute bottom-8 right-10 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🏢
        </div>
      </motion.div>
    </div>
  );
}

function LicenseVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-wider" style={{ color: GOLD_SOFT }}>
            LICENSE MONITOR
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
            2 Expiring
          </span>
        </div>

        <div className="space-y-3">
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">State License (RN)</span>
            <span className="text-xs font-mono text-amber-300">45 days left</span>
          </div>
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Board Certification</span>
            <span className="text-xs font-mono text-emerald-300">Active</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "72%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full"
              style={{ backgroundColor: GOLD }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono opacity-80">
            <span>Compliance Score</span>
            <span style={{ color: GOLD_SOFT }}>72%</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-10 right-10 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🎓
        </div>
        <div
          className="absolute bottom-10 left-10 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          ⏰
        </div>
      </motion.div>
    </div>
  );
}

function EraEftVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 1, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-wider" style={{ color: GOLD_SOFT }}>
            ERA / EFT STATUS
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Enrolled
          </span>
        </div>

        <div className="space-y-3">
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Electronic Remittance</span>
            <span className="text-xs font-mono text-emerald-300">Active</span>
          </div>
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Bank Verification</span>
            <span className="text-xs font-mono text-emerald-300">Confirmed</span>
          </div>
          <div className="flex justify-between text-[11px] font-mono opacity-80 pt-1">
            <span>Payers Connected</span>
            <span style={{ color: GOLD_SOFT }}>12/12</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 29, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-8 left-10 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          💳
        </div>
        <div
          className="absolute bottom-8 right-10 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🏦
        </div>
      </motion.div>
    </div>
  );
}

function OffboardingVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [6, -6, 6], rotate: [0, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-wider" style={{ color: GOLD_SOFT }}>
            OFFBOARDING STATUS
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-500/20 text-slate-300 border border-slate-500/30">
            Closed
          </span>
        </div>

        <div className="space-y-3">
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Payer Terminations</span>
            <span className="text-xs font-mono text-emerald-300">Complete</span>
          </div>
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Data Removal</span>
            <span className="text-xs font-mono text-emerald-300">Verified</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full"
              style={{ backgroundColor: GOLD }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono opacity-80">
            <span>Cycle Closed</span>
            <span style={{ color: GOLD_SOFT }}>100%</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 31, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-10 right-10 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🔒
        </div>
        <div
          className="absolute bottom-10 left-10 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          📤
        </div>
      </motion.div>
    </div>
  );
}

function MaintenanceVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 1, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 p-6 rounded-2xl border backdrop-blur-2xl shadow-xl"
        style={{ backgroundColor: NAVY, borderColor: `${GOLD}40`, color: CREAM }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-wider" style={{ color: GOLD_SOFT }}>
            MAINTENANCE PLAN
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Year-Round
          </span>
        </div>

        <div className="space-y-3">
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Next CAQH Update</span>
            <span className="text-xs font-mono text-amber-300">Q4 2026</span>
          </div>
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs opacity-70">Recredentialing</span>
            <span className="text-xs font-mono text-emerald-300">On Track</span>
          </div>
          <div className="flex justify-between text-[11px] font-mono opacity-80 pt-1">
            <span>Audit Score</span>
            <span style={{ color: GOLD_SOFT }}>98%</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-8 left-10 w-12 h-12 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          🔧
        </div>
        <div
          className="absolute bottom-8 right-10 w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center text-xs shadow-md"
          style={{ backgroundColor: WHITE, borderColor: `${GOLD}40` }}
        >
          📆
        </div>
      </motion.div>
    </div>
  );
}