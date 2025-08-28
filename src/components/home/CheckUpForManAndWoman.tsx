"use client";

import Image from "next/image";

const healthCheckups = {
  men: [
    {
      title: "Starter Wellness",
      age: "Under 30 yrs",
      img: "/images/men1.png",
      bg: "from-orange-500 to-red-400",
    },
    {
      title: "Active Life Check",
      age: "30–45 yrs",
      img: "/images/men2.png",
      bg: "from-pink-500 to-purple-500",
    },
    {
      title: "Advanced Risk Screen",
      age: "45–60 yrs",
      img: "/images/men3.png",
      bg: "from-cyan-400 to-green-300",
    },
  ],
  women: [
    {
      title: "Energy & Immunity",
      age: "Under 30 yrs",
      img: "/images/women1.png",
      bg: "from-lime-400 to-green-300",
    },
    {
      title: "Hormone & Metabolic Balance",
      age: "30–45 yrs",
      img: "/images/women2.png",
      bg: "from-purple-400 to-pink-400",
    },
    {
      title: "Midlife Health Check",
      age: "45–60 yrs",
      img: "/images/women3.png",
      bg: "from-yellow-400 to-orange-300",
    },
  ],
};

export default function HealthCheckups() {
  return (
    <section className="px-6 py-12 bg-white">
      {/* Top heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">
          <span className="text-red-500">3-Level Quality Control</span>{" "}
          <span className="text-indigo-900">on Every Batch.</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Men Section */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-900 mb-6">
            Routine health checkups for men
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {healthCheckups.men.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`rounded-2xl p-1 bg-gradient-to-r ${card.bg} w-28 h-28 flex items-center justify-center`}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={112}
                    height={112}
                    className="rounded-2xl object-cover"
                  />
                </div>
                <p className="mt-3 font-semibold text-indigo-900">
                  {card.title}
                </p>
                <span className="text-sm mt-1 px-3 py-1 rounded-full border border-indigo-300 text-indigo-700">
                  {card.age}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Women Section */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-900 mb-6">
            Routine health checkups for women
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {healthCheckups.women.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`rounded-2xl p-1 bg-gradient-to-r ${card.bg} w-28 h-28 flex items-center justify-center`}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={112}
                    height={112}
                    className="rounded-2xl object-cover"
                  />
                </div>
                <p className="mt-3 font-semibold text-indigo-900">
                  {card.title}
                </p>
                <span className="text-sm mt-1 px-3 py-1 rounded-full border border-indigo-300 text-indigo-700">
                  {card.age}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
