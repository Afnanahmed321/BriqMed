"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineDocumentText, HiOutlineArrowLeft } from "react-icons/hi";

const NAVY = "#0F1F3D";
const NAVY_SOFT = "#3B4B6B";
const GOLD = "#C9A227";

export default function TermsOfService() {
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
            Terms of <span className="font-bold">Service</span>
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
            By using the BriqMed website or engaging BriqMed Healthcare Solutions for credentialing, enrollment, or related administrative services, you agree to provide complete, accurate, and timely information and documentation required to process your requests.
          </p>

          <p className="text-base md:text-lg font-light leading-relaxed">
            BriqMed will use reasonable, best-effort measures to submit applications, follow up with payers, and communicate status updates. However, all approvals, timelines, credentialing decisions, and network participation outcomes are determined solely by insurance payers, government programs, and regulatory agencies. BriqMed does not guarantee approval, acceptance, or processing timeframes.
          </p>

          <p className="text-base md:text-lg font-light leading-relaxed">
            Fees paid to BriqMed are for services rendered and administrative work performed and are not contingent upon approval outcomes. Unless otherwise agreed in writing, fees are non-refundable once work has commenced.
          </p>

          <p className="text-base md:text-lg font-light leading-relaxed">
            BriqMed shall not be liable for delays, denials, terminations, or other outcomes resulting from payer policies, regulatory requirements, third-party actions, or information provided by the client. Our total liability, if any, shall not exceed the amount paid for the specific service giving rise to the claim.
          </p>

          <p className="text-base md:text-lg font-light leading-relaxed">
            By continuing to use our services, you agree to communicate promptly regarding requests, updates, or required documentation. These terms are governed by the laws of the United States, without regard to conflict of law principles.
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
