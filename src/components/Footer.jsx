import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Top Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <img src="/logo.png" alt="Own-A-Bit" className="h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition font-playfair">
                    Own-A-Bit
                  </h3>
                  <p className="text-sm text-gray-400">Premium Real Estate</p>
                </div>
              </Link>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Your trusted partner in finding the perfect property. We
                specialize in luxury homes, commercial spaces, and investment
                opportunities with personalized service and expert guidance.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPinIcon className="w-5 h-5 text-blue-400" />
                  <span>123 Real Estate Ave, Property City, PC 12345</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <PhoneIcon className="w-5 h-5 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                  <span>info@ownabit.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {['Home', 'Properties', 'About Us', 'Contact'].map((label) => (
                  <li key={label}>
                    <Link
                      to={`/${label.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full" />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                {[
                  'Residential Sales',
                  'Commercial Leasing',
                  'Property Management',
                  'Investment Consulting',
                  'Market Analysis',
                ].map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-400 rounded-full" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social + Newsletter */}
        <div className="border-t border-gray-800 pt-10 pb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Socials */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-gray-300 font-medium">Follow Us:</span>
              <div className="flex gap-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                  >
                    <Icon className="text-white w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-gray-300 font-medium">Newsletter:</span>
              <div className="flex w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full sm:w-64 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-r-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 Own-A-Bit. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/disclaimer" className="hover:text-blue-400">Terms of Service</Link>
            
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BuildingOfficeIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4">
//         <div className="py-16">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//             {/* Company Info */}
//             <div className="lg:col-span-2">
//               <Link to="/" className="flex items-center space-x-3 mb-6 group">
//                 <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
//                 <img src="/logo.png" alt="" className="h-8 w-auto mr-2" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold font-playfair text-white group-hover:text-blue-400 transition-colors duration-300">
//                     Own-A-Bit
//                   </h3>
//                   <p className="text-sm text-gray-400 font-medium">Premium Real Estate</p>
//                 </div>
//               </Link>
//               <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
//                 Your trusted partner in finding the perfect property. We specialize in luxury homes, 
//                 commercial spaces, and investment opportunities with personalized service and expert guidance.
//               </p>
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3 text-gray-300">
//                   <MapPinIcon className="w-5 h-5 text-blue-400" />
//                   <span>123 Real Estate Ave, Property City, PC 12345</span>
//                 </div>
//                 <div className="flex items-center space-x-3 text-gray-300">
//                   <PhoneIcon className="w-5 h-5 text-blue-400" />
//                   <span>+1 (555) 123-4567</span>
//                 </div>
//                 <div className="flex items-center space-x-3 text-gray-300">
//                   <EnvelopeIcon className="w-5 h-5 text-blue-400" />
//                   <span>info@ownabit.com</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Links */}
//             <div>
//               <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
//               <ul className="space-y-3">
//                 <li>
//                   <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
//                     <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                     <span>Home</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/properties" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
//                     <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                     <span>Properties</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
//                     <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                     <span>About Us</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
//                     <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                     <span>Contact</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
            
//             {/* Services */}
//             <div>
//               <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
//               <ul className="space-y-3 text-gray-300">
//                 <li className="flex items-center space-x-2">
//                   <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                   <span>Residential Sales</span>
//                 </li>
//                 <li className="flex items-center space-x-2">
//                   <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                   <span>Commercial Leasing</span>
//                 </li>
//                 <li className="flex items-center space-x-2">
//                   <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                   <span>Property Management</span>
//                 </li>
//                 <li className="flex items-center space-x-2">
//                   <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                   <span>Investment Consulting</span>
//                 </li>
//                 <li className="flex items-center space-x-2">
//                   <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                   <span>Market Analysis</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
        
//         {/* Social Media & Newsletter */}
//         <div className="border-t border-gray-800 py-8">
//           <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
//             <div className="flex items-center space-x-6">
//               <span className="text-gray-300 font-medium">Follow Us:</span>
//               <div className="flex space-x-4">
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
//                   <FaFacebookF className="w-4 h-4 text-white" />
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
//                   <FaTwitter className="w-4 h-4 text-white" />
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
//                   <FaInstagram className="w-4 h-4 text-white" />
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
//                   <FaLinkedinIn className="w-4 h-4 text-white" />
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
//                   <FaYoutube className="w-4 h-4 text-white" />
//                 </a>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <span className="text-gray-300 font-medium">Newsletter:</span>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
//                 />
//                 <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-r-lg transition-all duration-300">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 py-6">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-gray-400 text-sm">
//               &copy; 2025 Own-A-Bit. All rights reserved.
//             </p>
//             <div className="flex items-center space-x-6 text-sm text-gray-400">
//               <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors duration-300">
//                 Privacy Policy
//               </Link>
//               <Link to="/disclaimer" className="hover:text-blue-400 transition-colors duration-300">
//                 Terms of Service
//               </Link>
//               <span>|</span>
//               <span>Made with ❤️ for Property Seekers</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
