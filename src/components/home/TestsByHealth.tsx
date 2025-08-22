"use client"
import React from 'react';
import Heading from '../Heading';
import Image from "next/image";
import Link from 'next/link';





// Component for a single card
const Card = ({ imageUrl, label }) => {
  return (
    <Link href={`/tests/${label.toLowerCase()}`} className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-100 rounded-lg transition duration-300">
      {/* Container for the circular icon with a gradient background */}
      <div className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-inner">
        {/* The icon itself, rendered as an Image */}
        <Image
          src={imageUrl}
          alt={label}
          width={64}
          height={64}
          className="w-16 h-16 sm:w-20 sm:h-20"
        />
      </div>
      {/* The label for the card */}
      <p className="mt-4 text-center text-sm sm:text-base font-semibold text-gray-700">
        {label}
      </p>
    </Link>
  );
};

const HealthPackages = () => {
  const cards = [
    {
      title: "Senior citizen health checkup",
      subtitle: "BOOK NOW",
      priceLabel: "Start from",
      price: "$299.00",
      img: "/senior.png", // replace with real images
      bg: "bg-yellow-200",
    },
    {
      title: "Diabetes Screening",
      subtitle: "BOOK NOW",
      priceLabel: "Flat",
      price: "$99.00",
      img: "/diabetes.png",
      bg: "bg-teal-200",
    },
    {
      title: "Women's Staying Strong Health Checkup",
      subtitle: "BOOK NOW",
      priceLabel: "10%",
      price: "Discount",
      img: "/women.png",
      bg: "bg-amber-200",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <Link key={idx} href={`/packages/${card.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className={`${card.bg} rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden hover:shadow-xl transition duration-300 h-[300px]`}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-semibold text-xl md:text-2xl mb-1">
                    {card.title}
                  </h3>
                  <p className="mb-4 font-medium text-sm">
                    {card.subtitle} <span className="ml-1">→</span>
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-medium">
                      {card.priceLabel} <br />
                      <span className="font-bold text-2xl">{card.price}</span>
                    </p>
                  </div>
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Main App component to display the cards
const TestsByHealth = () => {
  // Define the card data with labels
  const cardsData = [
    { label: 'Liver', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
    { label: 'Blood', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
    { label: 'Backpain', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
    { label: 'Kidneys', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
    { label: 'Orthopaedics', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
    { label: 'Senior Citizen', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
     { label: 'Senior Citizen', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
      { label: 'Senior Citizen', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
       { label: 'Senior Citizen', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
        { label: 'Senior Citizen', imageUrl: "https://static.thenounproject.com/png/2292434-200.png" },
  ];

  return (
    <div className="max-w-7xl  mx-3 md:mx-auto">
      <div className="mx-auto">
        <Heading title="Find Tests by Health concern" align='center' />
        <div className="flex flex-row gap-6 justify-items-center overflow-auto">
          {cardsData.map((card, index) => (
            <Card key={index} imageUrl={card.imageUrl} label={card.label} />
          ))}
        </div>
      </div>

      {HealthPackages()}
    </div>
  );
};

export default TestsByHealth;
