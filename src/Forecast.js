import React, { useState } from 'react';
import Header from './Header';
import ForecastTable from './ForecastTable';
import { SearchProvider } from './SearchContext';

function Home() {
  return (
    <SearchProvider>
      <Header />
      <ForecastTable />
    </SearchProvider>
  );
}

export default Home;
