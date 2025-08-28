"use client"
import { useState, useEffect } from "react";
import Heading from "../Heading";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

interface ITab {
  _id: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ITabCard {
  _id: string;
  title: string;
  description: string;
  url: string;
  tabId: ITab; // Populated Tab object
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const BookLabTests = () => {
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [tabcards, setTabcards] = useState<ITabCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All tests");

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        const response = await axiosInstance.get("/admin/BookLabTests");
        setTabs([{ _id: "all", category: "All tests", createdAt: "", updatedAt: "", __v: 0 }, ...response.data.tabs]);
        setTabcards(response.data.tabcards);
      } catch (err: any) {
        setError(err.message || "Failed to fetch lab tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchLabTests();
  }, []);

  const filteredTabcards = activeCategory === "All tests"
    ? tabcards
    : tabcards.filter(card => card.tabId.category === activeCategory);

  if (loading) {
    return <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">Loading lab tests...</section>;
  }

  if (error) {
    return <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-red-500">Error: {error}</section>;
  }

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
        {tabs.map((tab) => (
          <button
            key={tab._id}
            onClick={() => setActiveCategory(tab.category)}
            className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap ${
              activeCategory === tab.category
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {tab.category}
          </button>
        ))}
      </div>

      {/* Test List */}
      <div className="mt-6 divide-y divide-gray-200 border-t">
        {filteredTabcards.length > 0 ? (
          filteredTabcards.map((tabcard) => (
            <div
              key={tabcard._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4"
            >
              <div className="w-full sm:w-1/2">
                <p className="font-medium">{tabcard.title}</p>
                <p className="text-sm text-gray-600 mt-1">{tabcard.description} {" "}
                  {tabcard.url && (
                    <Link href={tabcard.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      Read more
                    </Link>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                {/* Add price/add button if needed */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">No lab tests found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default BookLabTests;