import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function HomeCTA() {
  return (
    <div className="bg-[#5B0222] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <span className="text-sm uppercase tracking-widest text-[#D9FF3F] font-semibold">
            The Final Step
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Ready to simplify <br />
            <span className="text-[#D9FF3F]">provider credentialing?</span>
          </h2>

          <p className="text-lg sm:text-xl text-white font-light max-w-2xl mx-auto leading-relaxed">
            We handle every step with absolute precision so your organization can focus entirely on delivering exceptional patient care.
          </p>

          <div className="pt-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-[#D9FF3F] text-[#5B0222] font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-0.5"
            >
              <span>Contact Us</span>
              <HiOutlineArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
