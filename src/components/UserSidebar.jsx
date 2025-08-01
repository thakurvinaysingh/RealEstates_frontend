import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  CreditCardIcon,
  BanknotesIcon,
  UserCircleIcon,
  HeartIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const headerIcons = [HomeIcon, BanknotesIcon, UserCircleIcon];

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "My Properties", href: "/dashboard/properties", icon: DocumentTextIcon },
  { name: "Investments", href: "/dashboard/investment", icon: ChartBarIcon },
  { name: "Transactions", href: "/dashboard/transaction", icon: CreditCardIcon },
  { name: "Withdraw", href: "/dashboard/withdraw", icon: BanknotesIcon },
  { name: "Favorites", href: "/dashboard/favorites", icon: HeartIcon },
  { name: "Account", href: "/dashboard/account", icon: UserCircleIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon }
];

const UserSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed z-50 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex-shrink-0`}
    >
      <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
        {/* Header with 3 icons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {headerIcons.map((Icon, idx) => (
            <div
              key={idx}
              className="bg-blue-50 text-blue-600 rounded-full p-2 shadow"
            >
              <Icon className="h-6 w-6" />
            </div>
          ))}
        </div>

        {/* Close Button for mobile */}
        <div className="flex justify-end px-4 lg:hidden mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={handleNavClick}
              >
                <Icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    isActive(item.href)
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Portfolio Section */}
        <div className="px-2 mt-auto mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
            <h3 className="text-xs font-medium">Portfolio Value</h3>
            <p className="text-2xl font-bold mt-1">$2,450,000</p>
            <p className="text-xs text-blue-100 mt-1">+12.5% this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;




// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   HomeIcon,
//   ChartBarIcon,
//   CreditCardIcon,
//   BanknotesIcon,
//   UserCircleIcon,
//   HeartIcon,
//   DocumentTextIcon,
//   Cog6ToothIcon
// } from '@heroicons/react/24/outline';

// const UserSidebar = () => {
//   const location = useLocation();

//   const navigation = [
//     { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
//     { name: 'My Properties', href: '/dashboard/properties', icon: DocumentTextIcon },
//     { name: 'Investments', href: '/dashboard/investment', icon: ChartBarIcon },
//     { name: 'Transactions', href: '/dashboard/transaction', icon: CreditCardIcon },
//     { name: 'Withdraw', href: '/dashboard/withdraw', icon: BanknotesIcon },
//     { name: 'Favorites', href: '/dashboard/favorites', icon: HeartIcon },
//     { name: 'Account', href: '/dashboard/account', icon: UserCircleIcon },
//     { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="hidden lg:flex lg:flex-shrink-0">
//       <div className="flex flex-col w-64">
//         <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
//           <div className="flex-grow flex flex-col">
//             <nav className="flex-1 px-2 space-y-1">
//               {navigation.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
//                       isActive(item.href)
//                         ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
//                         : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                     }`}
//                   >
//                     <Icon
//                       className={`mr-3 flex-shrink-0 h-6 w-6 ${
//                         isActive(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
//                       }`}
//                     />
//                     {item.name}
//                   </Link>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* User Stats Card */}
//           <div className="flex-shrink-0 px-2">
//             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
//               <h3 className="text-sm font-medium">Portfolio Value</h3>
//               <p className="text-2xl font-bold mt-1">$2,450,000</p>
//               <p className="text-xs text-blue-100 mt-1">+12.5% this month</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSidebar;