import Image from "next/image";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#5B0222] text-white py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-12">

          {/* Logo */}
          <div>
            <Image
              src="/briqmed_logo.jpg"
              alt="BriqMed"
              width={170}
              height={70}
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Social */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Follow us on
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-[#5B0222] flex items-center justify-center hover:scale-110 transition"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-[#5B0222] flex items-center justify-center hover:scale-110 transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-[#5B0222] flex items-center justify-center hover:scale-110 transition"
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Connect with us
            </h3>

            <div className="space-y-3 text-[#D9FF3F] font-semibold">

              <p>
                <Link href="/contact">
                  Contact Us
                </Link>
              </p>

              <p>
                <a href="mailto:info@briqmed.com">
                  info@briqmed.com
                </a>
              </p>

              <p>
                <a href="tel:+16463416783">
                  +1 646 341 6783
                </a>
              </p>

            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Helpful Links
            </h3>

            <div className="space-y-3 text-[#D9FF3F] font-semibold">

              <Link href="/privacy-policy">
                Privacy Policy
              </Link>

              <br />

              <Link href="/terms">
                Terms & Conditions
              </Link>

            </div>
          </div>

        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-10">

          <Image
            src="/briqmed_logo.jpg"
            alt="BriqMed"
            width={170}
            height={70}
          />

          <div>
            <h3 className="text-2xl font-bold mb-4">
              Connect with us
            </h3>

            <div className="space-y-2 text-[#D9FF3F] font-semibold">
              <p>Contact Us</p>
              <p>info@briqmed.com</p>
              <p>+1 646 341 6783</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              Helpful Links
            </h3>

            <div className="space-y-2 text-[#D9FF3F] font-semibold">
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              Follow us on
            </h3>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white text-[#5B0222] flex items-center justify-center">
                <FaLinkedinIn />
              </div>

              <div className="w-10 h-10 rounded-full bg-white text-[#5B0222] flex items-center justify-center">
                <FaFacebookF />
              </div>

              <div className="w-10 h-10 rounded-full bg-white text-[#5B0222] flex items-center justify-center">
                <FaXTwitter />
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}

        <div className="mt-14 text-center text-md">
          © 2026 BriqMed Healthcare Solutions. All rights reserved.
        </div>

      </div>
    </footer>
  );
}