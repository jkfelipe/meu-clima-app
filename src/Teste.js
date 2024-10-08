//`https://api.openweathermap.org/data/2.5/weather?lang=pt_br&q=Getúlio Vargas,rs,br&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`);
import React  from 'react';
import Header from './Header';
import { SearchProvider } from './SearchContext';

export default function Teste() {

  return (
    <SearchProvider>
        <Header />
      </SearchProvider>
  );
}
