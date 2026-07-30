import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif leading-tight text-[#2B2B2B]">
              Credentializing,
              <br />
              Simplified.
            </h1>

            <p className="mt-8 text-xl leading-8 text-gray-600 max-w-xl">
              BriqMed helps healthcare providers across the United States
              streamline{" "}
              <span className="font-semibold text-gray-900">
                provider credentialing,
              </span>{" "}
              <span className="font-semibold text-gray-900">
                provider enrollment,
              </span>{" "}
              <span className="font-semibold text-gray-900">
                CAQH management,
              </span>{" "}
              and{" "}
              <span className="font-semibold text-gray-900">
                insurance credentialing,
              </span>{" "}
              so you can focus on patient care.
            </p>

            <button className="mt-10 bg-[#1C29C9] hover:bg-[#1620a6] text-white font-semibold px-8 py-4 rounded-full transition duration-300">
              Discover More
            </button>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <Image
              src="/hero_image.png"
              alt="Healthcare Credentialing"
              width={700}
              height={550}
              priority
              className="w-full max-w-2xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}