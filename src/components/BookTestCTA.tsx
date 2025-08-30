"use client";

export default function BookTestCTA() {
  return (
    <section className=" mx-auto px-4 py-4">
      <div
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/background/20241015/pngtree-abstract-watercolor-background-with-pastel-colors-like-light-blue-and-pink-image_16394760.jpg')", // replace with your image URL
          }}
      className="bg-white rounded-2xl flex flex-col md:flex-row md:justify-end overflow-hidden shadow-lg bg-no-repeat bg-cover">
        

        {/* Right Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center  text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Take control of your health today.
          </h2>
          <p className="text-lg mb-6">
            Book a test in minutes and get reports you can rely on.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition">
            Book a test
          </button>
        </div>
      </div>
    </section>
  );
}
