import React from "react";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  let progress = 0;

  if (property.targetAmount && property.amount) {
    progress = (property.amount / property.targetAmount) * 100;
  } else if (property.totalInvestors && property.investors) {
    progress = (property.investors / property.totalInvestors) * 100;
  } else {
    progress = 64.73;
  }

  progress = Math.min(progress, 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
      {/* Image wrapper with hover overlay */}
      <div className="relative group rounded-lg overflow-hidden" style={{ unicodeBidi: "isolate" }}>
        <Link to={`/property/${property.id}`} className="block overflow-hidden rounded-lg">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[250px] object-cover box-border border-2 border-white p-4 rounded-lg transition-transform duration-300 hover:rotate-3 group-hover:scale-110"
          />
        </Link>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300 rounded-lg pointer-events-none">
       
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-5 flex-1">
        {/* Title + Location */}
        <div className="text-left">
          <h4 className="text-[28px] leading-[36px] font-bold text-[#13216e]">{property.title}</h4>
          <div className="flex gap-1 text-[16px] leading-[24px] text-gray-600 mt-1">
            <MapPinIcon className="w-4 h-4 text-[#8a8ab8]" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-[10px] overflow-hidden">
            <div
              className="h-[10px] bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-[16px] text-gray-700">
            <span className="font-medium">{property.investors} Investors</span> |{" "}
            <span className="font-medium">₹ {property.amount}</span>{" "}
            <span className="text-blue-600 font-semibold">({Math.round(progress)}%)</span>
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 text-center border-t border-gray-200 pt-4 divide-x divide-gray-300">
          <div className="px-3">
            <p className="text-[18px] leading-[30px] font-normal text-[#13216e] text-left">Annual Return</p>
            <h6 className="text-[18px] leading-[24px] font-semibold text-[#13216e] text-left">{property.annualReturn}</h6>
          </div>
          <div className="px-3">
            <p className="text-[18px] leading-[30px] font-normal text-[#13216e] text-right">Property Type</p>
            <h6 className="text-[18px] leading-[24px] font-semibold text-[#13216e] text-right">{property.type}</h6>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-auto gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-500 flex justify-center sm:justify-start items-center gap-1">
              <ClockIcon className="w-4 h-4 text-[#13216e]" />
              Left to invest
            </p>
            <div className="text-[24px] leading-[32px] font-bold text-[#4e0dff]">
              <span>00D</span> : <span>00H</span> : <span>00M</span>
            </div>
          </div>
          <Link
            to={`/property/${property.id}`} 
            className="px-[30px] py-[14px] bg-[#5927e3] rounded-[10px] shadow-[0_4px_24px_rgba(89,39,227,0.25)] text-center text-white hover:bg-[#4a1fd0] transition-colors duration-300"
          >
            Invest Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
