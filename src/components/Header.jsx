import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BuildingOfficeIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  TableCellsIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Properties', href: '/properties', icon: BuildingOfficeIcon },
    { name: 'Dashboard', href: '/dashboard/user', icon: TableCellsIcon },
    { name: 'About', href: '/about', icon: InformationCircleIcon },
    { name: 'Privacy Policy', href: '/privacy-policy', icon: LockClosedIcon },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-10  flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              {/* <BuildingOfficeIcon className="w-6 h-6 text-white" /> */}
              <img src="/logo.png" alt="" className="" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-playfair text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                Own-A-Bit
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">Premium Real Estate</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-purple-600 shadow-sm'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/login"
              className="btn-outline text-sm py-2 px-4 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            {/* <Link
              to="/register"
              className="btn-primary text-sm py-2 px-4 bg-purple-600"
            >
              Get Started
            </Link> */}
            <Link
                to="/register"
                className="text-white text-sm py-4 px-5 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition duration-300"
                >
                Get Started
                </Link>

          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 mt-6 px-4 ">
              <Link
                to="/login"
                className="btn-outline text-sm py-2 px-4 w-full text-center hover:bg-blue-50 hover:text-blue-600 transition "
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary text-sm py-2 px-4 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const toggleMobile = () => setMobileOpen(!mobileOpen);

//   const navItems = [
//     { name: 'Home', to: '/', dropdown: true },
//     { name: 'Properties', to: '/properties', dropdown: true },
//     // { name: 'Loan', to: '/loan', dropdown: true },
//     { name: 'List your property', to: '/list-property', dropdown: false },
//     { name: 'About', to: '/about', dropdown: true },
//     { name: 'Contact', to: '/contact-us', dropdown: false }
//   ];

//   return (
//     <header className="bg-white shadow-md">
//       <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center ">
//           {/* <img src="/logo.png" alt="" className="h-10 w-auto mr-3 bg-gradient-to-br from-purple-300 to-indigo-600 rounded-xl" />
//           <span className="text-2xl font-bold text-[#0E1B3B] font-playfair">Own-A-Bit</span><tr/> */}
//           <img src="/logo.png" alt="" className="h-10 w-auto mr-3 bg-gradient-to-br from-purple-300 to-indigo-600 rounded-xl" />
//            <div>
            
//               <h1 className="text-2xl md:text-3xl font-bold font-playfair text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
//                 Own-A-Bid
//               </h1>
//               <p className="text-xs text-gray-500 font-medium tracking-wide">Premium Real Estate</p>
//             </div>
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden xl:flex items-center space-x-8">
//           {navItems.map((item) => (
//             <div key={item.name} className="relative group">
//               <Link
//                 to={item.to}
//                 className="text-[#0E1B3B] font-medium hover:text-purple-600 flex items-center"
//               >
//                 {item.name}
//                 {item.dropdown && <i className="fa-solid fa-chevron-down text-xs ml-1" />}
//               </Link>
//               {/* Dropdown placeholder */}
//               {item.dropdown && (
//                 <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
//                   {/* Populate dropdown links here */}
//                   <ul className="py-2">
//                     <li><Link to={item.to} className="block px-4 py-2 hover:bg-gray-100">Option 1</Link></li>
//                     <li><Link to={item.to} className="block px-4 py-2 hover:bg-gray-100">Option 2</Link></li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Desktop Actions */}
//         <div className="hidden xl:flex items-center space-x-4 z-10">
//           <Link to="/login" className="text-[#0E1B3B] font-medium hover:text-purple-600">
//             Log In
//           </Link>
//           <Link
//             to="/register"
//             className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
//           >
//             Join Now <i className="fa-solid fa-arrow-right-long ml-2" />
//           </Link>
//         </div>

//         {/* Mobile Toggle */}
//         <button onClick={toggleMobile} className="xl:hidden text-[#0E1B3B] text-xl focus:outline-none">
//           <i className="fa-solid fa-bars" />
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="xl:hidden bg-white shadow-inner">
//           <ul className="flex flex-col space-y-2 p-4">
//             {navItems.map((item) => (
//               <li key={item.name}>
//                 <Link to={item.to} className="block text-[#0E1B3B] font-medium py-2">
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//             <li className="border-t border-gray-200 mt-2 pt-2">
//               <Link to="/login" className="block text-[#0E1B3B] font-medium py-2">
//                 Log In
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/register"
//                 className="block bg-gradient-to-r from-purple-600 to-purple-400 text-white text-center font-medium py-2 rounded-lg mt-2"
//               >
//                 Join Now
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
