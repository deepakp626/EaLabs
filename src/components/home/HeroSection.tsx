'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeroData, setCards } from '@/store/features/heroSlice';
import { RootState,AppDispatch } from '@/store/store';
import axiosInstance from '@/lib/axios';
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const HeroSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [heroData, setHeroData] = useState(null);
  const [activeTab, setActiveTab] = useState("About Ea Labs"); // State for the active tab
  const { heroImage, cards, status, error } = useSelector((state: RootState) => state.hero);

  useEffect(() => {
    dispatch(fetchHeroData());
  }, [dispatch]);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axiosInstance.get('/admin/herosection');
        setHeroData(response.data);
        dispatch(setCards(response.data[0].cards));
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, [dispatch]);

  interface TabContent {
    [key: string]: {
      title: string,
      description: string
    }
  }

  // Tab content mapping
  const tabContent: TabContent = {
    "About Ea Labs": {
      title: "Welcome to EA Labs",
      description: "We provide precision diagnostics and care you can trust."
    },
    "Test we offer": {
      title: "Our Testing Services",
      description: "Offering a wide range of pathology and allergy testing options."
    },
    "Recognitions": {
      title: "Recognized Excellence",
      description: "We are proud of our achievements in the medical community."
    },
    "Our Blogs": {
      title: "Insights and Updates",
      description: "Stay updated with our latest news and informative articles."
    }
  };

  if (!heroData) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <section
      className="relative w-full h-[80vh] flex flex-col justify-between bg-cover bg-center mt-5"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg')", // 🔹 Replace with backend image URL
      }}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md">
        {/* Tabs */}
        <nav className="flex space-x-8 text-gray-800 font-light">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`hover:text-red-500 ${activeTab === tab ? 'font-bold' : ''}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-xl text-gray-700">
          <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
          <a href="#"><FaFacebookF className="hover:text-blue-600" /></a>
          <a href="#"><FaYoutube className="hover:text-red-600" /></a>
        </div>
      </header>

      {/* Hero Content */}
      <div className="flex items-center justify-center md:justify-end h-full px-10 md:px-20">
        <div className="max-w-xl text-center md:text-left text-white">
          <h1 className="text-3xl md:text-5xl font-semibold leading-snug">
            {tabContent[activeTab].title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            {tabContent[activeTab].description}
          </p>

          <button className="mt-6 inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full shadow-md font-medium hover:bg-gray-200 transition">
            Book a test →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;