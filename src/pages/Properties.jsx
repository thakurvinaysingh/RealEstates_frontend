import React, { useState } from 'react';
import HomeLayout from '../layouts/HomeLayout';
import PropertyCard from '../components/home/PropertyCard';
import { MagnifyingGlassIcon, FunnelIcon, MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';

const Properties = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    sortBy: 'newest'
  });
  const [favorites, setFavorites] = useState([]);

  // Static Properties Data (expanded)
  const allProperties = [
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
      listedDate: "2 days ago",
      description: "Stunning modern villa with panoramic city views, premium finishes, and resort-style amenities."
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
      listedDate: "1 week ago",
      description: "Exclusive penthouse in the heart of Manhattan with floor-to-ceiling windows and private terrace."
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
      listedDate: "3 days ago",
      description: "Beachfront condo with direct ocean access, modern amenities, and breathtaking sunset views."
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
      listedDate: "5 days ago",
      description: "Magnificent estate nestled in the mountains with ski-in/ski-out access and luxury amenities."
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
      listedDate: "1 day ago",
      description: "Industrial-chic loft in trendy Brooklyn neighborhood with exposed brick and high ceilings."
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
      listedDate: "1 week ago",
      description: "Perfect family home in quiet neighborhood with large backyard and excellent school district."
    },
    {
      id: 7,
      title: "Luxury Townhouse",
      location: "San Francisco, CA",
      price: 2200000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2400,
      status: "For Sale",
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "4 days ago",
      description: "Victorian-style townhouse with modern updates, private garden, and stunning city views."
    },
    {
      id: 8,
      title: "Beachside Cottage",
      location: "Malibu, CA",
      price: 1650000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1900,
      status: "For Sale",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "6 days ago",
      description: "Charming beachside cottage with direct beach access, perfect for weekend getaways."
    },
    {
      id: 9,
      title: "Modern Apartment",
      location: "Seattle, WA",
      price: 850000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      status: "For Rent",
      image: "https://images.pexels.com/photos/2121122/pexels-photo-2121122.jpeg?auto=compress&cs=tinysrgb&w=800",
      listedDate: "2 days ago",
      description: "Contemporary apartment in downtown Seattle with city views and premium amenities."
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
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <HomeLayout>
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-50">
      {/* Header */}
      <section className=" border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="heading-lg text-gray-900 mb-2">
                Properties
              </h1>
              <p className="text-gray-600">
                Discover {allProperties.length} amazing properties in prime locations
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200">
                <MapIcon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Map View</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location or property name"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Price</option>
                <option value="0-500000">Under $500K</option>
                <option value="500000-1000000">$500K - $1M</option>
                <option value="1000000-2000000">$1M - $2M</option>
                <option value="2000000+">$2M+</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Beds</option>
                <option value="1">1+ Bed</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bedrooms">Most Bedrooms</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {allProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
                onShare={handleShare}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              Load More Properties
            </button>
          </div>
        </div>
      </section>
    </div>
    </HomeLayout>
  );
};

export default Properties;