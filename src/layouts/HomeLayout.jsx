import React from 'react';
import Header from '../components/Header';

import Footer from '../components/Footer';

const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <Header />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 ">
            {children}
          </main>
          <Footer />
        </div>
      </div>
  );
};

export default HomeLayout;