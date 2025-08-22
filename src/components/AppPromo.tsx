// app/components/AppPromo.tsx
"use client";

import Image from "next/image";

const AppPromo = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Left 40% */}
            <div className="w-full md:w-[40%] bg-[#EEF2F6] rounded-3xl p-8 flex flex-col justify-between relative">

                {/* Mock icons/cards */}
                <div className="flex gap-3 mb-8">
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWfKU53G_dKTqay0DwUdMIKDauowk5_Ruug&s" alt="Card1" width={60} height={70} />
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWfKU53G_dKTqay0DwUdMIKDauowk5_Ruug&s" alt="Card2" width={60} height={70} />
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWfKU53G_dKTqay0DwUdMIKDauowk5_Ruug&s" alt="Card3" width={60} height={70} />
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWfKU53G_dKTqay0DwUdMIKDauowk5_Ruug&s" alt="Card4" width={60} height={70} />
                </div>

                {/* Headings */}
                <h2 className="text-3xl font-bold leading-tight text-gray-900 mb-4">
                    Download Our <br />
                    <span className="text-[#8fa4b8]">Healthcare App</span> for <br />
                    Easy Access
                </h2>

                {/* Store buttons */}
                <div className="flex gap-3">
                    <Image src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" width={140} height={45} />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={140} height={45} />
                </div>
            </div>

            {/* Right 60% */}
            <div className="w-full md:w-[60%] bg-[#FFEB58] rounded-3xl px-8 relative overflow-hidden">

                {/* top brand logo */}
                    <div className="absolute top-6 right-6">
                        <Image src="/medicare-logo.png" alt="logo" width={100} height={40} />
                    </div>

                {/* Phone UI image */}
                <div className="flex justify-center mt-10 ">

                    <Image
                        src="/app-preview.png"
                        alt="App preview"
                        width={420}
                        height={500}
                        className="z-10"
                    />
                </div>


            </div>
        </div>
    );
};
export default AppPromo;