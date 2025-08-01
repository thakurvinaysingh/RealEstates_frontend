import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, HomeIcon, CurrencyDollarIcon, CalendarIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const PropertyCard = ({ property, isFavorite = false, onToggleFavorite, onShare }) => {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'for sale':
        return 'bg-green-100 text-green-800';
      case 'for rent':
        return 'bg-blue-100 text-blue-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="property-card animate-fade-in">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={property.image || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={property.title}
          className="property-image"
        />
        
        {/* Overlay Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex flex-col space-y-2">
            <span className={`badge ${getStatusColor(property.status)} backdrop-blur-sm`}>
              {property.status || 'For Sale'}
            </span>
            {property.featured && (
              <span className="badge bg-yellow-100 text-yellow-800 backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onToggleFavorite?.(property.id)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110"
            >
              {isFavorite ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => onShare?.(property)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110"
            >
              <ShareIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price || 850000)}
            </span>
            {property.status === 'For Rent' && (
              <span className="text-gray-600 text-sm">/month</span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title & Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {property.title || 'Luxury Modern Villa'}
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">
              {property.location || 'Beverly Hills, CA'}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <HomeIcon className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">
              {property.bedrooms || 4} Beds
            </span>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">
              {property.bathrooms || 3} Baths
            </span>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2M4 8v8a2 2 0 002 2h2m0-16v16m8-16h2a2 2 0 012 2v2m-4-4v16m4-16v8a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">
              {property.area || '2,500'} sqft
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {property.description || 'Beautiful modern villa with stunning views, premium finishes, and luxury amenities in prime location.'}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>{property.listedDate || '2 days ago'}</span>
          </div>
          
          <Link
            to={`/property/${property.id || '1'}`}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-colors duration-300"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;