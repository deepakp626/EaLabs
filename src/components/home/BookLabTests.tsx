"use client";
import { useState } from "react";
import Heading from "../Heading";
import Link from "next/link";

const categories = [
  "All tests",
  "Affordable Packages",
  "Diabetes",
  "Heart",
  "Cancer",
  "Vitamin",
  "Women Health",
  "Skin care",
  "Liver",
  "Kidney",
  "Stress",
];

const tests = [
  {
    name: "Complete Blood Count (CBC)",
    oldPrice: "$260.00",
    price: "$199.00",
    description: "Measures various components of blood, including red and white blood cells, platelets, and hemoglobin."
  },
  {
    name: "Blood Chemistry Panel",
    oldPrice: "120.00",
    price: "$99.00",
    description: "Evaluates kidney and liver function, electrolyte balance, and screens for diabetes and other metabolic conditions."
  },
  {
    name: "Urinalysis",
    oldPrice: "$260.00",
    price: "$199.00",
    description: "Analyzes urine to detect various disorders, including urinary tract infections, kidney disease, and diabetes."
  },
  {
    name: "Electrocardiogram (ECG)",
    oldPrice: "$460.00",
    price: "$399.00",
    description: "Records the electrical activity of the heart to detect abnormalities in heart rhythm and structure."
  },
  {
    name: "Chest X-Ray",
    oldPrice: "$260.00",
    price: "$199.00",
    description: "Produces images of the chest to examine the lungs, heart, and chest wall for abnormalities or diseases."
  },
  {
    name: "Magnetic Resonance Imaging (MRI)",
    oldPrice: "$260.00",
    price: "$169.00",
    description: "Uses powerful magnets and radio waves to create detailed images of organs and structures within the body."
  },
];

const BookLabTests = () => {
  const [active, setActive] = useState("All tests");

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <Heading title="Book Lab Tests" align="left" />
        <button className="text-sm font-semibold flex items-center gap-1">
          SEE ALL <span>→</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap ${
              active === cat
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Test List */}
      <div className="mt-6 divide-y divide-gray-200 border-t">
        {tests.map((test, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4"
          >
            <div className="w-full sm:w-1/2">
              <p className="font-medium">{test.name}</p>
              <p className="text-sm text-gray-600 mt-1">{test.description} {" "}
                <Link href={`/tests/${test.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
                  Read more
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
              {/* <p className="text-right">
                <span className="line-through text-gray-400 mr-2">
                  {test.oldPrice}
                </span>
                <span className="font-bold text-lg">{test.price}</span>
              </p>
              <button className="px-6 py-2 border border-black rounded-full">
                Add
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookLabTests;
