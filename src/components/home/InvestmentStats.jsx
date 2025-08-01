import React from "react";
import CountUp from "react-countup";
import { FaRegHandshake, FaCalendarAlt, FaChartLine } from "react-icons/fa";

const stats = [
  {
    icon: <FaRegHandshake className="text-4xl text-purple-500" />,
    value: 3000,
    suffix: "+",
    label: "Investors Using Platform",
    duration: 2,
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-blue-500" />,
    value: 32,
    suffix: "",
    label: "Years Experience",
    duration: 2,
  },
  {
    icon: <FaChartLine className="text-4xl text-green-500" />,
    value: 18,
    suffix: "%",
    label: "Returns upto",
    duration: 2,
  },
];

const InvestmentStats = () => {
  return (
    <section className="bg-purple-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-y-12 lg:gap-x-20">
        {/* Left Content */}
        <div className="flex-1 w-full max-w-xl text-center lg:text-left">
          <h4 className="text-purple-700 text-base font-bold mb-2">
            With Revest anyone can invest!
          </h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
            Numbers Said More <br className="hidden md:block" />
            Than Words
          </h2>
          <p className="text-gray-600 mb-7 md:mb-10 max-w-md mx-auto lg:mx-0">
            Our low minimums give you the flexibility to invest the right amount,
            at the right time, to meet your goals.
          </p>
          <a
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            Start Exploring
          </a>
        </div>

        {/* Right Layout */}
        <div className="flex-1 w-full flex flex-row gap-6">
          {/* Left column: 2 vertical cards */}
          <div className="flex flex-col gap-6 w-1/2">
            {stats.slice(0, 2).map(({ icon, value, suffix, label, duration }) => (
              <div
                key={label}
                className="group bg-white shadow-xl hover:shadow-2xl transition rounded-2xl px-8 py-8 flex flex-col items-center text-center border-2 border-transparent hover:border-purple-300"
              >
                <div className="mb-4 rounded-full flex items-center justify-center h-16 w-16 bg-purple-50 group-hover:scale-110 transition">
                  {icon}
                </div>
                <div className="text-blue-900 text-3xl md:text-4xl font-extrabold mb-2">
                  <CountUp
                    end={value}
                    duration={duration}
                    suffix={suffix}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </div>
                <p className="text-gray-700 text-md font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* Right column: 1 card centered vertically */}
          <div className="flex items-center justify-center w-1/2">
            <div className="group bg-white shadow-xl hover:shadow-2xl transition rounded-2xl px-8 py-8 flex flex-col items-center text-center border-2 border-transparent hover:border-purple-300 w-full">
              <div className="mb-4 rounded-full flex items-center justify-center h-16 w-16 bg-purple-50 group-hover:scale-110 transition">
                {stats[2].icon}
              </div>
              <div className="text-blue-900 text-3xl md:text-4xl font-extrabold mb-2">
                <CountUp
                  end={stats[2].value}
                  duration={stats[2].duration}
                  suffix={stats[2].suffix}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </div>
              <p className="text-gray-700 text-md font-medium">{stats[2].label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentStats;
