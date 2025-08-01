import React from 'react';

const features = [
  {
    title: 'Passive Income',
    img: '/assets/images/overview/passive-income.png',
    bg: 'bg-green-50',
    text: 'Earn rental income and receive deposits quarterly',
  },
  {
    title: 'Secure & Cost-efficient',
    img: '/assets/images/overview/secure.png',
    bg: 'bg-purple-100',
    text: 'Digital security is legally compliant and tangible for qualified investors',
  },
  {
    title: 'Transparency',
    img: '/assets/images/overview/transparency.png',
    bg: 'bg-rose-50',
    text: 'Easily consult the full documentation for each property.',
  },
  {
    title: 'Support',
    img: '/assets/images/overview/support.png',
    bg: 'bg-teal-50',
    text: 'Earn rental income and receive deposits quarterly',
  },
];

const ProfitOverview = () => {
  return (
    <section className="pt-16 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h5 className="text-purple-600 font-semibold mb-3 text-lg md:text-xl">
            Built to help smart investors invest smarter
          </h5>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight">
            We handle the heavy lifting so you
            <br className="hidden sm:block" />
            can sit back, relax, and profit.
          </h2>
          <p className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            We make institutional quality real estate accessible to investors, in a simple
            and transparent way.
          </p>
        </div>

        {/* Cards Grid - 2 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 sm:px-4 lg:px-12">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-6 rounded-2xl shadow-md bg-white transform transition duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className={`flex-shrink-0 p-4 ${item.bg} rounded-full`}>
                <img src={item.img} alt={item.title} className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-blue-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-700 text-sm md:text-base">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfitOverview;
