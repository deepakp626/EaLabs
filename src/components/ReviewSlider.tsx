"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Heading from "./Heading";
import axiosInstance from "@/lib/axios";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axiosInstance.get("/admin/reviews");
        setReviews(response.data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getReviews();
  }, []);

  function bufferToBase64(buffer: Buffer | Uint8Array): string {
    if (!buffer) return '';

    // Ensure it's a Buffer
    const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);

    return buf.toString('base64');
  }

  return (
    <div className="max-w-7xl mx-auto py-16">
      <Heading
        title="Our doctors and clinics have earned over 5,000+ reviews on Google!"
        align="center"
      />

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
                  <div className="flex flex-col items-center h-20 w-22 gap-1">
                    <div className="relative h-full w-full">
                      <Image
                        src={`data:image/jpeg;base64,${bufferToBase64(review.image)}`}
                        alt={review.userName}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="text-sm font-semibold text-neutral-black">
                      {review.userName}
                    </div>
                  </div>

                  <p className="text-lg font-medium text-neutral-black leading-relaxed">
                    {review.userReview}
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

