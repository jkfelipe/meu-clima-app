import React, { useState } from 'react';
import Header from './Header';
import WeatherCard from './WeatherCard';
import { SearchProvider } from './SearchContext';

function Home() {
  return (
    <SearchProvider>
      <Header />
      <WeatherCard />
    </SearchProvider>
  );
}

export default Home;
