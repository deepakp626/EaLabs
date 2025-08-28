"use client";
import Image from "next/image";
import Heading from "@/components/Heading";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const Partners = () => {
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axiosInstance.get("/admin/partner");
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  // Convert buffer to string (data URL)
  const bufferToDataURL = (buffer: any) => {
    if (!buffer || !buffer.data) return "";
    return String.fromCharCode(...buffer.data); // reconstruct the string
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 ">
      {/* Heading */}
      <div className="flex justify-between items-center mb-10">
        <Heading title="Partners" align="left" />
        <button className="text-sm font-semibold flex items-center gap-1 text-[#182060]">
          SEE ALL <span>→</span>
        </button>
      </div>

      {/* Partners list */}
      <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 mb-10">
        {partners.map((partner) => (
          <div
            key={partner._id}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex justify-center items-center overflow-hidden">
              <Image
                src={bufferToDataURL(partner.partnerImage)}
                alt={partner.partnerTitle}
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-sm font-medium text-[#182060] text-center">
              {partner.partnerTitle}
            </p>
          </div>
        ))}
      </div>

      {/* Test cards */}
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
      image: "https://static.thenounproject.com/png/2292434-200.png",
      bg: "bg-[#B2DFE7]",
    },
    {
      label: "Lab Test",
      title: "Visit a lab near you",
      button: "Appointment now",
      image: "https://static.thenounproject.com/png/2292434-200.png",
      bg: "bg-[#F8E16C]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cardData.map((item, i) => (
        <div
          key={i}
          className={`${item.bg} rounded-3xl p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-between bg-no-repeat bg-right-bottom bg-contain`}
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="inline-flex items-center gap-2 bg-black/80 text-white text-sm px-3 py-1 rounded-full mb-4 w-max">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            {item.label}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-8 max-w-[60%]">
            {item.title}
          </h2>
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
