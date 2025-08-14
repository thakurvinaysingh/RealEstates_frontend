import React, { useState, useEffect } from 'react';
import HomeLayout from '../layouts/HomeLayout';
import PropertyCard from '../components/home/PropertyCard';
import { MagnifyingGlassIcon, MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { listProperties } from '../api/properties';

const formatIN = (n) => (Number(n || 0)).toLocaleString('en-IN');

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
  const [properties, setProperties] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await listProperties();                  // GET /api/properties
        const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        // Map backend → UI shape (keep card layout unchanged)
        const mapped = list.map(p => ({
          id:         p.id,                                   // keep id for keys/favs
          slug:       p.slug,                                 // use this for details route
          title:      p.title?.trim() || p.location || '—',
          image:      p.img || '',                            // your card reads .image
          location:   p.location || '—',
          investors:  p.investors ?? 0,
          invested:   formatIN(p.invested ?? 0),              // "4,94,196" style
          percent:    Number(p.percent ?? 0),                 // string → number
          goal:       formatIN(p.goalAmount ?? 0),            // if present
          returnRate: p.returnRate || '—',
          term:       p.maxTerm || '—',
          type:       p.type || p.propertyType || '—',
          distribution: p.distribution || 'Monthly',
          timeLeft:   p.timeLeft || '0d'
        }));
        setProperties(mapped);
       
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleShare = (property) => {
    const url = property.slug ? `${window.location.origin}/property/${property.slug}` : window.location.href;
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };
console.log("hello",properties)


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // filtering (kept same, but align field names)
  const filteredProperties = properties.filter(property => {
    const matchesSearch = !filters.location ||
      property.title?.toLowerCase().includes(filters.location.toLowerCase()) ||
      property.location?.toLowerCase().includes(filters.location.toLowerCase());

    const matchesType = !filters.propertyType ||
      property.type?.toLowerCase() === filters.propertyType.toLowerCase();

    const matchesStatus = !filters.status || property.status === filters.status;

    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <HomeLayout>
        <div className="min-h-screen   flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <div className="min-h-screen  flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="min-h-screen ">
        {/* Header */}
        <section className=" border-b  bg-white border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div>
                <h1 className="heading-lg text-[#13216e] mb-2">Properties</h1>
                <p className="text-gray-600">
                  Discover {filteredProperties.length} amazing properties in prime locations
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-blue-600'
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
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
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

        
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
              </div>
            ) : (
              <div className={`grid gap-8 px-4  ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={toggleFavorite}
                    onShare={handleShare}
                  />
                ))}
              </div>
            )}

           
            {filteredProperties.length > 0 && (
              <div className="text-center mt-12">
                <button className="btn-primary">Load More Properties</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </HomeLayout>
  );
};

export default Properties;


// import React, { useState, useEffect } from 'react';
// import HomeLayout from '../layouts/HomeLayout';
// import PropertyCard from '../components/home/PropertyCard';
// import { MagnifyingGlassIcon, FunnelIcon, MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';
// import { listProperties } from '../api/properties';

// const Properties = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [filters, setFilters] = useState({
//     location: '',
//     propertyType: '',
//     priceRange: '',
//     bedrooms: '',
//     sortBy: 'newest'
//   });
//   const [favorites, setFavorites] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch properties from API
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         const response = await listProperties();
//         setProperties(response.data);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching properties:', err);
//         setError('Failed to load properties. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const toggleFavorite = (propertyId) => {
//     setFavorites(prev => 
//       prev.includes(propertyId) 
//         ? prev.filter(id => id !== propertyId)
//         : [...prev, propertyId]
//     );
//   };

//   const handleShare = (property) => {
//     if (navigator.share) {
//       navigator.share({
//         title: property.title,
//         text: `Check out this amazing property: ${property.title}`,
//         url: window.location.href
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!');
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   // Filter properties based on search and filters
//   const filteredProperties = properties.filter(property => {
//     const matchesSearch = !filters.location || 
//       property.title?.toLowerCase().includes(filters.location.toLowerCase()) ||
//       property.location?.toLowerCase().includes(filters.location.toLowerCase());
    
//     const matchesType = !filters.propertyType || property.propertyType === filters.propertyType;
//     const matchesStatus = !filters.status || property.status === filters.status;
    
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   if (loading) {
//     return (
//       <HomeLayout>
//         <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading properties...</p>
//           </div>
//         </div>
//       </HomeLayout>
//     );
//   }

//   if (error) {
//     return (
//       <HomeLayout>
//         <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-50 flex items-center justify-center">
//           <div className="text-center">
//             <p className="text-red-600 mb-4">{error}</p>
//             <button 
//               onClick={() => window.location.reload()} 
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </HomeLayout>
//     );
//   }

//   return (
//     <HomeLayout>
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-50">
//       {/* Header */}
//       <section className=" border-b border-gray-200">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
//             <div>
//               <h1 className="heading-lg text-gray-900 mb-2">
//                 Properties
//               </h1>
//               <p className="text-gray-600">
//                 Discover {filteredProperties.length} amazing properties in prime locations
//               </p>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-md transition-colors duration-200 ${
//                     viewMode === 'grid' 
//                       ? 'bg-white text-blue-600 shadow-sm' 
//                       : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-md transition-colors duration-200 ${
//                     viewMode === 'list' 
//                       ? 'bg-white text-blue-600 shadow-sm' 
//                       : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                 >
//                   <ListBulletIcon className="w-5 h-5" />
//                 </button>
//               </div>
              
//               <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200">
//                 <MapIcon className="w-5 h-5 text-gray-600" />
//                 <span className="text-gray-700">Map View</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4 py-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
//             {/* Search */}
//             <div className="lg:col-span-2">
//               <div className="relative">
//                 <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by location or property name"
//                   value={filters.location}
//                   onChange={(e) => handleFilterChange('location', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Property Type */}
//             <div>
//               <select
//                 value={filters.propertyType}
//                 onChange={(e) => handleFilterChange('propertyType', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">All Types</option>
//                 <option value="house">House</option>
//                 <option value="apartment">Apartment</option>
//                 <option value="condo">Condo</option>
//                 <option value="villa">Villa</option>
//               </select>
//             </div>

//             {/* Price Range */}
//             <div>
//               <select
//                 value={filters.priceRange}
//                 onChange={(e) => handleFilterChange('priceRange', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Any Price</option>
//                 <option value="0-500000">Under $500K</option>
//                 <option value="500000-1000000">$500K - $1M</option>
//                 <option value="1000000-2000000">$1M - $2M</option>
//                 <option value="2000000+">$2M+</option>
//               </select>
//             </div>

//             {/* Bedrooms */}
//             <div>
//               <select
//                 value={filters.bedrooms}
//                 onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Any Beds</option>
//                 <option value="1">1+ Bed</option>
//                 <option value="2">2+ Beds</option>
//                 <option value="3">3+ Beds</option>
//                 <option value="4">4+ Beds</option>
//               </select>
//             </div>

//             {/* Sort By */}
//             <div>
//               <select
//                 value={filters.sortBy}
//                 onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="bedrooms">Most Bedrooms</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Properties Grid */}
//       <section className="section-padding">
//         <div className="container mx-auto px-4">
//           {filteredProperties.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
//             </div>
//           ) : (
//             <div className={`grid gap-8 ${
//               viewMode === 'grid' 
//                 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
//                 : 'grid-cols-1'
//             }`}>
//               {filteredProperties.map((property) => (
//                 <PropertyCard 
//                   key={property.id} 
//                   property={property}
//                   isFavorite={favorites.includes(property.id)}
//                   onToggleFavorite={toggleFavorite}
//                   onShare={handleShare}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Load More */}
//           {filteredProperties.length > 0 && (
//             <div className="text-center mt-12">
//               <button className="btn-primary">
//                 Load More Properties
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//     </HomeLayout>
//   );
// };

// export default Properties;
