"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineShieldCheck, HiOutlineArrowLeft } from "react-icons/hi";

const NAVY = "#0F1F3D";
const NAVY_SOFT = "#3B4B6B";
const GOLD = "#C9A227";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden py-16 md:py-24">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-[0.12]"
          style={{ background: `radial-gradient(circle, ${GOLD}33, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 -left-[10%] w-[45vw] h-[45vw] rounded-full blur-[150px] opacity-[0.08]"
          style={{ background: `radial-gradient(circle, ${NAVY_SOFT}22, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-75 mb-10"
          style={{ color: NAVY_SOFT }}
        >
          <HiOutlineArrowLeft className="text-lg" />
          <span>Back to Home</span>
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight" style={{ color: NAVY }}>
            Privacy <span className="font-bold">Policy</span>
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest mt-1" style={{ color: GOLD }}>
            Last updated: August 2026
          </p>
        </div>

        {/* Content Container */}
        <div
          className="prose prose-slate max-w-none rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border shadow-sm leading-relaxed text-gray-600 space-y-6"
          style={{ backgroundColor: "#ffffff", borderColor: `${NAVY}08` }}
        >
          <p className="text-base md:text-lg font-light leading-relaxed">
            BriqMed respects your privacy and is committed to protecting the information you share with us. We collect only the personal and professional details necessary to provide credentialing, enrollment, and related support services.
          </p>

          <p className="text-base md:text-lg font-light leading-relaxed">
            All documents and sensitive information you provide are kept secure and accessible only to authorized personnel. We do not sell, share, or disclose your information to third parties except when required to complete your credentialing tasks with payers, regulatory agencies, or official platforms such as CAQH or NPPES.
          </p>

          <p className="text-base md:text-lg font-light leading-relaxed">
            By using our website or services, you consent to our handling of information in a secure and responsible manner.
          </p>

          <div
            className="mt-8 pt-8 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ borderColor: `${NAVY}08` }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: NAVY_SOFT }}>
                Questions or Concerns?
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                Our support team is here to help you.
              </p>
            </div>
            <a
              href="mailto:info@briqmed.com"
              className="inline-flex items-center justify-center font-semibold px-5 py-3 rounded-full text-white text-sm transition-all hover:scale-102 hover:shadow-md"
              style={{ backgroundColor: NAVY }}
            >
              Info@briqmed.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
