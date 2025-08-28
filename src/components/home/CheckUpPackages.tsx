// components/TestTabs.tsx
"use client";
import { useState } from "react";
import Heading from "../Heading";

const categories = [
  { id: "heart", label: "Heart", icon: "❤️" },
  { id: "liver", label: "Liver", icon: "🫀" },
  { id: "vitamins", label: "Vitamins", icon: "💊" },
  { id: "diabetes", label: "Diabetes", icon: "🧪" },
  { id: "thyroid", label: "Thyroid", icon: "🦋" },
  { id: "allergy", label: "Allergy", icon: "🤧" },
];

const testData = {
  thyroid: [
    {
      title: "Thyroid Basic (TSH)",
      desc: "Quick check of thyroid-stimulating hormone for dose follow-up.",
      includes: "TSH",
      for: "Routine monitoring, Dosage adjustment",
      reports: "18 hours",
      price: "599/-",
    },
    {
      title: "Thyroid Profile (T3, T4, TSH)",
      desc: "Complete thyroid evaluation to check for hypo/hyperthyroidism.",
      includes: "T3, T4, TSH",
      for: "Thyroid disorders, Routine health check",
      reports: "24 hours",
      price: "999/-",
    },
    {
      title: "Advanced Thyroid Panel",
      desc: "Comprehensive thyroid test including antibodies for autoimmunity.",
      includes: "T3, T4, TSH, Anti-TPO, Anti-TG",
      for: "Thyroid disease diagnosis, Autoimmune conditions",
      reports: "36 hours",
      price: "1999/-",
    },
  ],

  heart: [
    {
      title: "Lipid Profile",
      desc: "Measures cholesterol and triglycerides for heart health.",
      includes: "Total Cholesterol, HDL, LDL, Triglycerides",
      for: "Cardiac risk assessment",
      reports: "18 hours",
      price: "799/-",
    },
    {
      title: "Cardiac Risk Markers",
      desc: "Advanced heart risk check including hs-CRP and Lipoprotein(a).",
      includes: "hs-CRP, Homocysteine, Apolipoprotein A1, B",
      for: "Heart disease risk monitoring",
      reports: "36 hours",
      price: "2499/-",
    },
  ],

  liver: [
    {
      title: "Liver Function Test (LFT)",
      desc: "Basic screening of liver enzymes and proteins.",
      includes: "SGPT, SGOT, ALP, Bilirubin, Albumin",
      for: "Liver health, Jaundice, Alcohol/liver disorder check",
      reports: "24 hours",
      price: "699/-",
    },
    {
      title: "Comprehensive Liver Panel",
      desc: "Detailed liver health check for chronic conditions.",
      includes: "LFT, GGT, LDH, Prothrombin Time",
      for: "Chronic liver disease, Fatty liver",
      reports: "36 hours",
      price: "1499/-",
    },
  ],

  vitamins: [
    {
      title: "Vitamin D Test",
      desc: "Checks vitamin D levels for bone and immune health.",
      includes: "25-OH Vitamin D",
      for: "Bone weakness, Fatigue, Vitamin deficiency",
      reports: "24 hours",
      price: "899/-",
    },
    {
      title: "Vitamin B12 Test",
      desc: "Measures vitamin B12 levels crucial for nerve health.",
      includes: "Vitamin B12",
      for: "Weakness, Memory loss, Anemia",
      reports: "18 hours",
      price: "699/-",
    },
    {
      title: "Vitamin Screening Package",
      desc: "Covers multiple vitamin deficiencies in one go.",
      includes: "Vitamin A, B12, D, E, K",
      for: "General wellness, Nutritional deficiency",
      reports: "36 hours",
      price: "2499/-",
    },
  ],

  diabetes: [
    {
      title: "Blood Sugar (Fasting & PP)",
      desc: "Basic blood glucose measurement for diabetes check.",
      includes: "Fasting Blood Sugar, Postprandial Sugar",
      for: "Diabetes screening, Routine monitoring",
      reports: "6 hours",
      price: "299/-",
    },
    {
      title: "HbA1c Test",
      desc: "3-month average blood sugar monitoring.",
      includes: "HbA1c (Glycated Hemoglobin)",
      for: "Diabetes control check",
      reports: "12 hours",
      price: "499/-",
    },
    {
      title: "Diabetes Package",
      desc: "Complete diabetes evaluation with sugar and kidney markers.",
      includes: "FBS, PPBS, HbA1c, Urine Microalbumin",
      for: "Diabetes management and complication screening",
      reports: "24 hours",
      price: "1299/-",
    },
  ],

  allergy: [
    {
      title: "Food Allergy Panel",
      desc: "Detects allergies to common food items.",
      includes: "Milk, Egg, Wheat, Soy, Peanut, Seafood",
      for: "Food allergy symptoms, Digestive issues",
      reports: "3 days",
      price: "3999/-",
    },
    {
      title: "Respiratory Allergy Panel",
      desc: "Checks allergies from dust, pollen, mites, and mold.",
      includes: "Dust Mites, Pollen, Mold, Animal Dander",
      for: "Asthma, Seasonal allergy",
      reports: "3 days",
      price: "3499/-",
    },
    {
      title: "Comprehensive Allergy Package",
      desc: "Covers 50+ allergens including food & environment.",
      includes: "Food + Respiratory allergens",
      for: "Chronic allergy sufferers",
      reports: "5 days",
      price: "6999/-",
    },
  ],
};


export default function TestTabs() {
  const [activeTab, setActiveTab] = useState("thyroid");

    //   useEffect(() => {
    //     const fetchCheckupPackages = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axiosInstance.get('/admin/checkup-packages');
    //             setCategories(response.data.categories || []);
    //             setCards(response.data.cards || []);
    //             setLoading(false);
    //         } catch (err) {
    //             setError('Failed to fetch checkup packages');
    //             setLoading(false);
    //             console.error('Error fetching checkup packages:', err);
    //         }
    //     };

    //     fetchCheckupPackages();
    // }, []);

  return (
    <section className=" bg-[rgb(247,245,255)]">

    <div className="max-w-7xl mx-auto p-12 my-22">
      <Heading title="Checkup Packages" align="left" />  
      {/* Tabs */}
      <div className="flex flex-wrap justify-start gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              activeTab === cat.id
                ? "bg-red-500 text-white border-red-500"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {testData[activeTab]?.map((test, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-red-600 font-bold text-lg">
                {test.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">{test.desc}</p>

              <div className="border-t my-3"></div>

              <div className="flex gap-4 text-sm">
                <div>
                  <p className="font-semibold text-blue-600">Includes:</p>
                  <p>{test.includes}</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-600">For</p>
                  <p>{test.for}</p>
                </div>
              </div>

              <p className="text-gray-700 mt-3">
                Reports in <span className="font-bold text-blue-600">{test.reports}</span>
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-red-600 text-lg">{test.price}</span>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Book a test →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
