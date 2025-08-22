"use client";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const faqs = [
  {
    question: "How do I start online consultation with doctors on Medicare?",
    answer: "You can easily start by signing up, choosing a doctor and a time slot.",
  },
  {
    question: "Are your online doctors qualified?",
    answer: "Yes! All of our doctors are verified and registered medical practitioners.",
  },
  {
    question: "Is online doctor consultation safe and secured on Medicare?",
    answer: "Absolutely. All consultations are encrypted and completely secure.",
  },
  {
    question: "What happens if I don't get a response from a doctor?",
    answer:
      "You can reschedule or request another doctor if you don’t get a response in time.",
  },
  {
    question: "What is the online doctor consultations?",
    answer:
      "Online doctor consultation is a convenient way to get medical advice from licensed doctors using your smartphone or computer.",
  },
  {
    question: "Can I do a free online doctor consultation on Medicare?",
    answer: "Yes, we also provide free consultation offers from time to time.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="max-w-7xl mx-3 md:mx-auto py-16">
      <h2 className="text-4xl font-bold text-center mb-10 text-neutral-black">
        Got questions?
      </h2>

      <div className="space-y-4 ">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl border border-transparent transition-all ${
              openIndex === index
                ? "bg-[#C0EBEA]" // active background
                : "bg-[#F1F6FF]" // default background
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <span className="font-medium text-lg text-neutral-black">
                {item.question}
              </span>
              <HiChevronDown
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-6 pb-6 -mt-2 text-neutral-gray">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
