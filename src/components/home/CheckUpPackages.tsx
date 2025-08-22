"use client"
import React, { useState } from 'react';
import Heading from '@/components/Heading';

// Main App component which contains the entire tab section UI
const CheckUpPackages = () => {
    // Use state to keep track of the currently active tab
    const [activeTab, setActiveTab] = useState('all-tests');

    // Define the data for all the tabs
    const tabs = [
        { id: 'all-tests', name: 'All tests' },
        { id: 'full-body-checkup', name: 'Full body Check up' },
        { id: 'diabetes', name: 'Diabetes' },
        { id: 'heart', name: 'Heart' },
        { id: 'cancer', name: 'Cancer' },
        { id: 'vitamin', name: 'Vitamin' },
        { id: 'women-health', name: 'Women Health' },
        { id: 'skin-care', name: 'Skin care' },
        { id: 'liver', name: 'Liver' },
        { id: 'kidney', name: 'Kidney' },
        { id: 'stress', name: 'Stress' },
    ];

    // Define the data for the product cards, now with a 'category' field for filtering
    const allProducts = [
        {
            id: 1,
            category: 'full-body-checkup',
            title: 'Medicare Full body Health Checkup',
            subtitle: 'Includes 12 Tests',
            price: '$430.00',
            oldPrice: '$80.00',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-pink-500">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 .15.45l4.5 4.5a.75.75 0 0 0 1.06-1.06L13.5 11.44V6Z" clipRule="evenodd" />
                </svg>
            ),
        },
        {
            id: 2,
            category: 'vitamin',
            title: 'Comprehensive full body checkup with Vitamin D & B12',
            subtitle: 'Includes 11 Tests',
            price: '$240.00',
            oldPrice: '$80.00',
            discount: '20% Off',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-pink-500">
                    <path d="M11.472 3.998a.75.75 0 0 1 1.056 0l5.147 5.147a.75.75 0 0 1-.53 1.285h-1.07l1.011 1.011a.75.75 0 0 1-1.06 1.06L15.94 11.75h-1.011a.75.75 0 0 1-1.06-1.06l1.011-1.011h-1.07a.75.75 0 0 1-.53-1.285L14.73 6.06l-.793-.793a.75.75 0 0 0-1.06 0l-1.011 1.011H10.75a.75.75 0 0 1-.53-1.285l5.147-5.147Z" />
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM7.5 14.25a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-3Zm8.25-2.25a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-3Z" />
                </svg>
            ),
        },
        {
            id: 3,
            category: 'women-health',
            title: "Women's Staying Strong Health Checkup",
            subtitle: 'Includes 32 Tests',
            price: '$300.00',
            oldPrice: '$220.00',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-pink-500">
                    <path d="M14.629 5.25a.75.75 0 0 0-.053-.153A8.995 8.995 0 0 0 12 3.75c-2.039 0-3.96 1.002-5.076 2.625.61.341 1.283.636 2.008.875a6.52 6.52 0 0 1-.749-.387L9.43 5.343a.75.75 0 0 1 .494.675v.982a.75.75 0 0 1-.75.75h-3.411a.75.75 0 0 1-.75-.75V6.02a.75.75 0 0 1-.168-.529 9.006 9.006 0 0 0-3.045 4.86c0 5.097 3.69 9.382 8.4 10.155.191.031.385.05.58.05h.001c.195 0 .388-.019.579-.049 4.71-1.073 8.4-5.059 8.4-10.156a9.007 9.007 0 0 0-3.044-4.86Z" />
                    <path d="M9.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H9.75Z" />
                    <path d="M13.5 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Z" />
                    <path d="M11.69 11.25a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-.75-.75h-.75Z" />
                </svg>
            ),
        },
        {
            id: 4,
            category: 'diabetes',
            title: 'Medi care Diabetes Screening',
            subtitle: 'Includes 07 Tests',
            price: '$364.00',
            oldPrice: '$80.00',
            discount: '20% Off',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-pink-500">
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12.75 6a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 .15.45l4.5 4.5a.75.75 0 0 0 1.06-1.06L13.5 11.44V6Z" />
                </svg>
            ),
        },
        {
            id: 5,
            category: 'heart',
            title: 'Cardiac Health Assessment',
            subtitle: 'Includes 15 Tests',
            price: '$500.00',
            oldPrice: '$100.00',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-pink-500">
                    <path d="m11.602 2.222 5.064 7.025-2.071 2.072a.75.75 0 0 0 0 1.06l3.89 3.89-1.06 1.061-3.89-3.89a.75.75 0 0 0-1.06 0l-2.072 2.072 7.025 5.064a.75.75 0 0 0 .945-1.164L13.116 16.91a.75.75 0 0 0-.91-.186l-2.074 1.037a.75.75 0 0 0-.585.603 3.501 3.501 0 0 1-2.015 2.158.75.75 0 0 0-.649.198l-1.06.852a.75.75 0 0 0-1.282-.572l-1.464-1.464a.75.75 0 0 0-1.164.945l5.064-7.025-2.071-2.072a.75.75 0 0 0 0-1.06l3.89-3.89 1.06 1.061 3.89 3.89a.75.75 0 0 0 1.06 0l2.072-2.072-7.025-5.064a.75.75 0 0 0-.945 1.164L10.884 7.09a.75.75 0 0 0 .91.186l2.074-1.037a.75.75 0 0 0 .585-.603A3.501 3.501 0 0 1 18.068 3.5a.75.75 0 0 0 .649-.198l1.06-.852a.75.75 0 0 0 1.282.572l1.464 1.464a.75.75 0 0 0 1.164-.945Z" />
                </svg>
            ),
        },
    ];

    // Filter the products based on the active tab
    const filteredProducts = activeTab === 'all-tests'
        ? allProducts
        : allProducts.filter(product => product.category === activeTab);

    return (
        <div className="max-w-7xl mx-3 md:mx-auto bg-white py-6 md:py-12 lg:py-20 font-sans">

            <div className="flex flex-col  ">
                <Heading title="Featured Health Check-Up Packages" align='center' />

                {/* Tab section */}
                {/* Tab section */}
                <div className="overflow-hidden">
                    <div className="flex justify-start overflow-x-auto gap-4 p-2 md:p-4 lg:p-6 mb-8 lg:mb-12  ">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={` flex-shrink-0 px-6 py-2.5 text-sm md:text-base lg:text-lg font-medium rounded-full transition-colors duration-200 ease-in-out ${activeTab === tab.id
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
                <div className="flex gap-6 md:gap-8 lg:gap-12 overflow-x-auto w-full py-4  no-scrollbar">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="relative flex-shrink-0 w-[280px] bg-gray-300  rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 ">
                                {/* Product icon */}
                                <div className="flex justify-center mb-6">
                                    {product.icon}
                                </div>

                                {/* Discount badge */}
                                {product.discount && (
                                    <div className="absolute top-4 right-4 bg-yellow-300 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                        {product.discount}
                                    </div>
                                )}

                                {/* Product details */}
                                <div className="text-center mb-4">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight mb-1">{product.title}</h3>
                                    <p className="text-sm text-gray-500">{product.subtitle}</p>
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
