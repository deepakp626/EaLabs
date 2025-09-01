"use client";

import Image from "next/image";
import Heading from "./Heading";

const  OurNetworks = () => {
  return (
    <section
      className="relative bg-[#f7f2ff] py-16 px-6"
      style={{
        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/3/38/India_location_map.svg')",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "45%",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">

          <Heading title="Our Networks" align="left" subtitle="Our single goal: fast, accurate, affordable diagnostics for every patient." />

          {/* Card */}
          <div className="bg-white p-6 border border-purple-200 shadow-sm rounded-3xl">
            <h3 className="text-lg font-bold text-purple-900 mb-4">Ahmedabad</h3>

            <div className="space-y-8 text-sm text-gray-700">
              <p>
                <span className="text-red-500">📍</span> 108, Westface, Hebatpur Rd,
                near Baghban Party Plot, Thaltej, Ahmedabad, Gujarat 380059
              </p>
              <p>
                <span className="text-red-500">📞</span>{" "}
                <a href="tel:+919909045241" className="text-purple-600 hover:underline">
                  9099045241
                </a>
              </p>
              <p>
                <span className="text-red-500">✉️</span>{" "}
                <a href="mailto:endoallergy@yahoo.com" className="text-purple-600 hover:underline">
                  endoallergy@yahoo.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Map (Optional extra pins over map) */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center relative">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/38/India_location_map.svg"
            alt="India Map"
            width={500}
            height={500}
            className="opacity-80"
          />
          {/* Example Pins */}
          <span className="absolute top-[35%] left-[25%] text-red-600 text-2xl">📍</span>
          <span className="absolute top-[45%] left-[30%] text-red-600 text-2xl">📍</span>
          <span className="absolute top-[55%] left-[50%] text-red-600 text-2xl">📍</span>
        </div>
      </div>
    </section>
  );
}

export default OurNetworks;
