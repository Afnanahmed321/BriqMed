import Image from "next/image";

const services = [
  {
    title: "Provider Credentialing & Insurance Enrollment",
    image: "/icons/credentialing.png",
  },
  {
    title: "CAQH Profile Creation, Updates & Maintenance",
    image: "/icons/caqh.png",
  },
  {
    title: "NPPES / NPI Registration & Management",
    image: "/icons/npi.png",
  },
  {
    title: "Medicare, Medicaid & Commercial Payer Enrollment",
    image: "/icons/medicare.png",
  },
  {
    title: "Provider Demographic Updates",
    image: "/icons/demographic.png",
  },
  {
    title: "License & Certification Tracking",
    image: "/icons/license.png",
  },
  {
    title: "ERA / EFT Setup",
    image: "/icons/era.png",
  },
  {
    title: "End-to-End Provider Onboarding & Offboarding Support",
    image: "/icons/onboarding.png",
  },
];

export default function Services() {
  return (
    <section className="bg-[#F7FACF] pt-8 pb-8 lg:pt-12 lg:pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-left lg:text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold">
            What we do?
          </h2>

          <p className="mt-5 text-xl lg:text-xl leading-8 max-w-4xl lg:mx-auto">
            At BriqMed Healthcare Solutions, we handle every step of the
            provider credentialing and enrollment process for physicians,
            nurse practitioners, and healthcare practices across the U.S.
          </p>
        </div>

        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-10">
          {/* Left Side */}
          <div className="lg:col-span-4 mb-6 lg:mb-0">
            <h3 className="text-3xl lg:text-4xl leading-tight">
              A single specialist team for every step of credentialing.
            </h3>
          </div>

          {/* ================= Desktop ================= */}
          <div className="hidden lg:grid lg:col-span-8 lg:grid-cols-4 border-t border-b border-gray-400">
            {services.map((service, index) => (
              <div
                key={index}
                className={`
                  p-3
                  ${index !== 3 && index !== 7 ? "border-r border-gray-400" : ""}
                  ${index < 4 ? "border-b border-gray-400" : ""}
                `}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={200}
                  height={200}
                  className="object-contain"
                />

                <p className="text-lg leading-7">
                  {service.title}
                </p>
              </div>
            ))}
          </div>

          {/* ================= Mobile ================= */}
          <div className="lg:hidden">
            {services.map((service, index) => (
              <div
                key={index}
                className={`py-5 ${
                  index !== services.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="h-20 flex items-center justify-start">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={126}
                    height={126}
                    className="object-contain"
                  />
                </div>

                <p className="text-xl leading-7">
                  {service.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}