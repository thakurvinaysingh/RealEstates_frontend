// src/pages/PropertyDetails.jsx
import React, { useEffect, useMemo, useState } from 'react';
import HomeLayout from '../layouts/HomeLayout';
import { useParams, Link } from 'react-router-dom';
import {
  MapPinIcon, CalendarIcon, HeartIcon, ShareIcon,
  ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { getPropertyBySlug } from '../api/properties';
import BuyInvestment from '../components/BuyInvestment'

const fmtUSD = (n) =>
  (Number(n || 0)).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function PropertyDetails() {
  const { slug } = useParams();
  const [prop, setProp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { data } = await getPropertyBySlug(slug);
        if (mounted) setProp(data);
      } catch (e) {
        if (mounted) setErr(e?.message || 'Failed to load property');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  const images = useMemo(() => {
    const arr = prop?.images?.length ? prop.images : [];
    const gal = prop?.gallery?.length ? prop.gallery : [];
    const combined = [...arr, ...gal];
    return combined.length ? combined : ['https://via.placeholder.com/1200x800?text=No+Image'];
  }, [prop]);

  const pricePerSlot = useMemo(() => {
    if (!prop?.totalValue || !prop?.slotsCount) return null;
    return prop.totalValue / prop.slotsCount;
  }, [prop]);

  const nextImage = () =>
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: prop?.title, text: `Check out this property: ${prop?.title}`, url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <HomeLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property…</p>
          </div>
        </div>
      </HomeLayout>
    );
  }

  if (err || !prop) {
    return (
      <HomeLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{err || 'Not found'}</p>
            <Link to="/properties" className="btn-primary">Back to Properties</Link>
          </div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-[#5927e3] hover:text-blue-700">Home</Link>
              <span className="text-gray-400">/</span>
              <Link to="/properties" className="text-[#5927e3] hover:text-blue-700">Properties</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{prop.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="card overflow-hidden mb-8">
                <div className="relative">
                  <img
                    src={images[currentImageIndex]}
                    alt={prop.title}
                    className="w-full h-96 object-cover"
                  />

                  {/* Nav arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                      >
                        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                      >
                        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                      </button>
                    </>
                  )}

                  {/* Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                    >
                      {isFavorite ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                    >
                      <ShareIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="card p-8 mb-8 shadow-xl shadow-gray-700">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">{prop.title}</h1>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      <span>{prop.location}</span>
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    {prop.goalAmount != null && (
                      <div className="text-3xl font-bold text-[#5927e3]">
                        {fmtUSD(prop.goalAmount)} Goal
                      </div>
                    )}
                    {prop.createdAt && (
                      <div className="text-gray-500 flex items-center justify-end mt-1">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        Listed {new Date(prop.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <Stat label="Investors" value={prop.investorsCount ?? 0} />
                  <Stat label="Slots" value={`${prop.slotsSold ?? 0} / ${prop.slotsCount ?? 0}`} />
                  <Stat label="Raised" value={fmtUSD(prop.currentAmount ?? 0)} />
                  <Stat label="Term" value={prop.maxTerm || '—'} />
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'features', label: 'Features' },
                      { id: 'location', label: 'Location' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-[#5927e3]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === 'overview' && (
                    <div>
                      {prop.projectDescription && (
                        <>
                          <h3 className="text-xl font-semibold text-blue-900 mb-4 border-b border-gray-300 pb-1">Project Description</h3>
                          <p className="text-gray-600 leading-relaxed mb-6">{prop.projectDescription}</p>
                        </>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          {/* <h4 className="font-semibold text-blue-900 mb-3 text-lg ">Property Details</h4> */}
                          <h4 className="font-semibold text-blue-900 mb-3 text-lg border-b border-gray-300 pb-1">
                              Property Details
                            </h4>

                          <dl className="space-y-2 text-sm">
                            <Row k="Type" v={prop.propertyType} />
                            <Row k="Distribution" v={prop.distribution} />
                            <Row k="Annual Return" v={prop.annualReturn} />
                            <Row k="Security" v={prop.financialTerms?.security} />
                            <Row k="Start" v={prop.startDate ? new Date(prop.startDate).toLocaleDateString() : '—'} />
                            <Row k="End" v={prop.endDate ? new Date(prop.endDate).toLocaleDateString() : '—'} />
                          </dl>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-3 text-lg border-b border-gray-200 pb-1">Financials</h4>
                          <dl className="space-y-2 text-sm">
                            <Row k="Goal" v={fmtUSD(prop.goalAmount)} />
                            <Row k="Raised" v={fmtUSD(prop.currentAmount)} />
                            <Row k="Total Value" v={fmtUSD(prop.totalValue)} />
                            <Row k="Slots" v={`${prop.slotsCount ?? 0}`} />
                            <Row k="Price / Slot" v={pricePerSlot ? fmtUSD(pricePerSlot) : '—'} />
                          </dl>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4 border-b border-gray-200 pb-1">Reasons to Invest</h3>
                      {prop.reasonsToInvest?.length ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {prop.reasonsToInvest.map((feature, i) => (
                            <div key={i} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500">No features listed.</div>
                      )}

                      {/* Optional: show tiered returns if present */}
                      {prop.tieredReturn?.length ? (
                        <div className="mt-6">
                          <h4 className="font-semibold text-blue-900 mb-2 border-b border-gray-200 pb-1">Tiered Return</h4>
                          <ul className="list-disc ml-6 text-gray-700">
                            {prop.tieredReturn.map((t, i) => (
                              <li key={i}>{t.range}: {t.rate}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  )}

                  {activeTab === 'location' && (
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4 border-b border-gray-200 pb-1">Location & Map</h3>
                      {prop.mapEmbedUrl ? (
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            title="Map"
                         
                            src={prop.map || "https://www.google.com/maps"}
                            className="w-full h-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                          <span className="text-gray-500">Map not available</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Owner / Contact (render only if present) */}
              {prop.owner?.name && (
                <div className="card p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4 border-b pb-1">Owner Details</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={prop.owner.avatarUrl || 'https://via.placeholder.com/96x96?text=Owner'}
                      alt={prop.owner.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-blue-900">{prop.owner.name}</h4>
                      {prop.owner.bio && <p className="text-sm text-gray-600">{prop.owner.bio}</p>}
                    </div>
                  </div>
                  {prop.reports?.length ? (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-900 mb-2">Reports</h4>
                      {prop.reports.map((r, i) => (
                        <a key={i} href={r.url} target="_blank" rel="noreferrer" className="block text-[#5927e3] underline">
                          {r.label || r.title}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}

              {/* Investment Summary (replaces mortgage calc) */}
              <BuyInvestment property={prop} pricePerSlot={pricePerSlot} />

              {/* <div className="bg-white rounded-xl shadow-lg shadow-gray-300/50 p-6 border border-gray-100 hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-semibold text-blue-900 mb-4 border-b border-gray-200 pb-2">
                  Investment Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <Row k="Goal" v={fmtUSD(prop.goalAmount)} />
                  <Row k="Raised" v={fmtUSD(prop.currentAmount)} />
                  <Row k="Annual Return" v={prop.annualReturn || '—'} />
                  <Row k="Distribution" v={prop.distribution || '—'} />
                  <Row k="Term" v={prop.maxTerm || '—'} />
                  <Row k="Security" v={prop.financialTerms?.security || '—'} />
                  <Row k="Price / Slot" v={pricePerSlot ? fmtUSD(pricePerSlot) : '—'} />
                </div>

                <Link
                  to={`/property/${prop.slug}#invest`}
                  className="w-full mt-5 inline-flex justify-center items-center py-3 px-5 text-white font-medium rounded-lg shadow-md transition duration-300 hover:scale-105"
                  style={{ backgroundColor: '#5927e3' }}
                >
                  Invest Now
                </Link>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center p-4 bg-gray-50 rounded-xl">
      <div className="text-[#5927e3] text-sm">{label}</div>
      <div className="font-semibold text-blue-900 mt-1">{value ?? '—'}</div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{k}:</span>
      <span className="font-medium text-blue-900">{v ?? '—'}</span>
    </div>
  );
}



// import React, { useState } from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import { mockProperties } from '../data/mockData';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   MapPinIcon, 
//   CalendarIcon, 
//   ArrowTrendingUpIcon,
//   LockClosedIcon,
//   DocumentIcon,
//   ShareIcon,
//   HeartIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon
// } from '@heroicons/react/24/outline';
// import { motion, AnimatePresence } from 'framer-motion';
// import clsx from 'clsx';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const { user, wallet, connectWallet } = useAuth();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [investmentAmount, setInvestmentAmount] = useState(500);
//   const [selectedCurrency, setSelectedCurrency] = useState('USDT');
//   const [showInvestModal, setShowInvestModal] = useState(false);

//   const property = mockProperties.find(p => p.id === id);

//   if (!property) {
//     return <Navigate to="/properties" replace />;
//   }

//   const progressPercentage = (property.soldTokens / property.totalTokens) * 100;
//   const tokensForAmount = Math.floor(investmentAmount / property.tokenPrice);
//   const currencies = ['USDT', 'USDC', 'ETH', 'BNB', 'MATIC'];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => 
//       prev === property.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => 
//       prev === 0 ? property.images.length - 1 : prev - 1
//     );
//   };

//   const handleInvest = () => {
//     if (!wallet.connected) {
//       connectWallet();
//       return;
//     }

//     if (user?.kycStatus !== 'approved') {
//       alert('Please complete KYC verification before investing');
//       return;
//     }

//     setShowInvestModal(true);
//   };

//   const confirmInvestment = () => {
//     alert(`Investment of $${investmentAmount} (${tokensForAmount} tokens) confirmed!`);
//     setShowInvestModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           onClick={() => window.history.back()}
//           className="flex items-center text-gray-600 hover:text-blue-900 mb-6 transition-colors"
//         >
//           <ChevronLeftIcon className="w-5 h-5 mr-2" />
//           Back to Properties 
//         </motion.button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="relative mb-8"
//             >
//               <div className="relative h-96 rounded-xl overflow-hidden">
//                 <img
//                   src={property.images[currentImageIndex]}
//                   alt={property.title}
//                   className="w-full h-full object-cover"
//                 />
//                 {property.images.length > 1 && (
//                   <>
//                     <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all">
//                       <ChevronLeftIcon className="w-5 h-5" />
//                     </button>
//                     <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all">
//                       <ChevronRightIcon className="w-5 h-5" />
//                     </button>
//                   </>
//                 )}

//                 {property.images.length > 1 && (
//                   <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                     {property.images.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentImageIndex(index)}
//                         className={clsx(
//                           'w-2 h-2 rounded-full transition-all',
//                           index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
//                         )}
//                       />
//                     ))}
//                   </div>
//                 )}

//                 <div className="absolute top-4 right-4 flex space-x-2">
//                   <button className="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-lg hover:bg-opacity-100 transition-all">
//                     <HeartIcon className="w-5 h-5 text-gray-600" />
//                   </button>
//                   <button className="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-lg hover:bg-opacity-100 transition-all">
//                     <ShareIcon className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h1 className="text-3xl font-bold text-blue-900">
//                   {property.title}
//                 </h1>
//                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                   {property.status}
//                 </span>
//               </div>

//               <div className="flex items-center text-gray-600 mb-6">
//                 <MapPinIcon className="w-5 h-5 mr-2" />
//                 <span className="text-lg">{property.location}</span>
//               </div>

//               <p className="text-gray-700 text-lg leading-relaxed mb-8">
//                 {property.description}
//               </p>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Property Type</p>
//                   <p className="font-semibold text-blue-900 capitalize">
//                     {property.propertyType}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Year Built</p>
//                   <p className="font-semibold text-blue-900">
//                     {property.yearBuilt}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Square Feet</p>
//                   <p className="font-semibold text-blue-900">
//                     {property.sqft.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center">
//                   <LockClosedIcon className="w-4 h-4 text-gray-500 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Lock Period</p>
//                     <p className="font-semibold text-blue-900">
//                       {property.lockPeriod} months
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-blue-900 mb-4">
//                   Legal Documents
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {property.legalDocs.map((doc, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
//                     >
//                       <DocumentIcon className="w-5 h-5 text-[#5927e3] mr-3" />
//                       <span className="text-blue-900 font-medium">{doc}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;


// import React, { useState } from 'react';
// import HomeLayout from '../layouts/HomeLayout';
// import { useParams, Link } from 'react-router-dom';
// import { 
//   MapPinIcon, 
//   HomeIcon, 
//   CurrencyDollarIcon, 
//   CalendarIcon,
//   HeartIcon,
//   ShareIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   StarIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon
// } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   // Mock property data - replace with API call
//   const property = {
//     id: id,
//     title: "Luxury Modern Villa with Ocean View",
//     location: "Beverly Hills, CA 90210",
//     price: 2850000,
//     bedrooms: 5,
//     bathrooms: 4,
//     area: 4500,
//     yearBuilt: 2020,
//     status: "For Sale",
//     featured: true,
//     description: "This stunning modern villa offers breathtaking ocean views and luxury living at its finest. Located in the prestigious Beverly Hills area, this property features contemporary architecture, premium finishes, and resort-style amenities. The open-concept design seamlessly blends indoor and outdoor living spaces, perfect for entertaining and relaxation.",
//     features: [
//       "Ocean View",
//       "Swimming Pool",
//       "Garage Parking",
//       "Garden",
//       "Balcony",
//       "Modern Kitchen",
//       "Walk-in Closet",
//       "Fireplace",
//       "Air Conditioning",
//       "Security System",
//       "Hardwood Floors",
//       "High Ceilings"
//     ],
//     images: [
//       "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     agent: {
//       name: "Sarah Johnson",
//       title: "Senior Real Estate Agent",
//       phone: "+1 (555) 123-4567",
//       email: "sarah.johnson@propertyhub.com",
//       image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
//       rating: 4.9,
//       reviews: 127,
//       experience: "8 years"
//     },
//     listedDate: "2024-01-10",
//     propertyType: "Villa",
//     lotSize: "0.5 acres"
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => 
//       prev === property.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => 
//       prev === 0 ? property.images.length - 1 : prev - 1
//     );
//   };

//   const handleShare = () => {
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

//   return (
//     <HomeLayout>
//     <div className="min-h-screen bg-gradient-to-br from-purple-100">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4 py-4">
//           <nav className="flex items-center space-x-2 text-sm">
//             <Link to="/" className="text-[#5927e3] hover:text-blue-700">Home</Link>
//             <span className="text-gray-400">/</span>
//             <Link to="/properties" className="text-[#5927e3] hover:text-blue-700">Properties</Link>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-600">{property.title}</span>
//           </nav>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {/* Image Gallery */}
//             <div className="card overflow-hidden mb-8">
//               <div className="relative">
//                 <img
//                   src={property.images[currentImageIndex]}
//                   alt={property.title}
//                   className="w-full h-96 object-cover"
//                 />
                
//                 {/* Navigation Arrows */}
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
//                 >
//                   <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
//                 >
//                   <ChevronRightIcon className="w-5 h-5 text-gray-600" />
//                 </button>

//                 {/* Image Counter */}
//                 <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
//                   {currentImageIndex + 1} / {property.images.length}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="absolute top-4 right-4 flex space-x-2">
//                   <button
//                     onClick={() => setIsFavorite(!isFavorite)}
//                     className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
//                   >
//                     {isFavorite ? (
//                       <HeartSolidIcon className="w-5 h-5 text-red-500" />
//                     ) : (
//                       <HeartIcon className="w-5 h-5 text-gray-600" />
//                     )}
//                   </button>
//                   <button
//                     onClick={handleShare}
//                     className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
//                   >
//                     <ShareIcon className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* Thumbnail Gallery */}
//               <div className="p-4">
//                 <div className="flex space-x-2 overflow-x-auto">
//                   {property.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
//                         index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
//                       }`}
//                     >
//                       <img
//                         src={image}
//                         alt={`View ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Property Info */}
//             <div className="card p-8 mb-8">
//               {/* Header */}
//               <div className="flex flex-col md:flex-row justify-between items-start mb-6">
//                 <div>
//                   <div className="flex items-center space-x-3 mb-2">
//                     <span className="badge badge-success">{property.status}</span>
//                     {property.featured && (
//                       <span className="badge badge-warning">Featured</span>
//                     )}
//                   </div>
//                   <h1 className="text-3xl font-bold text-blue-900 mb-2">{property.title}</h1>
//                   <div className="flex items-center text-gray-600">
//                     <MapPinIcon className="w-5 h-5 mr-2" />
//                     <span>{property.location}</span>
//                   </div>
//                 </div>
//                 <div className="text-right mt-4 md:mt-0">
//                   <div className="text-3xl font-bold text-[#5927e3]">{formatPrice(property.price)}</div>
//                   <div className="text-gray-500">Listed {new Date(property.listedDate).toLocaleDateString()}</div>
//                 </div>
//               </div>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//                 <div className="text-center p-4 bg-gray-50 rounded-xl">
//                   <HomeIcon className="w-8 h-8 text-[#5927e3] mx-auto mb-2" />
//                   <div className="font-semibold text-blue-900">{property.bedrooms}</div>
//                   <div className="text-sm text-gray-600">Bedrooms</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 rounded-xl">
//                   <svg className="w-8 h-8 text-[#5927e3] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
//                   </svg>
//                   <div className="font-semibold text-blue-900">{property.bathrooms}</div>
//                   <div className="text-sm text-gray-600">Bathrooms</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 rounded-xl">
//                   <svg className="w-8 h-8 text-[#5927e3] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2M4 8v8a2 2 0 002 2h2m0-16v16m8-16h2a2 2 0 012 2v2m-4-4v16m4-16v8a2 2 0 01-2 2h-2" />
//                   </svg>
//                   <div className="font-semibold text-blue-900">{property.area.toLocaleString()}</div>
//                   <div className="text-sm text-gray-600">Sq Ft</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 rounded-xl">
//                   <CalendarIcon className="w-8 h-8 text-[#5927e3] mx-auto mb-2" />
//                   <div className="font-semibold text-blue-900">{property.yearBuilt}</div>
//                   <div className="text-sm text-gray-600">Year Built</div>
//                 </div>
//               </div>

//               {/* Tabs */}
//               <div className="border-b border-gray-200 mb-6">
//                 <nav className="flex space-x-8">
//                   {[
//                     { id: 'overview', label: 'Overview' },
//                     { id: 'features', label: 'Features' },
//                     { id: 'location', label: 'Location' }
//                   ].map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
//                         activeTab === tab.id
//                           ? 'border-blue-500 text-[#5927e3]'
//                           : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                       }`}
//                     >
//                       {tab.label}
//                     </button>
//                   ))}
//                 </nav>
//               </div>

//               {/* Tab Content */}
//               <div>
//                 {activeTab === 'overview' && (
//                   <div>
//                     <h3 className="text-xl font-semibold text-blue-900 mb-4">Property Description</h3>
//                     <p className="text-gray-600 leading-relaxed mb-6">{property.description}</p>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <h4 className="font-semibold text-blue-900 mb-3">Property Details</h4>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Property Type:</span>
//                             <span className="font-medium">{property.propertyType}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Lot Size:</span>
//                             <span className="font-medium">{property.lotSize}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Year Built:</span>
//                             <span className="font-medium">{property.yearBuilt}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Status:</span>
//                             <span className="font-medium">{property.status}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-blue-900 mb-3">Financial Details</h4>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Price:</span>
//                             <span className="font-medium">{formatPrice(property.price)}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Price per Sq Ft:</span>
//                             <span className="font-medium">{formatPrice(Math.round(property.price / property.area))}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Property Tax:</span>
//                             <span className="font-medium">$28,500/year</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">HOA Fees:</span>
//                             <span className="font-medium">$450/month</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'features' && (
//                   <div>
//                     <h3 className="text-xl font-semibold text-blue-900 mb-4">Property Features</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       {property.features.map((feature, index) => (
//                         <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
//                           <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                           <span className="text-gray-700">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'location' && (
//                   <div>
//                     <h3 className="text-xl font-semibold text-blue-900 mb-4">Location & Neighborhood</h3>
//                     <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
//                       <span className="text-gray-500">Interactive Map Coming Soon</span>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <h4 className="font-semibold text-blue-900 mb-3">Nearby Schools</h4>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Beverly Hills Elementary</span>
//                             <span className="font-medium">0.5 miles</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Beverly Hills High School</span>
//                             <span className="font-medium">1.2 miles</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-blue-900 mb-3">Transportation</h4>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">LAX Airport</span>
//                             <span className="font-medium">25 minutes</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Metro Station</span>
//                             <span className="font-medium">0.8 miles</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             {/* Agent Card */}
//             <div className="card p-6 mb-6">
//               <h3 className="text-xl font-semibold text-blue-900 mb-4">Contact Agent</h3>
              
//               <div className="flex items-center space-x-4 mb-6">
//                 <img
//                   src={property.agent.image}
//                   alt={property.agent.name}
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-blue-900">{property.agent.name}</h4>
//                   <p className="text-sm text-gray-600">{property.agent.title}</p>
//                   <div className="flex items-center mt-1">
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <StarIcon
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < Math.floor(property.agent.rating)
//                               ? 'text-yellow-400 fill-current'
//                               : 'text-gray-300'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600 ml-2">
//                       {property.agent.rating} ({property.agent.reviews} reviews)
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3 mb-6">
//                 <a
//                   href={`tel:${property.agent.phone}`}
//                   className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-300"
//                 >
//                   <PhoneIcon className="w-5 h-5 text-[#5927e3]" />
//                   <span className="font-medium">{property.agent.phone}</span>
//                 </a>
//                 <a
//                   href={`mailto:${property.agent.email}`}
//                   className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-300"
//                 >
//                   <EnvelopeIcon className="w-5 h-5 text-[#5927e3]" />
//                   <span className="font-medium">{property.agent.email}</span>
//                 </a>
//               </div>

//               <button className="w-full btn-primary mb-3">
//                 Schedule a Tour
//               </button>
//               <button className="w-full btn-outline">
//                 Request Information
//               </button>
//             </div>

//             {/* Mortgage Calculator */}
//             <div className="card p-6">
//               <h3 className="text-xl font-semibold text-blue-900 mb-4">Mortgage Calculator</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Home Price
//                   </label>
//                   <input
//                     type="text"
//                     value={formatPrice(property.price)}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Down Payment (20%)
//                   </label>
//                   <input
//                     type="text"
//                     value={formatPrice(property.price * 0.2)}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Interest Rate
//                   </label>
//                   <input
//                     type="text"
//                     value="6.5%"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Loan Term
//                   </label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
//                     <option>30 years</option>
//                     <option>15 years</option>
//                     <option>20 years</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Estimated Monthly Payment:</span>
//                   <span className="text-xl font-bold text-[#5927e3]">$12,450</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </HomeLayout>
//   );
// };

// export default PropertyDetails;


