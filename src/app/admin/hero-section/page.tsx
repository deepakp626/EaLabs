"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import axiosInstance from '@/lib/axios';

const HeroSectionForm = () => {
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [cards, setCards] = useState([
    { title: '', image: null as File | null },
    { title: '', image: null as File | null },
    { title: '', image: null as File | null },
  ]);

  console.log('heroImage --:', heroImage);
  console.log('cards --:', cards);

  // 🔹 Compress and set hero image
  const handleHeroImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1, // <= 1MB
          maxWidthOrHeight: 1200, // Resize large images
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setHeroImage(compressedFile);
      } catch (error) {
        console.error("Hero image compression failed:", error);
      }
    }
  };

  // 🔹 Handle card changes
  const handleCardChange = async ( index: number, field: 'title' | 'image', value: string | File | null ) => {
    const newCards = [...cards];
    if (field === 'title') {
      newCards[index].title = value as string;
    } else if (field === 'image' && value instanceof File) {
      try {
        const options = {
          maxSizeMB: 1, 
          maxWidthOrHeight: 1000,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(value, options);
        newCards[index].image = compressedFile;
      } catch (error) {
        console.error(`Card ${index + 1} image compression failed:`, error);
      }
    }
    setCards(newCards);
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (heroImage) {
      formData.append('heroImage', heroImage);
    }

    cards.forEach((card, index) => {
      formData.append(`cardTitle${index + 1}`, card.title);
      if (card.image) {
        formData.append(`cardImage${index + 1}`, card.image);
      }
    });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axiosInstance.post('/admin/herosection', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Hero section saved successfully!');
      } else {
        toast.error('Failed to save hero section');
      }
    } catch (error) {
      console.error('Error saving hero section:', error);
      toast.error('Error saving hero section');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hero Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {heroImage && (
            <div className="mt-2">
              <Image src={URL.createObjectURL(heroImage)} alt="Hero" width={200} height={100} className="rounded-lg" />
            </div>
          )}
        </div>

        {cards.map((card, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Card {index + 1}</h3>
            <input
              type="text"
              placeholder="Card Title"
              value={card.title}
              onChange={(e) => handleCardChange(index, 'title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleCardChange(index, 'image', e.target.files?.[0] || null)}
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {card.image && (
              <div className="mt-2">
                <Image src={URL.createObjectURL(card.image)} alt={`Card ${index + 1}`} width={100} height={100} className="rounded-lg" />
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Hero Section
        </button>
      </form>
    </>
  );
};

export default HeroSectionForm;
