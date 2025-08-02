import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BellIcon, 
  UserCircleIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  BuildingOfficeIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const UserHeader = ({ onToggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();

  const notifications = [
    { id: 1, title: 'New property match found', time: '2 min ago', unread: true },
    { id: 2, title: 'Investment return credited', time: '1 hour ago', unread: true },
    { id: 3, title: 'Property viewing scheduled', time: '3 hours ago', unread: false },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side: Hamburger + Logo */}
          <div className="flex items-center space-x-3">
            <button onClick={onToggleSidebar} className="text-gray-600 lg:hidden">
              <Bars3Icon className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-10   flex items-center justify-center">
              <img src="/logo.png" alt="" className="" />
              </div>
              <span className="text-2xl font-bold text-gray-900 font-playfair">Own-A-Bit</span>
            </Link>
            {/* <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-10  flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                         
                          <img src="/logo.png" alt="" className="" />
                        </div>
                        <div>
                          <h1 className="text-2xl md:text-3xl font-bold font-playfair text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                            Own-A-Bit
                          </h1>
                          <p className="text-xs text-gray-500 font-medium tracking-wide">Premium Real Estate</p>
                        </div>
                      </Link> */}
          </div>

          {/* Right side: Notifications + Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {/* Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${n.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{n.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link to="/dashboard/account" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <UserCircleIcon className="w-4 h-4" />
                    <span>My Account</span>
                  </Link>
                  <Link to="/dashboard/account" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Cog6ToothIcon className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-2" />
                  <button className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;



// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   BellIcon, 
//   UserCircleIcon, 
//   Cog6ToothIcon,
//   ArrowRightOnRectangleIcon,
//   ChevronDownIcon,
//   BuildingOfficeIcon,
//   Bars3Icon
// } from '@heroicons/react/24/outline';

// const UserHeader = ({ onToggleSidebar }) => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const location = useLocation();

//   const notifications = [
//     { id: 1, title: 'New property match found', time: '2 min ago', unread: true },
//     { id: 2, title: 'Investment return credited', time: '1 hour ago', unread: true },
//     { id: 3, title: 'Property viewing scheduled', time: '3 hours ago', unread: false },
//   ];

//   const unreadCount = notifications.filter(n => n.unread).length;

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//         <button onClick={onToggleSidebar} className="lg:hidden text-gray-600">
//               <Bars3Icon className="w-6 h-6" />
//             </button>
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/dashboard" className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <BuildingOfficeIcon className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900">Own-A-Bit</span>
//             </Link>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center space-x-4">
//             {/* Notifications */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsNotificationOpen(!isNotificationOpen)}
//                 className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//               >
//                 <BellIcon className="w-6 h-6" />
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     {unreadCount}
//                   </span>
//                 )}
//               </button>

//               {/* Notifications Dropdown */}
//               {isNotificationOpen && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                   <div className="px-4 py-2 border-b border-gray-200">
//                     <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
//                   </div>
//                   <div className="max-h-64 overflow-y-auto">
//                     {notifications.map((notification) => (
//                       <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
//                         <div className="flex items-start space-x-3">
//                           <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
//                           <div className="flex-1">
//                             <p className="text-sm text-gray-900">{notification.title}</p>
//                             <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="px-4 py-2 border-t border-gray-200">
//                     <button className="text-sm text-blue-600 hover:text-blue-700">View all notifications</button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Profile Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center space-x-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//               >
//                 <img
//                   src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-medium text-gray-900">John Doe</p>
//                   <p className="text-xs text-gray-500">Premium Member</p>
//                 </div>
//                 <ChevronDownIcon className="w-4 h-4" />
//               </button>

//               {/* Profile Dropdown */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                   <Link
//                     to="/dashboard/account"
//                     className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                   >
//                     <UserCircleIcon className="w-4 h-4" />
//                     <span>My Account</span>
//                   </Link>
//                   <Link
//                     to="/dashboard/account"
//                     className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                   >
//                     <Cog6ToothIcon className="w-4 h-4" />
//                     <span>Settings</span>
//                   </Link>
//                   <hr className="my-2" />
//                   <button className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
//                     <ArrowRightOnRectangleIcon className="w-4 h-4" />
//                     <span>Sign Out</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default UserHeader;