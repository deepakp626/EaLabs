'use client';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="mx-6 bg-[#ADE9E6] rounded-3xl py-16 px-6 md:px-20 overflow-hidden mt-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row ">
        {/* left text */}
        <div className="flex-1 space-y-8 md:pr-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Family body <br />
            checkup package <br />
            <span>Now at $199</span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-xl">✔</span>
              <p>Full body checkup with cancer</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">✔</span>
              <p>Free home sample pickup</p>
            </div>
          </div>

          <button className="mt-6 bg-gray-900 w-fit text-white text-lg font-medium rounded-full px-8 py-4 flex items-center space-x-2 hover:bg-gray-800 transition">
            <span>Book now</span>
            <span>→</span>
          </button>
        </div>

        {/* right image */}
        <div className="flex-1 mt-10 md:mt-0 relative rounded-2xl">
          <div className="rounded-2xl w-full h-full absolute inset-0 bg-[url('https://cdn.prod.website-files.com/600c68cb72173ece9c8958ed/637dc29d23239b4f6f305166_Hero%20Section.webp')] bg-no-repeat bg-cover bg-center"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
