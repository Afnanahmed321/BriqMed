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
  HiOutlineLocationMarker
} from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-[#5B0222] text-white overflow-hidden">

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
          </div>
        </div>

      </div>
    </footer>
  );
}