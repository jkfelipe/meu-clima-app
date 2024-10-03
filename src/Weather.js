//`https://api.openweathermap.org/data/2.5/weather?lang=pt_br&q=Getúlio Vargas,rs,br&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`);
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { SearchProvider } from './SearchContext';

function Weather() {
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lang=pt_br&q=Getúlio Vargas,rs,br&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect para chamar getWeather quando o componente é montado
  useEffect(() =>{
    getWeather();
  }, []); // O array vazio garante que isso aconteça apenas uma vez

  return (
    <div>
      <SearchProvider>
        <Header />
      </SearchProvider>      
      <h1>Weather (clima)</h1>
      {!weather && <p>Carregando...</p>}
      {weather && <div>
        <p>Temperatura: {weather.main.temp} °C</p>
        <p>Condição: {weather.weather[0].description}</p>
      </div>}
    </div>
  );
}

export default Weather;
