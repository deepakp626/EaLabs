"use client";
import React from "react";
import Heading from "./Heading";

const options = [
  {
    title: "100% Safe & Hygienic",
    desc: "Experience hassle-free healthcare with online doctor consultations",
    bg: "bg-[#A4EA68]/70",
    icon: "🛡️", // Replace with svg/icon as needed
  },
  {
    title: "Home Sample Pick up",
    desc: "Experience hassle-free healthcare with online doctor consultations",
    bg: "bg-[#FACFE9]/70",
    icon: "🧪", // Replace with svg/icon as needed
  },
  {
    title: "View Reports Online",
    desc: "Experience hassle-free healthcare with online doctor consultations",
    bg: "bg-[#FAE061]/70",
    icon: "📄", // Replace with svg/icon as needed
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full py-12  px-4 md:px-12">
      <div className="bg-[#EAF1F3] rounded-[32px] py-12  px-4 md:px-16">
        <Heading title=" Why Choose us" align="center"  />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((item, index) => (
            <div
              key={index}
              className={`${item.bg} rounded-3xl p-8 flex flex-col justify-between min-h-[260px]`}
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="font-semibold text-xl mb-3 text-black">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
