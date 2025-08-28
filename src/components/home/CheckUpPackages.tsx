"use client"
import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';
import axiosInstance from '@/lib/axios';

// Main App component which contains the entire tab section UI
const CheckUpPackages = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<string[]>([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use state to keep track of the currently active tab
    const [activeTab, setActiveTab] = useState('all-tests');

    useEffect(() => {
        const fetchCheckupPackages = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/admin/checkup-packages');
                setCategories(response.data.categories || []);
                setCards(response.data.cards || []);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch checkup packages');
                setLoading(false);
                console.error('Error fetching checkup packages:', err);
            }
        };

        fetchCheckupPackages();
    }, []);

    // Use categories from API response, with a default "All tests" option
    const tabs = [
        { id: 'all-tests', name: 'All tests' },
        ...(categories || []).map(category => ({ id: category, name: category }))
    ];

    // Filter the cards based on the active tab
    const filteredCards = activeTab === 'all-tests'
        ? cards
        : cards.filter(card => card.category === activeTab);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-3 md:mx-auto bg-white py-6 md:py-12 lg:py-20 font-sans">
            <div className="flex flex-col">
                <Heading title="Featured Health Check-Up Packages" align='center' />

                {/* Tab section */}
                <div className="overflow-hidden">
                    <div className="flex justify-start overflow-x-auto gap-4 p-2 md:p-4 lg:p-6 mb-8 lg:mb-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`flex-shrink-0 px-6 py-2.5 text-sm md:text-base lg:text-lg font-medium rounded-full transition-colors duration-200 ease-in-out ${
                                    activeTab === tab.id
                                        ? 'bg-black text-white'
                                        : 'bg-white text-gray-700 border border-gray-300'
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product grid section */}
                <div className="flex gap-6 md:gap-8 lg:gap-12 overflow-x-auto w-full py-4 no-scrollbar">
                    {filteredCards.length > 0 ? (
                        filteredCards.map((card) => (
                            <div key={card._id} className="relative flex-shrink-0 w-[280px] bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg transition-transform duration-200 ease-in-out hover:scale-105">
                                {/* Product icon */}
                                <div className="flex justify-center mb-6">
                                    {card.image?.data && (
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden">
                                            <Image
                                                src={`data:image/jpeg;base64,${Buffer.from(card.image).toString("base64")}`}
                                                alt={card.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Discount badge */}
                                {card.discount && (
                                    <div className="absolute top-4 right-4 bg-yellow-300 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                        {card.discount}
                                    </div>
                                )}

                                {/* Product details */}
                                <div className="text-center mb-4">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight mb-1">{card.title}</h3>
                                    <p className="text-sm text-gray-500">Includes {card.testCount} Tests</p>
                                </div>

                                {/* Price and Add button */}
                                <div className="flex flex-col xl:flex-row items-center justify-center gap-4">
                                    <button className="w-full px-6 py-2 bg-blue-100 text-blue-500 rounded-lg text-sm font-semibold transition-colors duration-200 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="w-full text-center text-gray-500 mt-10">No packages found for this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CheckUpPackages;