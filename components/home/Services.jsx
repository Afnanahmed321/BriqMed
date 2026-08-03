"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ClipboardCheck,
  RefreshCw,
  Fingerprint,
  Landmark,
  MapPin,
  ShieldCheck,
  Banknote,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: ClipboardCheck,
    title: "Provider Credentialing & Insurance Enrollment",
    description:
      "Complete file setup, application prep, and payer review handled from day one.",
  },
  {
    icon: RefreshCw,
    title: "CAQH Profile Creation, Updates & Maintenance",
    description:
      "Ongoing reattestation and data sync, so your profile always stays current.",
  },
  {
    icon: Fingerprint,
    title: "NPPES / NPI Registration & Management",
    description:
      "Type I and Type II registration, with taxonomy codes aligned correctly.",
  },
  {
    icon: Landmark,
    title: "Medicare, Medicaid & Commercial Payer Enrollment",
    description:
      "Applications submitted and followed up on directly with every payer.",
  },
  {
    icon: MapPin,
    title: "Provider Demographic Updates",
    description:
      "Practice locations and panel status kept in sync across every payer.",
  },
  {
    icon: ShieldCheck,
    title: "License & Certification Tracking",
    description:
      "Expiration alerts sent ahead of time, so nothing lapses unnoticed.",
  },
  {
    icon: Banknote,
    title: "ERA / EFT Setup",
    description:
      "Electronic remittance and direct deposit configured end to end.",
  },
  {
    icon: UserPlus,
    title: "End-to-End Provider Onboarding & Offboarding Support",
    description:
      "Smooth transitions handled for new hires and departing staff alike.",
  },
];

function ServiceCard({ service, index, onActive }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const Icon = service.icon;

  useEffect(() => {
    if (isInView) onActive(index);
  }, [isInView, index, onActive]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start gap-5">

        <div className="min-w-0 flex-1">
          <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-slate-900">
            {service.title}
          </h3>
          <p className="mt-2 text-[16px] leading-relaxed text-slate-500">
            {service.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = services.length;

  return (
    <section
      aria-labelledby="services-heading"
      className="w-full bg-[#FAFAF9] py-18 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Left column */}
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <span className="font-semibold text-[25px] uppercase tracking-[0.04em] text-[#0F1F3D]">
              What we do ?
            </span>

            <h2
              id="services-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 lg:text-5xl"
            >
              Credentialing,
              <br />
              handled end to end.
            </h2>

            <p className="mt-5 max-w-sm text-lg leading-relaxed text-slate-500">
              BriqMed manages every step of provider credentialing and payer
              enrollment for physicians, nurse practitioners, and healthcare
              practices across the U.S.
            </p>
          </div>
        </header>

        {/* Right column */}
        <div className="flex flex-col gap-5 lg:col-span-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onActive={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}