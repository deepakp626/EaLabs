// components/TrustedSection.tsx
"use client";

import Heading from "../../components/Heading";

const  TrustedSection = () => {
  const stats = [
    { number: "7,00,000+", label: "Customers Served", gradient: "from-indigo-50 to-indigo-100" },
    { number: "16,000+", label: "Tests Processed Every Day", gradient: "from-orange-50 to-orange-100" },
    { number: "15+", label: "Cities Covered", gradient: "from-pink-50 to-pink-100" },
    { number: "98.5%+", label: "On-time Report Delivery", gradient: "from-green-50 to-green-100" },
  ];

  return (
    <section className=" bg-[#392B7C] py-16 px-6 mb-0 ">
      <div className="max-w-7xl mx-auto">

      {/* Heading */}
      <Heading title=" EA Labs — Trusted by Families" align="left" textColor="text-white" subtitle="Our single goal: fast, accurate, affordable diagnostics for every patient."/>

      {/* Stats Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl ">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md bg-gradient-to-r ${item.gradient} p-6`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)]">{item.number}</h3>
            <p className="text-gray-700 mt-2">{item.label}</p>
          </div>
        ))}
      </div>
        </div>
    </section>
  );
}

export default TrustedSection;