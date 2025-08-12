import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Wire up Header mobile button (aria-label="Open Menu") to open the sidebar
  useEffect(() => {
    const btn = document.querySelector('header button[aria-label="Open Menu"]');
    if (!btn) return;
    const handler = () => setSidebarOpen(true);
    btn.addEventListener('click', handler);
    return () => btn.removeEventListener('click', handler);
  }, []);

  return (
    <div className=" bg-background">
      {/* Sidebar (drawer on mobile, fixed on lg) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Page content shifted for fixed sidebar on large screens */}
      <div className="lg:ml-64 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;


// import Header from './Header';
// import Footer from './Footer';

// const Layout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       <Header />
//       <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;