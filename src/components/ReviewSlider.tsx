"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Heading from "./Heading";

const reviews = [
  {
    name: "Esther Howard",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "I had a great experience at this healthcare clinic. I was seen quickly, and the doctor was able to diagnose and treat my condition.",
  },
  {
    name: "Darlene Robertson",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "The service was excellent and the blood test collection was very smooth.",
  },
  {
    name: "Ronald Richards",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/men/92.jpg",
    text: "Very convenient and accurate diagnosis. Would highly recommend to others!",
  },
];

const ReviewSlider = () => {
  return (
    <div className="max-w-7xl mx-auto py-16">
      <Heading title="Our doctors and clinics have earned over 5,000+ reviews on Google!" align="center" />

      {/* Rating Stars */}
      <div className="flex justify-center items-center gap-1 mb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <FaStar key={i} className="text-green-500 text-xl" />
        ))}
        <FaStarHalfAlt className="text-green-500 text-xl" />
      </div>

      <p className="text-center text-neutral-gray mb-10">
        Average Google Rating is 4.6
      </p>

      {/* Slider */}
      <div className="max-w-6xl mx-auto">
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-3xl border border-gray-200 px-10 py-8 cursor-default">
                <div className="flex gap-6 items-start">
                  <div className="flex flex-col items-center gap-1">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div className="text-sm font-semibold text-neutral-black">
                      {review.name}
                    </div>
                    <div className="text-xs text-neutral-gray">{review.role}</div>
                  </div>

                  <p className="text-lg font-medium text-neutral-black leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
