"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Help", href: "/help" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
            ? "max-w-full px-0 pt-0"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6"
          }`}
      >
        <nav
          aria-label="Main Navigation"
          className={`relative mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
              ? "rounded-none border-b border-slate-200/80 bg-white/90 py-4 px-6 sm:px-12 lg:px-16 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
              : "rounded-2xl border border-slate-200/60 bg-white/80 py-5 px-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] backdrop-blur-xl"
            }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="group relative flex items-center outline-none ring-offset-2 ring-blue-600 focus-visible:ring-2 rounded-lg"
          >
            <Image
              src="/images/briqmed_logo.jpg"
              alt="BRIQMED Logo"
              width={280}
              height={80}
              priority
              className="h-14 sm:h-16 w-auto object-contain transition-all duration-500 ease-out group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-200/60 bg-slate-100/60 p-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-6 py-2.5 text-[15px] font-medium tracking-wide transition-all duration-300 rounded-full outline-none ring-offset-1 ring-blue-600 focus-visible:ring-2 ${isActive
                      ? "text-slate-950 font-semibold bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/80"
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Call CTA Button with Ringing Effect */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+16463416783"
              aria-label="Call BRIQMED support at +1 646 341 6783"
              className="group relative inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-slate-900/5 px-6 py-3 text-slate-800 transition-all duration-300 ease-out hover:border-blue-600/30 hover:bg-blue-600 hover:text-white hover:shadow-[0_8px_24px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] outline-none ring-offset-2 ring-blue-600 focus-visible:ring-2"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ease-out group-hover:scale-105 group-hover:bg-blue-500/30">
                {/* Ringing Pulse Effect */}
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400/40 opacity-75 group-hover:bg-white/40" />
                <Phone
                  size={16}
                  strokeWidth={2.2}
                  className="relative z-10 text-blue-600 transition-colors duration-300 group-hover:text-white animate-[bounce_1.5s_infinite]"
                />
              </span>
              <span className="pr-1 text-[15px] font-semibold tracking-tight">
                +1 646 341 6783
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex lg:hidden items-center justify-center h-12 w-12 rounded-full border border-slate-200/80 bg-slate-50/80 text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 active:scale-95 outline-none ring-offset-2 ring-blue-600 focus-visible:ring-2"
          >
            {isMenuOpen ? (
              <X size={22} strokeWidth={2.2} className="transition-transform duration-300 rotate-90" />
            ) : (
              <Menu size={22} strokeWidth={2.2} className="transition-transform duration-300" />
            )}
          </button>
        </nav>

        {/* Floating Mobile Navigation Drawer */}
        <div
          className={`fixed top-0 right-0 h-screen w-[280px] bg-white border-l border-slate-200/80 shadow-[[-20px_0_50px_rgba(0,0,0,0.08)]] p-6 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-serif font-bold text-slate-800 text-lg">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={20} className="text-slate-600" />
                </button>
              </div>

              <div className="flex flex-col space-y-1.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${isActive
                          ? "bg-slate-100 text-slate-950 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pb-8">
              <a
                href="tel:+16463416783"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-center gap-3 rounded-2xl py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: "#0F1F3D" }}
              >
                <Phone size={18} strokeWidth={2.2} className="animate-bounce text-[#C9A227]" />
                <span>+1 646 341 6783</span>
              </a>
            </div>
          </div>
        </div>

        {/* Overlay when menu is open */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

      </div>
    </header>
  );
}