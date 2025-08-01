// src/components/FeaturedProperties.jsx
import React from "react";
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaLock } from "react-icons/fa";

const featuredProps = [
  {
    title: "Los Angeles",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "8706 Herrick Ave, Los Angeles",
    investors: 119,
    invested: "4,94,196",
    percent: 54.73,
    goal: "1,00,000",
    returnRate: "7.5% + 3%",
    term: "26 Months",
    type: "Commercial",
    distribution: "Monthly",
  },
  {
    title: "San Francisco, CA",
    image: "/assets/images/property/san.png",
    location: "3335 21 St, San Francisco",
    investors: 179,
    invested: "1,64,296",
    percent: 64.73,
    goal: "5,00,000",
    returnRate: "3.5% + 6%",
    term: "48 Months",
    type: "Commercial",
    distribution: "Monthly",
  },
];

const FeaturedProperties = () => (
  <section className="featured__properties section__space bg-gray-50 py-16 p-12">
    <div className="container mx-auto px-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-4xl font-extrabold text-blue-900 leading-tight">
          Featured Properties
        </h2>
        <a
          href="/properties"
          className="inline-block px-6 py-3 bg-white shadow-lg rounded-lg text-blue-900 font-semibold 
          hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
        >
          Browse All Properties
        </a>
      </div>

      {/* Property Cards */}
      <div className="space-y-10 ">
        {featuredProps.map((p) => (
          <article
            key={p.title}
            className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"
          >
            {/* Image */}
            <div className="md:w-[40%] aspect-w-16 aspect-h-8 md:aspect-none  p-8 rounded-lg">
              <img
                src={p.image}
                alt={`Photo of property in ${p.title}`}
                className="w-full h-full object-cover rounded-lg "
                loading="lazy"
              />
            </div>

            {/* Details */}
            <div className="md:w-[60%] p-8 flex flex-col justify-between">
              {/* Title & Location */}
              <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-3xl font-extrabold text-blue-900">{p.title}</h3>
                  <p className="flex items-center text-gray-600 mt-2 text-sm md:text-base font-medium">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" aria-hidden="true" />
                    <span>{p.location}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="flex items-center text-gray-500 text-sm md:text-base font-medium">
                    <FaClock className="mr-2" aria-hidden="true" />
                    Left to invest
                  </p>
                  <p className="mt-1 text-xl md:text-2xl font-bold text-purple-600 tracking-wider">
                    00D : 00H : 00M
                  </p>
                </div>
              </header>

              {/* Progress */}
              <section className="mt-8">
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-green-500 transition-width duration-1000 ease-in-out"
                    style={{ width: `${p.percent}%` }}
                    aria-valuenow={p.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                    aria-label={`Investment progress: ${p.percent}%`}
                  />
                </div>
                <div className="flex justify-between items-center mt-3 text-gray-700 text-sm md:text-base font-medium">
                  <span>
                    <strong>{p.investors}</strong> Investors |{" "}
                    <FaDollarSign className="inline-block" /> {p.invested} (
                    {p.percent.toFixed(1)}%)
                  </span>
                  <span>
                    <FaDollarSign className="inline-block" /> <strong>{p.goal}</strong> Goal
                  </span>
                </div>
              </section>

              {/* Metrics */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border-y py-6 text-center text-gray-700">
                <div>
                  <p className="text-sm font-semibold tracking-wide uppercase">Annual Return</p>
                  <p className="font-bold text-purple-600 mt-1">{p.returnRate}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide uppercase">Maximum Term</p>
                  <p className="font-bold text-purple-600 mt-1">{p.term}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide uppercase">Property Type</p>
                  <p className="font-bold text-purple-600 mt-1">{p.type}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide uppercase">Distribution</p>
                  <p className="font-bold text-purple-600 mt-1">{p.distribution}</p>
                </div>
              </section>

              {/* Security & CTA */}
              <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8">
                <div
                  className="flex items-center bg-blue-50 p-4 rounded-xl w-full md:w-auto"
                  aria-label="Security Guarantee"
                  role="region"
                >
                  <div className="p-3 bg-white rounded-full mr-4 flex-shrink-0">
                    <FaLock className="text-green-600 text-2xl" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Security</p>
                    <p className="font-semibold text-green-900">1st-Rank Mortgage</p>
                  </div>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                  <a
                    href="/registration"
                    className="flex-1 md:flex-none px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold shadow-md text-center hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 transition"
                  >
                    Invest Now
                  </a>
                  <a
                    href="/property-details"
                    className="flex-1 md:flex-none px-6 py-3 bg-white shadow-md rounded-xl font-semibold text-gray-800 border border-gray-200 text-center hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                  >
                    Details
                  </a>
                </div>
              </section>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProperties;
