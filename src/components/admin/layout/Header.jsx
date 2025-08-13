import { Link, useLocation } from 'react-router-dom';
import { Building2, LayoutDashboard, Plus, List } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Properties', href: '/admin/properties', icon: List },
    { name: 'Add Property', href: '/admin/properties/create', icon: Plus },
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="rounded-lg p-2 bg-[#5927e3]">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-900">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#5927e3] ${
                    active
                      ? 'bg-[#5927e3] text-white'
                      : 'text-blue-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md bg-[#5927e3] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5927e3]"
              aria-label="Open Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#5927e3] ${
                  active
                    ? 'bg-[#5927e3] text-white'
                    : 'text-blue-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;

// import { Link, useLocation } from 'react-router-dom';
// import { Building2, LayoutDashboard, Plus, List } from 'lucide-react';

// const Header = () => {
//   const location = useLocation();

//   const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//     { name: 'Properties', href: '/admin/properties', icon: List },
//     { name: 'Add Property', href: '/admin/properties/create', icon: Plus },
//   ];

//   const isActive = (path) => {
//     if (path === '/admin' && location.pathname === '/admin') return true;
//     if (path !== '/admin' && location.pathname.startsWith(path)) return true;
//     return false;
//   };

//   return (
//     <header className="bg-gradient-header shadow-elevated sticky top-0 z-50">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/admin" className="flex items-center space-x-2">
//               <div className="rounded-lg p-2 bg-[#5927e3]">
//                 <Building2 className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-xl font-bold text-blue-900">
//                 PropertyAdmin
//               </span>
//             </Link>
//           </div>

//           {/* Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {navigation.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     isActive(item.href)
//                       ? 'bg-[#5927e3] text-white'
//                       : 'text-admin-nav-foreground hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button className="p-2 rounded-md bg-[#5927e3] text-white">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile navigation */}
//       <div className="md:hidden">
//         <div className="px-2 pt-2 pb-3 space-y-1 bg-admin-nav/95 backdrop-blur-sm">
//           {navigation.map((item) => {
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
//                   isActive(item.href)
//                     ? 'bg-[#5927e3] text-white'
//                     : 'text-admin-nav-foreground hover:bg-white/10 hover:text-white'
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 <span>{item.name}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import { Link, useLocation } from 'react-router-dom';
// import { Building2, LayoutDashboard, Plus, List } from 'lucide-react';

// const Header = () => {
//   const location = useLocation();

//   const navigation = [
//     { name: 'Dashboard', href: '/', icon: LayoutDashboard },
//     { name: 'Properties', href: '/properties', icon: List },
//     { name: 'Add Property', href: '/properties/create', icon: Plus },
//   ];

//   const isActive = (path) => {
//     if (path === '/' && location.pathname === '/') return true;
//     if (path !== '/' && location.pathname.startsWith(path)) return true;
//     return false;
//   };

//   return (
//     <header className="bg-gradient-header shadow-elevated sticky top-0 z-50">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-2">
//               <div className="bg-primary rounded-lg p-2">
//                 <Building2 className="h-6 w-6 text-primary-foreground" />
//               </div>
//               <span className="text-xl font-bold text-admin-nav-foreground">
//                 PropertyAdmin
//               </span>
//             </Link>
//           </div>

//           {/* Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {navigation.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     isActive(item.href)
//                       ? 'bg-primary text-primary-foreground'
//                       : 'text-admin-nav-foreground hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button className="text-admin-nav-foreground hover:text-white p-2">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile navigation */}
//       <div className="md:hidden">
//         <div className="px-2 pt-2 pb-3 space-y-1 bg-admin-nav/95 backdrop-blur-sm">
//           {navigation.map((item) => {
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
//                   isActive(item.href)
//                     ? 'bg-primary text-primary-foreground'
//                     : 'text-admin-nav-foreground hover:bg-white/10 hover:text-white'
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 <span>{item.name}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;