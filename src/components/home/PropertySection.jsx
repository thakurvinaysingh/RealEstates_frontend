// src/components/PropertySection.jsx
import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
 // Static Properties Data

const PropertySection = () => {
    const [favorites, setFavorites] = useState([]);
 // Static Properties Data
 const featuredProperties = [
    {
      id: 1,
      title: "Luxury Modern Villa",
      location: "Beverly Hills, CA",
      price: 2850000,
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      status: "For Sale",
      featured: true,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Downtown Penthouse",
      location: "Manhattan, NY",
      price: 3200000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      status: "For Sale",
      featured: true,
      image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Waterfront Condo",
      location: "Miami Beach, FL",
      price: 1850000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      status: "For Sale",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "3 days ago"
    },
    {
      id: 4,
      title: "Mountain View Estate",
      location: "Aspen, CO",
      price: 4500000,
      bedrooms: 6,
      bathrooms: 5,
      area: 6200,
      status: "For Sale",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "5 days ago"
    },
    {
      id: 5,
      title: "Urban Loft",
      location: "Brooklyn, NY",
      price: 950000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      status: "For Sale",
      image: "https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "1 day ago"
    },
    {
      id: 6,
      title: "Suburban Family Home",
      location: "Austin, TX",
      price: 750000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      status: "For Sale",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "1 week ago"
    }
  ];

  


  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };
  const handleShare = (property) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this amazing property: ${property.title}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-lg font-playfair text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium properties, 
              carefully curated to meet the highest standards of luxury and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
                onShare={handleShare}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-primary">
              View All Properties
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
  );
};

export default PropertySection;
