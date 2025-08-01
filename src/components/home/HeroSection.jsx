import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-indigo-50 via-white to-white overflow-hidden">
      {/* decorative skew */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-indigo-100 transform -skew-x-12 origin-top-left" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div>
            <h5 className="text-purple-600 font-semibold mb-2">
              A smarter, better way to invest
            </h5>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-4">
              Real Estate <br />
              Investment For <span className="text-purple-600">Everyone</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Buy shares of rental properties, earn monthly income, and watch your money grow
            </p>
            <div className="flex gap-4">
              <a
                href="/properties"
                className="px-8 py-4 bg-purple-600 text-white font-medium rounded-lg shadow-lg hover:bg-purple-700 transition"
              >
                Start Exploring
              </a>
              <a
                href="/business-loan"
                className="px-8 py-4 bg-white text-blue-900 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition"
              >
                Get Funding
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="/assets/images/hero/hero-illustration.png"
            // src="/herosection.png"
              alt="Hero Illustration"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
