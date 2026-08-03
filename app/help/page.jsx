// app/help/page.jsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlinePaperClip,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const NAVY = "#0F1F3D";
const NAVY_SOFT = "#3B4B6B";
const GOLD = "#C9A227";
const GOLD_SOFT = "#E4C767";
const CREAM = "#FAF8F3";
const BLUE = "#1C29C9";

const customEase = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: customEase, delay: i * 0.08 },
  }),
};

const sidebarFade = {
  hidden: { opacity: 0, x: -24 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: customEase, delay: i * 0.1 },
  }),
};

const SUBJECTS = [
  "General Inquiry",
  "Provider Onboarding",
  "NPI Management",
  "Payer Enrollment",
  "CAQH Management",
  "ERA / EFT Setup",
  "License Tracking",
  "Billing & Payments",
  "Technical Support",
  "Other",
];

export default function HelpPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "+1",
    email: "",
    company: "",
    subject: "",
    message: "",
    attachment: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const fileInputRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "A valid email address is required.";
    if (!form.subject) e.subject = "Please select a subject.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFile = (file) => {
    if (file) setForm((prev) => ({ ...prev, attachment: file }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        subject: form.subject,
        message: form.message,
      };

      if (form.attachment) {
        payload.attachment = {
          fileName: form.attachment.name,
          fileUrl: `https://mock-storage.briqmed.com/uploads/${Date.now()}-${form.attachment.name}`,
          fileType: form.attachment.type,
          fileSize: form.attachment.size,
        };
      }

      const res = await fetch("/api/help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReferenceId(data.data?.ticketId || "TKT-UNKNOWN");
        setSubmitted(true);
      } else {
        setSubmitError(data.message || "Validation failed.");
      }
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <HiOutlineMail className="text-xl" />,
      label: "Email",
      value: "info@briqmed.com",
      href: "mailto:info@briqmed.com",
    },
    {
      icon: <HiOutlinePhone className="text-xl" />,
      label: "Phone",
      value: "+1 646 341 6783",
      href: "tel:+16463416783",
    },
    {
      icon: <HiOutlineLocationMarker className="text-xl" />,
      label: "Office",
      value: "New York, NY",
      href: null,
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#ffffff", color: NAVY }}
    >
      {/* BACKGROUND LAYERS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[130px] opacity-30"
          style={{
            background: `radial-gradient(circle, ${GOLD_SOFT}33, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-[5%] -right-[10%] w-[45vw] h-[45vw] rounded-full blur-[150px] opacity-20"
          style={{
            background: `radial-gradient(circle, ${NAVY_SOFT}22, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.018] bg-[radial-gradient(#0F1F3D_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* PAGE WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-10 md:py-16 lg:py-24">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight px-2"
            style={{ color: NAVY }}
          >
            How can we{" "}
            <span className="font-bold" style={{ color: BLUE }}>
              help you?
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed px-4"
          >
            Submit a ticket and our credentialing specialists will get back to
            you within one business day.
          </motion.p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">

          {/* SIDEBAR */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-4 space-y-5"
          >
            {/* Info card */}
            <motion.div
              variants={sidebarFade}
              custom={0}
              className="rounded-2xl md:rounded-3xl p-6 md:p-8 border-0 md:border shadow-sm"
              style={{
                backgroundColor: NAVY,
                borderColor: `${GOLD}30`,
                color: CREAM,
              }}
            >
              <div
                className="text-xs font-mono tracking-widest uppercase mb-5"
                style={{ color: GOLD_SOFT }}
              >
                Get in Touch
              </div>
              <div className="space-y-4 md:space-y-5">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={sidebarFade}
                    custom={i + 1}
                    className="flex items-center gap-3.5"
                  >
                    <div
                      className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl border-0 md:border flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${GOLD}18`,
                        borderColor: `${GOLD}40`,
                        color: GOLD_SOFT,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest opacity-60 mb-0.5">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium hover:underline transition-colors"
                          style={{ color: CREAM }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div
                className="my-6 md:my-8 h-px"
                style={{ backgroundColor: `${GOLD}25` }}
              />

              {/* Response time badge */}
              <div
                className="flex items-center gap-3 p-3.5 md:p-4 rounded-xl md:rounded-2xl border-0 md:border"
                style={{
                  backgroundColor: `${GOLD}12`,
                  borderColor: `${GOLD}30`,
                }}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: GOLD }}
                  />
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: `${GOLD}60` }}
                  />
                </div>
                <div>
                  <div className="text-[11px] md:text-xs font-semibold" style={{ color: GOLD_SOFT }}>
                    Typical Response Time
                  </div>
                  <div className="text-xs md:text-sm font-medium" style={{ color: CREAM }}>
                    Within 1 Business Day
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tips card */}
            <motion.div
              variants={sidebarFade}
              custom={4}
              className="rounded-2xl md:rounded-3xl p-6 md:p-7 border-0 md:border shadow-sm"
              style={{
                backgroundColor: "#ffffff",
                borderColor: `${NAVY}10`,
              }}
            >
              <div
                className="text-xs font-mono tracking-widest uppercase mb-4"
                style={{ color: NAVY_SOFT }}
              >
                Quick Tips
              </div>
              {[
                "Include your NPI number for faster resolution",
                "Attach screenshots or documents when possible",
                "Check our services page for common questions",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 mb-3.5 last:mb-0">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 font-bold"
                    style={{ backgroundColor: `${BLUE}12`, color: BLUE }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed" style={{ color: NAVY_SOFT }}>
                    {tip}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.aside>

          {/* FORM PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <div
              className="rounded-2xl md:rounded-3xl border-0 md:border shadow-sm overflow-hidden"
              style={{
                backgroundColor: "#ffffff",
                borderColor: `${NAVY}10`,
              }}
            >
              {/* Form header strip */}
              <div
                className="px-6 md:px-8 py-5 md:py-6 border-b flex items-center justify-between"
                style={{ borderColor: `${NAVY}08` }}
              >
                <div>
                  <h2
                    className="text-lg md:text-xl font-serif font-semibold"
                    style={{ color: NAVY }}
                  >
                    Submit a Ticket
                  </h2>
                  <p className="text-xs md:text-sm mt-0.5" style={{ color: NAVY_SOFT }}>
                    Fields marked with{" "}
                    <span className="text-red-500 font-bold">*</span> are required.
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="p-6 md:p-8 space-y-5 md:space-y-6"
                    noValidate
                  >
                    {/* Row 1: Full Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        id="fullName"
                        label="Full Name"
                        required
                        error={errors.fullName}
                        focused={focusedField === "fullName"}
                      >
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={form.fullName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("fullName")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Dr. Jane Smith"
                          className="w-full bg-transparent outline-none text-sm"
                          style={{ color: NAVY }}
                        />
                      </FormField>

                      <FormField
                        id="phone"
                        label="Phone Number"
                        focused={focusedField === "phone"}
                      >
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="+1 000 000 0000"
                          className="w-full bg-transparent outline-none text-sm"
                          style={{ color: NAVY }}
                        />
                      </FormField>
                    </div>

                    {/* Row 2: Email + Company */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        id="email"
                        label="Email Address"
                        required
                        error={errors.email}
                        focused={focusedField === "email"}
                      >
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="jane@clinic.com"
                          className="w-full bg-transparent outline-none text-sm"
                          style={{ color: NAVY }}
                        />
                      </FormField>

                      <FormField
                        id="company"
                        label="Company / Practice Name"
                        focused={focusedField === "company"}
                      >
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("company")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Sunrise Medical Group"
                          className="w-full bg-transparent outline-none text-sm"
                          style={{ color: NAVY }}
                        />
                      </FormField>
                    </div>

                    {/* Subject Dropdown */}
                    <FormField
                      id="subject"
                      label="Message Subject"
                      required
                      error={errors.subject}
                      focused={focusedField === "subject"}
                    >
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent outline-none text-sm appearance-none cursor-pointer"
                        style={{ color: form.subject ? NAVY : "#9ca3af" }}
                      >
                        <option value="" disabled>
                          Select a subject…
                        </option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s} style={{ color: NAVY }}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    {/* Message */}
                    <FormField
                      id="message"
                      label="Ask Your Question"
                      required
                      error={errors.message}
                      focused={focusedField === "message"}
                      isTextArea
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Describe your issue or question in detail…"
                        className="w-full bg-transparent outline-none text-sm resize-none"
                        style={{ color: NAVY }}
                      />
                    </FormField>

                    {/* Attachment */}
                    <div>
                      <label
                        className="block text-sm font-bold uppercase tracking-widest mb-2"
                        style={{ color: NAVY }}
                      >
                        Attachment{" "}
                        <span className="normal-case tracking-normal font-sans font-normal text-gray-400">
                          (optional)
                        </span>
                      </label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-7 cursor-pointer transition-all duration-200 ${
                          dragOver ? "scale-[1.01]" : ""
                        }`}
                        style={{
                          borderColor: dragOver
                            ? GOLD
                            : form.attachment
                            ? BLUE
                            : `${NAVY}20`,
                          backgroundColor: dragOver
                            ? `${GOLD}06`
                            : form.attachment
                            ? `${BLUE}06`
                            : `${NAVY}03`,
                        }}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFile(e.target.files[0])}
                        />
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: form.attachment
                              ? `${BLUE}15`
                              : `${NAVY}08`,
                            color: form.attachment ? BLUE : NAVY_SOFT,
                          }}
                        >
                          <HiOutlinePaperClip className="text-xl" />
                        </div>
                        {form.attachment ? (
                          <div className="text-center">
                            <p
                              className="text-sm font-semibold"
                              style={{ color: BLUE }}
                            >
                              {form.attachment.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {(form.attachment.size / 1024).toFixed(1)} KB ·{" "}
                              <button
                                type="button"
                                className="underline hover:text-red-400 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setForm((prev) => ({
                                    ...prev,
                                    attachment: null,
                                  }));
                                }}
                              >
                                Remove
                              </button>
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p
                              className="text-sm font-medium"
                              style={{ color: NAVY_SOFT }}
                            >
                              Drop a file here or{" "}
                              <span className="underline" style={{ color: BLUE }}>
                                browse
                              </span>
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              PDF, PNG, JPG, DOCX — max 10 MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    {submitError && (
                      <div className="text-sm text-red-500 font-medium px-1">
                        {submitError}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 gap-4 flex-wrap">
                      <p className="text-sm font-semibold" style={{ color: NAVY_SOFT }}>
                        By submitting, you agree to our{" "}
                        <a
                          href="/privacy-policy"
                          className="underline hover:opacity-70 transition-opacity"
                          style={{ color: NAVY }}
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={loading ? {} : {
                          scale: 1.03,
                          boxShadow: `0 10px 28px -5px ${BLUE}40`,
                        }}
                        whileTap={loading ? {} : { scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-2.5 font-semibold px-6 py-3 rounded-full text-white text-sm transition-colors duration-300 w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: BLUE }}
                      >
                        {loading ? "Submitting..." : "Submit Ticket"}
                        {!loading && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  /* SUCCESS STATE */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: customEase }}
                    className="p-12 flex flex-col items-center justify-center text-center min-h-[480px] gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.15,
                      }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${BLUE}15`, color: BLUE }}
                    >
                      <HiOutlineCheckCircle className="text-5xl" />
                    </motion.div>

                    <div>
                      <h3
                        className="text-2xl sm:text-3xl font-serif font-light"
                        style={{ color: NAVY }}
                      >
                        Ticket Submitted!
                      </h3>
                      <p className="mt-3 text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
                        Thank you,{" "}
                        <span className="font-semibold" style={{ color: NAVY }}>
                          {form.fullName || "there"}
                        </span>
                        . Our team will review your request and respond to{" "}
                        <span className="font-semibold" style={{ color: BLUE }}>
                          {form.email}
                        </span>{" "}
                        within one business day.
                      </p>
                    </div>

                    <div
                      className="flex items-center gap-2 text-xs font-mono px-5 py-2.5 rounded-full border"
                      style={{
                        color: GOLD,
                        borderColor: `${GOLD}40`,
                        backgroundColor: `${GOLD}08`,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: GOLD }}
                      />
                      Reference: {referenceId}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          fullName: "",
                          phone: "+1",
                          email: "",
                          company: "",
                          subject: "",
                          message: "",
                          attachment: null,
                        });
                        setErrors({});
                      }}
                      className="mt-2 text-sm font-medium underline transition-colors"
                      style={{ color: NAVY_SOFT }}
                    >
                      Submit another ticket
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* Reusable FormField wrapper */
function FormField({ id, label, required, error, focused, isTextArea, children }) {
  const fieldNavy = "#0F1F3D";
  const fieldNavySoft = "#3B4B6B";
  const fieldBlue = "#1C29C9";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold uppercase tracking-widest mb-2"
        style={{ color: fieldNavy }}
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500 normal-case tracking-normal font-sans">
            *
          </span>
        )}
      </label>
      <div
        className={`relative flex ${
          isTextArea ? "items-start" : "items-center"
        } gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-200`}
        style={{
          borderColor: error
            ? "#ef4444"
            : focused
            ? fieldBlue
            : `${fieldNavy}15`,
          backgroundColor: error
            ? "#fef2f2"
            : focused
            ? `${fieldBlue}04`
            : `${fieldNavy}03`,
          boxShadow: focused
            ? `0 0 0 3px ${fieldBlue}15`
            : error
            ? "0 0 0 3px #ef444420"
            : "none",
        }}
      >
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-1.5 text-xs text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
