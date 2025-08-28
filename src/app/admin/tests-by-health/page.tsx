"use client";
import { useState } from "react";
import Resizer from 'react-image-file-resizer';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '@/lib/axios';

export default function HealthConcernForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const compressImage = async (file: File) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1920,
        1920,
        'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri as File);
        },
        'file'
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const compressedImage = await compressImage(image);
    if (!compressedImage) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", compressedImage);

    try {
      const response = await axiosInstance.post("/admin/healthconcerns", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        toast.success("Health concern saved successfully");
        setTitle("");
        setImage(null);
      } else {
        toast.error("Failed to save health concern");
      }
    } catch (error) {
      console.error("Error saving health concern:", error);
      toast.error("Error saving health concern");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Health Concern
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image" className="sr-only">Image</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Health Concern
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
