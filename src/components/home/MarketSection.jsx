import React from 'react';

const MarketSection = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Image slider (single slide shown) */}
          <div className="relative">
            <div className="overflow-hidden">
              <img
                src="/assets/images/market-illustration.png"
                alt="Market Illustration"
                className="w-full h-full object-cover"
              />
            </div>
            {/* pagination dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
              <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 text-center lg:text-left">
            <h5 className="text-purple-600 font-semibold">
              Real exposure to the real estate market
            </h5>
            <h2 className="text-5xl font-extrabold text-blue-900 leading-tight">
              You Invest. Revest Does the Rest
            </h2>
            <p className="text-gray-700">
              Transparent real estate investing through Revest. Join us and experience a smarter, better way to invest in real estate.
            </p>
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <a
                href="/properties"
                className="px-8 py-4 bg-[#4e0dff] text-white font-medium rounded-lg shadow-lg hover:bg-[#4e0dff] transition"
              >
                Start Exploring
              </a>
              {/* curved arrow graphic */}
              {/* <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 64 64"
              >
                <path
                  d="M10 32 C20 12, 44 12, 54 32"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 28 L54 32 L50 36"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
