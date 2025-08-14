// src/components/FeaturedProperties.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaLock } from "react-icons/fa";

const API = "http://localhost:8080/api";

function formatCurrency(n) {
  if (n == null) return "0";
  try {
    return Number(n).toLocaleString("en-IN");
  } catch {
    return String(n);
  }
}

function toHmsFromDaysString(timeLeft) {
  const days = Number(String(timeLeft || "0d").replace("d", "")) || 0;
  const D = days.toString().padStart(2, "0");
  return `${D}D : 00H : 00M`;
}

const FeaturedProperties = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/properties`, { params: { limit: 4 } });
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        const mapped = list.map((p) => ({
          id: p.id,
          title: p.title || p.location || "—",
          image: p.img || p.images?.[0] || "",
          location: p.location || "—",
          investors: p.investors ?? 0,
          invested: formatCurrency(p.invested ?? 0),
          percent: Number(p.percent ?? 0),
          goal: formatCurrency(p.goalAmount ?? 0),
          returnRate: p.returnRate || "—",
          term: p.maxTerm || "—",
          type: p.type || "—",
          distribution: p.distribution || "Monthly",
          slug: p.slug,
          timeLeft: toHmsFromDaysString(p.timeLeft),
        }));
        if (mounted) setItems(mapped);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load properties");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    // remove side padding on mobile; keep md+ as-is
    <section className="featured__properties section__space bg-gray-50 py-10 px-0 md:px-12">
      <div className="container mx-auto px-0 sm:px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 px-4 md:px-0">
          <h2 className="text-4xl font-extrabold text-blue-900 leading-tight">
            Featured Properties
          </h2>
          <a
            href="/properties"
            className="inline-block px-6 py-3 bg-white shadow-lg rounded-lg text-[#4e0dff] hover:bg-[#4e0dff] hover:text-white font-semibold 
            hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
          >
            Browse All Properties
          </a>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="space-y-10">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="md:w-[40%] px-0 py-4 md:p-4">
                  <div className="w-full h-56 bg-gray-200 rounded-lg" />
                </div>
                <div className="md:w-[60%] px-0 py-4 md:p-4">
                  <div className="h-6 bg-gray-200 w-1/3 mb-3 rounded" />
                  <div className="h-4 bg-gray-200 w-1/2 mb-6 rounded" />
                  <div className="h-3 bg-gray-200 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-red-600 font-medium px-4 md:px-0">{error}</div>
        )}

        {/* Property Cards */}
        {!loading && !error && (
          <div className="space-y-10">
            {items.map((p) => (
              <article
                key={p.id || p.slug || p.title}
                // edge-to-edge on mobile; keep rounded on md+
                className="flex flex-col md:flex-row bg-white rounded-none md:rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition"
              >
                {/* Image */}
                <div className="group md:w-[40%] aspect-w-16 aspect-h-8 md:aspect-none px-0 py-4 md:p-4 rounded-none md:rounded-lg">
                  <img
                    src={
                      p.image ||
                      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                    }
                    alt={`Photo of property in ${p.title}`}
                    loading="lazy"
                    className="rounded-xl  w-full h-[350px] object-cover transition-transform duration-300 ease-out group-hover:scale-105 will-change-transform"
                  />
                </div>

                {/* Details */}
                <div className="md:w-[60%] px-4 md:px-6 py-4 md:py-6 flex flex-col md:pl-0">
                  {/* Title & Location */}
                  <header className="mt-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900">
                        {p.title}
                      </h3>
                      <p className="flex items-center text-gray-600 mt-2 text-sm md:text-base font-medium">
                        <FaMapMarkerAlt
                          className="mr-2 text-gray-500"
                          aria-hidden="true"
                        />
                        <span>{p.location}</span>
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="flex items-center text-gray-500 text-sm md:text-base font-medium">
                        <FaClock className="mr-2" aria-hidden="true" />
                        Left to invest
                      </p>
                      <p className="text-md md:text-lg font-bold text-[#5927e3] tracking-wider">
                        {p.timeLeft}
                      </p>
                    </div>
                  </header>

                  {/* Progress */}
                  <section className="mt-4">
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-3 bg-green-500 transition-[width] duration-1000 ease-in-out"
                        style={{ width: `${p.percent}%` }}
                        aria-valuenow={p.percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                        aria-label={`Investment progress: ${p.percent}%`}
                      />
                    </div>
                    <div className="flex flex-wrap justify-between items-center gap-2 mt-2 text-gray-700 text-sm md:text-base font-medium">
                      <span>
                        <strong>{p.investors}</strong> Investors |{" "}
                        <FaDollarSign className="inline-block" /> {p.invested} (
                        {p.percent.toFixed(1)}%)
                      </span>
                      <span>
                        <FaDollarSign className="inline-block" />{" "}
                        <strong>{p.goal}</strong> Goal
                      </span>
                    </div>
                  </section>

                  {/* Metrics */}
                  <section className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-y py-4 text-center text-gray-600">
                    <div>
                      <p className="text-sm font-semibold tracking-wide uppercase">
                        Annual Return
                      </p>
                      <p className="font-bold text-[#5927e3] mt-1">
                        {p.returnRate}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold tracking-wide uppercase md:border-l">
                        Maximum Term
                      </p>
                      <p className="font-bold text-[#5927e3] mt-1">{p.term}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-wide uppercase md:border-l">
                        Property Type
                      </p>
                      <p className="font-bold text-[#5927e3] mt-1">{p.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-wide uppercase md:border-l">
                        Distribution
                      </p>
                      <p className="font-bold text-[#5927e3] mt-1">
                        {p.distribution}
                      </p>
                    </div>
                  </section>

                  {/* Security & CTA */}
                  <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4">
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
                        <p className="font-semibold text-green-900">
                          1st-Rank Mortgage
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                      <a
                        href="/register"
                        className="flex-1 md:flex-none px-6 py-3 bg-[#5927e3] text-white rounded-xl font-semibold shadow-md text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                      >
                        Invest Now
                      </a>
                      <a
                        href={p.slug ? `/property/${p.slug}` : "/property-details"}
                        className="flex-1 md:flex-none px-6 py-3 bg-white shadow-md rounded-xl font-semibold text-gray-800 border border-gray-200 text-center hover:bg-[#5927e3] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                      >
                        Details
                      </a>
                    </div>
                  </section>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;


// // src/components/FeaturedProperties.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaMapMarkerAlt, FaClock, FaDollarSign, FaLock } from "react-icons/fa";

// const API =  "http://localhost:8080/api";

// function formatCurrency(n) {
//   if (n == null) return "0";
//   try {
//     // Indian-style grouping if you prefer: use 'en-IN'
//     return Number(n).toLocaleString('en-IN');
//   } catch {
//     return String(n);
//   }
// }

// function toHmsFromDaysString(timeLeft) {
//   // API gives "23d" or "0d". Keep your same format "00D : 00H : 00M"
//   const days = Number(String(timeLeft || "0d").replace("d", "")) || 0;
//   const D = days.toString().padStart(2, "0");
//   return `${D}D : 00H : 00M`;
// }

// const FeaturedProperties = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API}/properties`, { params: { limit: 4 } });
//         // The list endpoint returns { total, page, pages, data } in our latest version;
//         // but your sample shows a raw array. Handle both:
//         const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
//         // Map API => UI shape you already use
//         const mapped = list.map(p => ({
//           id:         p.id,
//           title:      p.title || p.location || "—",
//           image:      p.img || p.images?.[0] || "",
//           location:   p.location || "—",
//           investors:  p.investors ?? 0,
//           invested:   formatCurrency(p.invested ?? 0),
//           percent:    Number(p.percent ?? 0),
//           goal:       formatCurrency(p.goalAmount ?? 0),           // ← from backend if present
//           returnRate: p.returnRate || "—",
//           term:       p.maxTerm || "—",                           // ← if your list includes it
//           type:       p.type || "—",
//           distribution: p.distribution || "Monthly",              // safe default so layout stays same
//           slug:       p.slug,
//           timeLeft:   toHmsFromDaysString(p.timeLeft)             // turn "23d" → "23D : 00H : 00M"
//         }));
//         if (mounted) setItems(mapped);
//       } catch (e) {
//         if (mounted) setError(e?.message || "Failed to load properties");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   return (
//     <section className="featured__properties section__space bg-gray-50 py-10 p-12">
//       <div className="container mx-auto px-4 max-w-6xl ">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//           <h2 className="text-4xl font-extrabold text-blue-900 leading-tight">
//             Featured Properties
//           </h2>
//           <a
//             href="/properties"
//             className="inline-block px-6 py-3 bg-white shadow-lg rounded-lg text-blue-900 font-semibold 
//             hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
//           >
//             Browse All Properties
//           </a>
//         </div>

//         {/* Loading / Error */}
//         {loading && (
//           <div className="space-y-10">
//             {[...Array(2)].map((_, i) => (
//               <div key={i} className="animate-pulse flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden">
//                 <div className="md:w-[40%] p-4">
//                   <div className="w-full h-56 bg-gray-200 rounded-lg" />
//                 </div>
//                 <div className="md:w-[60%] p-4">
//                   <div className="h-6 bg-gray-200 w-1/3 mb-3 rounded" />
//                   <div className="h-4 bg-gray-200 w-1/2 mb-6 rounded" />
//                   <div className="h-3 bg-gray-200 w-full rounded" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {error && !loading && (
//           <div className="text-red-600 font-medium">{error}</div>
//         )}

//         {/* Property Cards */}
//         {!loading && !error && (
//           <div className="space-y-10">
//             {items.map((p) => (
//               <article
//                 key={p.id || p.slug || p.title}
//                 className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition"
//               >
//                 {/* Image */}
//                 <div className="md:w-[40%] aspect-w-16 aspect-h-8 md:aspect-none p-4 rounded-lg">
//                   <img
//                     src={p.image || 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'}
//                     alt={`Photo of property in ${p.title}`}
//                     className="w-[400px] h-[350px] object-cover rounded-lg"
//                     loading="lazy"
//                   />
//                 </div>

//                 {/* Details */}
//                 <div className="md:w-[60%] p-6 flex flex-col  pl-0">
//                   {/* Title & Location */}
//                   <header className="mt-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
//                     <div>
//                       <h3 className="text-3xl font-extrabold text-blue-900">{p.title}</h3>
//                       <p className="flex items-center text-gray-600 mt-2 text-sm md:text-base font-medium">
//                         <FaMapMarkerAlt className="mr-2 text-gray-500" aria-hidden="true" />
//                         <span>{p.location}</span>
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="flex items-center text-gray-500 text-sm md:text-base font-medium">
//                         <FaClock className="mr-2" aria-hidden="true" />
//                         Left to invest
//                       </p>
//                       <p className=" text-md md:text-lg font-bold text-[#5927e3] tracking-wider">
//                         {p.timeLeft}
//                       </p>
//                     </div>
//                   </header>

//                   {/* Progress */}
//                   <section className="mt-4 ">
//                     <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
//                       <div
//                         className="h-3 bg-green-500 transition-width duration-1000 ease-in-out"
//                         style={{ width: `${p.percent}%` }}
//                         aria-valuenow={p.percent}
//                         aria-valuemin={0}
//                         aria-valuemax={100}
//                         role="progressbar"
//                         aria-label={`Investment progress: ${p.percent}%`}
//                       />
//                     </div>
//                     <div className="flex justify-between items-center mt-2 text-gray-700 text-sm md:text-base font-medium">
//                       <span>
//                         <strong>{p.investors}</strong> Investors |{" "}
//                         <FaDollarSign className="inline-block" /> {p.invested} ({p.percent.toFixed(1)}%)
//                       </span>
//                       <span>
//                         <FaDollarSign className="inline-block" /> <strong>{p.goal}</strong> Goal
//                       </span>
//                     </div>
//                   </section>

//                   {/* Metrics */}
//                   <section className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4  border-y py-4 text-center text-gray-600">
//                     <div>
//                       <p className="text-sm font-semibold tracking-wide uppercase">Annual Return</p>
//                       <p className="font-bold text-[#5927e3] mt-1">{p.returnRate}</p>
//                     </div>
                   
//                     <div>
//                       <p className="text-sm font-semibold tracking-wide uppercase border-l">Maximum Term</p>
//                       <p className="font-bold text-[#5927e3] mt-1">{p.term}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold tracking-wide uppercase border-l">Property Type</p>
//                       <p className="font-bold text-[#5927e3] mt-1">{p.type}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold tracking-wide uppercase border-l">Distribution</p>
//                       <p className="font-bold text-[#5927e3] mt-1">{p.distribution}</p>
//                     </div>
//                   </section>

//                   {/* Security & CTA */}
//                   <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4">
//                     <div
//                       className="flex items-center bg-blue-50 p-4 rounded-xl w-full md:w-auto"
//                       aria-label="Security Guarantee"
//                       role="region"
//                     >
//                       <div className="p-3 bg-white rounded-full mr-4 flex-shrink-0">
//                         <FaLock className="text-green-600 text-2xl" aria-hidden="true" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 uppercase">Security</p>
//                         <p className="font-semibold text-green-900">1st-Rank Mortgage</p>
//                       </div>
//                     </div>

//                     <div className="flex gap-4 w-full md:w-auto">
//                       <a
//                         href="/register"
//                         className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
//                       >
//                         Invest Now
//                       </a>
//                       <a
//                         href={p.slug ? `/property/${p.slug}` : "/property-details"}
//                         className="flex-1 md:flex-none px-6 py-3 bg-white shadow-md rounded-xl font-semibold text-gray-800 border border-gray-200 text-center hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//                       >
//                         Details
//                       </a>
//                     </div>
//                   </section>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedProperties;



// // src/components/FeaturedProperties.jsx
// import React from "react";
// import { FaMapMarkerAlt, FaClock, FaDollarSign, FaLock } from "react-icons/fa";

// const featuredProps = [
//   {
//     title: "Los Angeles",
//     image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
//     location: "8706 Herrick Ave, Los Angeles",
//     investors: 119,
//     invested: "4,94,196",
//     percent: 54.73,
//     goal: "1,00,000",
//     returnRate: "7.5% + 3%",
//     term: "26 Months",
//     type: "Commercial",
//     distribution: "Monthly",
//   },
//   {
//     title: "San Francisco, CA",
//     image: "/assets/images/property/san.png",
//     location: "3335 21 St, San Francisco",
//     investors: 179,
//     invested: "1,64,296",
//     percent: 64.73,
//     goal: "5,00,000",
//     returnRate: "3.5% + 6%",
//     term: "48 Months",
//     type: "Commercial",
//     distribution: "Monthly",
//   },
// ];

// const FeaturedProperties = () => (
//   <section className="featured__properties section__space bg-gray-50 py-16 p-12">
//     <div className="container mx-auto px-4 max-w-7xl">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//         <h2 className="text-4xl font-extrabold text-blue-900 leading-tight">
//           Featured Properties
//         </h2>
//         <a
//           href="/properties"
//           className="inline-block px-6 py-3 bg-white shadow-lg rounded-lg text-blue-900 font-semibold 
//           hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
//         >
//           Browse All Properties
//         </a>
//       </div>

//       {/* Property Cards */}
//       <div className="space-y-10 ">
//         {featuredProps.map((p) => (
//           <article
//             key={p.title}
//             className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"
//           >
//             {/* Image */}
//             <div className="md:w-[40%] aspect-w-16 aspect-h-8 md:aspect-none  p-8 rounded-lg">
//               <img
//                 src={p.image}
//                 alt={`Photo of property in ${p.title}`}
//                 className="w-full h-full object-cover rounded-lg "
//                 loading="lazy"
//               />
//             </div>

//             {/* Details */}
//             <div className="md:w-[60%] p-8 flex flex-col justify-between">
//               {/* Title & Location */}
//               <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <div>
//                   <h3 className="text-3xl font-extrabold text-blue-900">{p.title}</h3>
//                   <p className="flex items-center text-gray-600 mt-2 text-sm md:text-base font-medium">
//                     <FaMapMarkerAlt className="mr-2 text-gray-500" aria-hidden="true" />
//                     <span>{p.location}</span>
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="flex items-center text-gray-500 text-sm md:text-base font-medium">
//                     <FaClock className="mr-2" aria-hidden="true" />
//                     Left to invest
//                   </p>
//                   <p className="mt-1 text-xl md:text-2xl font-bold text-[#5927e3] tracking-wider">
//                     00D : 00H : 00M
//                   </p>
//                 </div>
//               </header>

//               {/* Progress */}
//               <section className="mt-8">
//                 <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
//                   <div
//                     className="h-3 bg-green-500 transition-width duration-1000 ease-in-out"
//                     style={{ width: `${p.percent}%` }}
//                     aria-valuenow={p.percent}
//                     aria-valuemin={0}
//                     aria-valuemax={100}
//                     role="progressbar"
//                     aria-label={`Investment progress: ${p.percent}%`}
//                   />
//                 </div>
//                 <div className="flex justify-between items-center mt-3 text-gray-700 text-sm md:text-base font-medium">
//                   <span>
//                     <strong>{p.investors}</strong> Investors |{" "}
//                     <FaDollarSign className="inline-block" /> {p.invested} (
//                     {p.percent.toFixed(1)}%)
//                   </span>
//                   <span>
//                     <FaDollarSign className="inline-block" /> <strong>{p.goal}</strong> Goal
//                   </span>
//                 </div>
//               </section>

//               {/* Metrics */}
//               <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border-y py-6 text-center text-gray-700">
//                 <div>
//                   <p className="text-sm font-semibold tracking-wide uppercase">Annual Return</p>
//                   <p className="font-bold text-[#5927e3] mt-1">{p.returnRate}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold tracking-wide uppercase">Maximum Term</p>
//                   <p className="font-bold text-[#5927e3] mt-1">{p.term}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold tracking-wide uppercase">Property Type</p>
//                   <p className="font-bold text-[#5927e3] mt-1">{p.type}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold tracking-wide uppercase">Distribution</p>
//                   <p className="font-bold text-[#5927e3] mt-1">{p.distribution}</p>
//                 </div>
//               </section>

//               {/* Security & CTA */}
//               <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8">
//                 <div
//                   className="flex items-center bg-blue-50 p-4 rounded-xl w-full md:w-auto"
//                   aria-label="Security Guarantee"
//                   role="region"
//                 >
//                   <div className="p-3 bg-white rounded-full mr-4 flex-shrink-0">
//                     <FaLock className="text-green-600 text-2xl" aria-hidden="true" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase">Security</p>
//                     <p className="font-semibold text-green-900">1st-Rank Mortgage</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 w-full md:w-auto">
//                   <a
//                     href="/registration"
//                     className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
//                   >
//                     Invest Now
//                   </a>
//                   <a
//                     href="/property-details"
//                     className="flex-1 md:flex-none px-6 py-3 bg-white shadow-md rounded-xl font-semibold text-gray-800 border border-gray-200 text-center hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//                   >
//                     Details
//                   </a>
//                 </div>
//               </section>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default FeaturedProperties;
