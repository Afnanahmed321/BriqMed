const features = [
  {
    number: "01",
    title: "Fast Turnaround Times",
    description: "We move cases forward proactively.",
  },
  {
    number: "02",
    title: "Accurate & Compliant",
    description: "Every application is checked thoroughly.",
  },
  {
    number: "03",
    title: "Transparent Updates",
    description: "Regular status reports.\nNo guessing.",
  },
  {
    number: "04",
    title: "Secure & HIPAA-Friendly",
    description: "All documents safely stored in Microsoft 365.",
  },
  {
    number: "05",
    title: "Credentialing Experts",
    description:
      "Extensive expertise in provider enrollment & credentialing.",
  },
];

function Card({ item }) {
  return (
    <div className="w-full lg:w-[320px]">
      {/* Top Divider */}
      <div className="border-t border-gray-400 mb-6"></div>

      {/* Number */}
      <h3 className="text-[48px] lg:text-[56px] leading-none">
        {item.number}
      </h3>

      {/* Title */}
      <h4 className="mt-4 text-[22px] lg:text-[24px] font-semibold leading-snug lg:min-h-[20px]">
        {item.title}
      </h4>

      {/* Description */}
      <p className="mt-3 text-[18px] lg:text-[20px] leading-7 lg:leading-8 whitespace-pre-line text-[#3b3b3b] lg:min-h-[80px]">
        {item.description}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-center text-3xl lg:text-[44px] font-semibold mb-10 lg:mb-20">
          Why Choose BriqMed?
        </h2>

        {/* Desktop */}
        <div className="hidden lg:block">

          <div className="flex justify-center gap-20">
            <Card item={features[0]} />
            <Card item={features[1]} />
            <Card item={features[2]} />
          </div>

          <div className="flex justify-center gap-20 mt-16">
            <Card item={features[3]} />
            <Card item={features[4]} />
          </div>

        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-8 lg:hidden">
          {features.map((item) => (
            <Card key={item.number} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}