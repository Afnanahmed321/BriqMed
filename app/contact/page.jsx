// app/contact/page.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const NAVY = "#0F1F3D";
const NAVY_SOFT = "#3B4B6B";
const GOLD = "#C9A227";
const GOLD_SOFT = "#E4C767";
const CREAM = "#FAF8F3";
const BLUE = "#1C29C9";
const MAROON = "#5B0222";

const customEase = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: customEase, delay: i * 0.1 },
  }),
};

const INFO_CARDS = [
  {
    icon: <HiOutlinePhone className="text-2xl" />,
    label: "Call Us",
    value: "+1 646 341 6783",
    sub: "Mon – Fri, 9 AM – 6 PM EST",
    href: "tel:+16463416783",
  },
  {
    icon: <HiOutlineMail className="text-2xl" />,
    label: "Email Us",
    value: "info@briqmed.com",
    sub: "We reply within 1 business day",
    href: "mailto:info@briqmed.com",
  },
  {
    icon: <HiOutlineClock className="text-2xl" />,
    label: "Business Hours",
    value: "Mon – Fri",
    sub: "9:00 AM – 6:00 PM EST",
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "A valid email address is required.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please write at least 10 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
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

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-25"
          style={{ background: `radial-gradient(circle, ${GOLD_SOFT}44, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 -left-[10%] w-[45vw] h-[45vw] rounded-full blur-[150px] opacity-15"
          style={{ background: `radial-gradient(circle, ${NAVY_SOFT}33, transparent 70%)` }}
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
            className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight px-2"
            style={{ color: NAVY }}
          >
            Let&apos;s{" "}
            <span className="font-bold" style={{ color: BLUE }}>
              talk.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed px-4"
          >
            Whether you&apos;re ready to get started or just have questions,
            our team is here to help.
          </motion.p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">

          {/* LEFT: Info Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-5 space-y-4 md:space-y-5"
          >
            {/* Contact cards */}
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                custom={i}
                className="flex items-center gap-4 md:gap-5 p-5 md:p-6 rounded-2xl md:rounded-3xl border-0 md:border shadow-sm transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: "#ffffff", borderColor: `${NAVY}10` }}
              >
                <div
                  className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${NAVY}08`, color: NAVY }}
                >
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-0.5 md:mb-1"
                    style={{ color: GOLD }}
                  >
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-sm md:text-base font-semibold hover:underline transition-colors block truncate"
                      style={{ color: NAVY }}
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-sm md:text-base font-semibold block truncate" style={{ color: NAVY }}>
                      {card.value}
                    </p>
                  )}
                  <p className="text-xs md:text-sm mt-0.5" style={{ color: NAVY_SOFT }}>
                    {card.sub}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* "What to expect" box */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="rounded-2xl md:rounded-3xl p-6 md:p-7 border-0 md:border"
              style={{ backgroundColor: NAVY, borderColor: `${GOLD}30` }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: GOLD_SOFT }}
              >
                What to Expect
              </p>
              {[
                "A response within 1 business day",
                "A free consultation call with our team",
                "Transparent pricing — no hidden fees",
                "A tailored credentialing plan for your practice",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 mb-3.5 last:mb-0">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${GOLD}25`, color: GOLD_SOFT }}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#D4C8B8" }}>
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div
              className="rounded-2xl md:rounded-3xl border-0 md:border shadow-sm overflow-hidden"
              style={{ backgroundColor: "#ffffff", borderColor: `${NAVY}10` }}
            >
              {/* Card header */}
              <div
                className="px-6 md:px-8 py-5 md:py-6 border-b"
                style={{ borderColor: `${NAVY}08` }}
              >
                <h2
                  className="text-lg md:text-xl font-semibold"
                  style={{ color: NAVY }}
                >
                  Get in Touch
                </h2>
                <p className="text-xs md:text-sm mt-0.5" style={{ color: NAVY_SOFT }}>
                  Fields marked with{" "}
                  <span className="text-red-500 font-bold">*</span> are required.
                </p>
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
                    className="p-8 space-y-6"
                    noValidate
                  >
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <ContactField
                        id="name"
                        label="Full Name"
                        required
                        error={errors.name}
                        focused={focusedField === "name"}
                      >
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Dr. Jane Smith"
                          className="w-full bg-transparent outline-none text-sm"
                          style={{ color: NAVY }}
                        />
                      </ContactField>

                      <ContactField
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
                      </ContactField>
                    </div>

                    {/* Phone + Interest */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <ContactField
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
                      </ContactField>

                      <ContactField
                        id="interest"
                        label="I'm interested in"
                        focused={focusedField === "interest"}
                      >
                        <select
                          id="interest"
                          name="interest"
                          value={form.interest}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("interest")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent outline-none text-sm appearance-none cursor-pointer"
                          style={{ color: form.interest ? NAVY : "#9ca3af" }}
                        >
                          <option value="" disabled>Select a service…</option>
                          <option value="Provider Credentialing" style={{ color: NAVY }}>Provider Credentialing</option>
                          <option value="Provider Enrollment" style={{ color: NAVY }}>Provider Enrollment</option>
                          <option value="CAQH Management" style={{ color: NAVY }}>CAQH Management</option>
                          <option value="NPI Management" style={{ color: NAVY }}>NPI Management</option>
                          <option value="ERA / EFT Setup" style={{ color: NAVY }}>ERA / EFT Setup</option>
                          <option value="Full-Service Package" style={{ color: NAVY }}>Full-Service Package</option>
                          <option value="Other" style={{ color: NAVY }}>Other</option>
                        </select>
                      </ContactField>
                    </div>

                    {/* Message */}
                    <ContactField
                      id="message"
                      label="Your Message"
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
                        placeholder="Tell us about your practice and how we can help…"
                        className="w-full bg-transparent outline-none text-sm resize-none"
                        style={{ color: NAVY }}
                      />
                    </ContactField>

                    {/* Submit row */}
                    {submitError && (
                      <div className="text-sm text-red-500 font-medium px-1">
                        {submitError}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 gap-4 flex-wrap">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: NAVY_SOFT }}
                      >
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
                        className="inline-flex items-center gap-2.5 font-semibold px-6 py-3 rounded-full text-white text-sm w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: BLUE }}
                      >
                        {loading ? "Sending..." : "Send Message"}
                        {!loading && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  /* ── SUCCESS ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: customEase }}
                    className="p-12 flex flex-col items-center justify-center text-center min-h-[440px] gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${BLUE}15`, color: BLUE }}
                    >
                      <HiOutlineCheckCircle className="text-5xl" />
                    </motion.div>

                    <div>
                      <h3
                        className="text-2xl sm:text-3xl font-light"
                        style={{ color: NAVY }}
                      >
                        Message Sent!
                      </h3>
                      <p className="mt-3 text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
                        Thanks,{" "}
                        <span className="font-semibold" style={{ color: NAVY }}>
                          {form.name || "there"}
                        </span>
                        . We&apos;ll reach out to{" "}
                        <span className="font-semibold" style={{ color: BLUE }}>
                          {form.email}
                        </span>{" "}
                        within one business day.
                      </p>
                    </div>

                    {/* What happens next */}
                    <div
                      className="w-full max-w-sm rounded-2xl border p-5 text-left space-y-3"
                      style={{ borderColor: `${NAVY}10`, backgroundColor: `${NAVY}03` }}
                    >
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
                        What happens next?
                      </p>
                      {[
                        "Our team reviews your enquiry",
                        "We schedule a free consultation call",
                        "You receive a tailored credentialing plan",
                      ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${BLUE}12`, color: BLUE }}
                          >
                            {i + 1}
                          </div>
                          <p className="text-sm" style={{ color: NAVY_SOFT }}>{step}</p>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", phone: "", interest: "", message: "" });
                        setErrors({});
                      }}
                      className="text-sm font-medium underline"
                      style={{ color: NAVY_SOFT }}
                    >
                      Send another message
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

/* ── Reusable field wrapper ── */
function ContactField({ id, label, required, error, focused, isTextArea, children }) {
  const navy = "#0F1F3D";
  const navySoft = "#3B4B6B";
  const blue = "#1C29C9";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold uppercase tracking-widest mb-2"
        style={{ color: navy }}
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500 normal-case tracking-normal font-sans">*</span>
        )}
      </label>
      <div
        className={`relative flex ${isTextArea ? "items-start" : "items-center"} px-4 py-3.5 rounded-2xl border transition-all duration-200`}
        style={{
          borderColor: error ? "#ef4444" : focused ? blue : `${navy}15`,
          backgroundColor: error ? "#fef2f2" : focused ? `${blue}04` : `${navy}03`,
          boxShadow: focused
            ? `0 0 0 3px ${blue}15`
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
