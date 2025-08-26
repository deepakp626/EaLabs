"use client";
import Image from "next/image";
import Heading from "@/components/Heading";

const partners = [
  { name: "GSK", logo: "https://static.thenounproject.com/png/2292434-200.png" },
  { name: "Astrazeneca", logo: "https://static.thenounproject.com/png/2292434-200.png" },
  { name: "Novartis", logo: "https://static.thenounproject.com/png/2292434-200.png" },
  { name: "Johnson & Johnson", logo: "https://static.thenounproject.com/png/2292434-200.png" },
  { name: "Merck", logo: "https://static.thenounproject.com/png/2292434-200.png" },
  { name: "Pfizer", logo: "https://static.thenounproject.com/png/2292434-200.png" },
  { name: "Sanofi", logo: "https://static.thenounproject.com/png/2292434-200.png" },
];

const Partners = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 ">
      {/* Heading */}
      <div className="flex justify-between items-center mb-10">
        <Heading title="Partners" align="left"  />
        <button className="text-sm font-semibold flex items-center gap-1 text-[#182060]">
          SEE ALL <span>→</span>
        </button>
      </div>

      {/* Partners list */}
      <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-12 mb-10">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex justify-center items-center">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-sm font-medium text-[#182060] text-center">
              {partner.name}
            </p>
          </div>
        ))}
      </div>

      {/* Test cards  */}
      {TestCards()}
    </section>
  );
};

 function TestCards() {
  const cardData = [
  {
    label: "Sample Collection",
    title: "Health Test at  your home",
    button: "Book Now",
    image: "https://static.thenounproject.com/png/2292434-200.png",      // add to /public
    bg: "bg-[#B2DFE7]"
  },
  {
    label: "Lab Test",
    title: "Visit a lab near you",
    button: "Appointment now",
    image: "https://static.thenounproject.com/png/2292434-200.png",       // add to /public
    bg: "bg-[#F8E16C]"
  }
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cardData.map((item, i) => (
        <div
          key={i}
          className={`${item.bg} rounded-3xl p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-between bg-no-repeat bg-right-bottom bg-contain`}
          style={{ backgroundImage: `url(${item.image})` }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-black/80 text-white text-sm px-3 py-1 rounded-full mb-4 w-max">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            {item.label}
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-8 max-w-[60%]">
            {item.title}
          </h2>

          {/* Button */}
          <button className="flex items-center gap-2 bg-white text-gray-900 font-medium px-5 py-2 rounded-full w-max">
            {item.button}
            <span className="inline-block">&#8594;</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Partners;
