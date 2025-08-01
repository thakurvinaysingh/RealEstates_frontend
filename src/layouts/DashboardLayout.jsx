import React, { useState } from 'react';
import UserHeader from '../components/UserHeader';
import UserSidebar from '../components/UserSidebar';
import UserFooter from '../components/UserFooter';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Pass toggle function to header */}
      <UserHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        <UserSidebar
          isOpen={sidebarOpen}
          onOpen={() => setSidebarOpen(true)}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">{children}</main>
          <UserFooter />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


// import React from 'react';
// import UserHeader from '../components/UserHeader';
// import UserSidebar from '../components/UserSidebar';
// import UserFooter from '../components/UserFooter';

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <UserHeader />
//       <div className="flex flex-1">
//         <UserSidebar />
//         <div className="flex-1 flex flex-col">
//           <main className="flex-1 p-6">
//             {children}
//           </main>
//           <UserFooter />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;