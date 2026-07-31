import Image from "next/image";
import Link from "next/link";
import { 
  FaLinkedinIn, 
  FaFacebookF, 
  FaXTwitter 
} from "react-icons/fa6";
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineArrowRight
} from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-[#5B0222] text-white overflow-hidden">
      
      {/* CHAPTER 1: The Final Reassurance & Primary CTA */}
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

      {/* CHAPTER 2: The Quiet, Trustworthy Closing Section (Company & Navigation Info) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-3 rounded-xl inline-block shadow-sm">
              <Image
                src="/briqmed_logo.jpg"
                alt="BriqMed"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white text-base font-light leading-relaxed max-w-sm">
              Next-generation healthcare credentialing and administrative infrastructure designed for modern medical groups and health systems.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#D9FF3F] hover:text-[#5B0222] transition-all duration-200"
              >
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#D9FF3F] hover:text-[#5B0222] transition-all duration-200"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#D9FF3F] hover:text-[#5B0222] transition-all duration-200"
              >
                <FaXTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:pl-8 space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#D9FF3F]">
              Navigation
            </h3>
            <ul className="space-y-3 text-base font-medium">
              <li>
                <Link href="/" className="text-white hover:text-[#D9FF3F] transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#D9FF3F] transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-[#D9FF3F] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-[#D9FF3F] transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#D9FF3F]">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <a 
                  href="mailto:info@briqmed.com" 
                  className="group inline-flex items-center gap-3 text-white hover:text-[#D9FF3F] transition-colors duration-200"
                >
                  <span className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                    <HiOutlineMail className="text-[#D9FF3F] text-lg" />
                  </span>
                  <span className="font-medium">info@briqmed.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+16463416783" 
                  className="group inline-flex items-center gap-3 text-white hover:text-[#D9FF3F] transition-colors duration-200"
                >
                  <span className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                    <HiOutlinePhone className="text-[#D9FF3F] text-lg" />
                  </span>
                  <span className="font-medium">+1 646 341 6783</span>
                </a>
              </li>
              <li>
                <div className="group inline-flex items-center gap-3 text-white">
                  <span className="p-2 rounded-lg bg-white/10">
                    <HiOutlineLocationMarker className="text-[#D9FF3F] text-lg" />
                  </span>
                  <span className="font-medium">New York, NY</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* CHAPTER 3: Legal & Closing Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center space-y-3 text-sm text-white font-medium">
          <p>© 2026 BriqMed Healthcare Solutions. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#D9FF3F] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#D9FF3F] transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <span className="text-[#D9FF3F]/80">Made with care</span>
          </div>
        </div>

      </div>
    </footer>
  );
}