// components/ProfitCard.jsx
import React from "react";

const ProfitCard = ({ title, img, bg, text }) => {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl shadow-md p-4 sm:p-6">
      <div className={`flex-shrink-0 p-3 sm:p-4 ${bg} rounded-full`}>
        <img src={img} alt={title} className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>
      <div>
        <h4 className="text-lg sm:text-xl font-semibold text-blue-900 mb-1">
          {title}
        </h4>
        <p className="text-sm sm:text-base text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default ProfitCard;
