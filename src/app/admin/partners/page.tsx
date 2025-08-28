"use client"
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import Resizer from "react-image-file-resizer";

export default function CreatePartnerPage() {
  const [partnerTitle, setPartnerTitle] = useState("");
  const [partnerImage, setPartnerImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!partnerTitle || !partnerImage) {
      toast.error("Partner title and image are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("partnerTitle", partnerTitle);
    formData.append("partnerImage", partnerImage);

    try {
      const response = await axiosInstance.post("/admin/partner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Partner created successfully!");
        setPartnerTitle("");
        setPartnerImage(null);
      } else {
        toast.error(response.data.error || "Failed to create partner.");
      }
    } catch (error: any) {
      toast.error("An error occurred: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      Resizer.imageFileResizer(
        file,
        1000, // max width
        1000, // max height
        "JPEG", // compress format
        80, // quality (0-100)
        0, // rotation
        (uri) => {
          // uri is a base64 string, convert it to Blob/File
          fetch(uri as string)
            .then(res => res.blob())
            .then(blob => {
              const resizedFile = new File([blob], file.name, { type: file.type });
              setPartnerImage(resizedFile);
            });
        },
        "base64" // output type
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Partner</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="partnerTitle" className="block text-gray-700 text-sm font-bold mb-2">
            Partner Title:
          </label>
          <input
            type="text"
            id="partnerTitle"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={partnerTitle}
            onChange={(e) => setPartnerTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="partnerImage" className="block text-gray-700 text-sm font-bold mb-2">
            Partner Image:
          </label>
          <input
            type="file"
            id="partnerImage"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Partner"}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
