"use client";

import { CheckCircle, Clock, Hand, Phone } from "lucide-react"; // icons

const features = [
  {
    title: "Quality",
    desc: "Follows stringent multi-level QC and EQA programs.",
    icon: <CheckCircle className="w-10 h-10 text-white" />,
    bg: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    title: "On-Time Services",
    desc: "Reliable sample collection & report TAT—same-day on select tests.",
    icon: <Clock className="w-10 h-10 text-white" />,
    bg: "bg-gradient-to-br from-blue-500 to-cyan-400",
  },
  {
    title: "Convenience",
    desc: "Home collection or visit our centres—whichever suits you.",
    icon: <Hand className="w-10 h-10 text-white" />,
    bg: "bg-gradient-to-br from-green-500 to-blue-500",
  },
  {
    title: "Expert Assistance",
    desc: "On-demand result explanation and doctor-on-call (on request).",
    icon: <Phone className="w-10 h-10 text-white" />,
    bg: "bg-gradient-to-br from-red-500 to-purple-500",
  },
];

const  WhyBookTests =() => {
  return (
    <section className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Why book tests with us?</h2>
        <p className="text-gray-200 mt-4">
          EA Labs delivers clinician-ready reports with consistent turnaround times—without compromising on quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, i) => (
          <div
            key={i}
            className={`${item.bg} p-6 rounded-2xl text-left shadow-lg hover:scale-105 transition-transform cursor-pointer`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-100 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


export default WhyBookTests;