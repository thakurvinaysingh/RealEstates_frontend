import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import HeroSection from '../components/home/HeroSection'; // Adjust path as needed
import SearchFilter from '../components/home/SearchFilter'; // Adjust path as needed
import FeaturedProperties from '../components/home/FeaturedProperties'; 
import ProfitOverview from '../components/home/ProfitOverview';
import InvestmentStats from '../components/home/InvestmentStats';
// import PropertySection from '../components/home/PropertySection';
import MarketSection from '../components/home/MarketSection';

const HomePage = () => {
  return (
    <HomeLayout>
    <div className=''>
      <HeroSection />
      <SearchFilter />
      <FeaturedProperties />
      <ProfitOverview />
      <InvestmentStats />
      {/* <PropertySection /> */}
     
      {/* other sections/components */}
      <MarketSection />
    </div>
    </HomeLayout>
  );
};

export default HomePage;
