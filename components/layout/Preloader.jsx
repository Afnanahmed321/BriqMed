"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage so it only runs on initial page load / refresh
    const hasLoaded = sessionStorage.getItem("briqmed_has_loaded");

    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    sessionStorage.setItem("briqmed_has_loaded", "true");

    // Total sequence timer (~1300ms + crossfade duration)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
          style={{ willChange: "opacity" }}
        >
          <div className="relative flex items-center justify-center">
            {/* Logo Animation Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative overflow-hidden"
            >
              <Image
                src="/briqmed_logo.jpg"
                alt="BriqMed"
                width={180}
                height={75}
                priority
                className="h-16 w-auto object-contain"
              />

              {/* Soft Metallic Light Sweep (700ms - 1000ms) */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 0.5,
                  delay: 0.7,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent skew-x-12 pointer-events-none"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}