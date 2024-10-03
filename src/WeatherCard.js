import React, { useEffect, useState, useContext  } from 'react';
import axios from 'axios';
import SearchContext from './SearchContext'; // Importe o context
import WeatherIcon from './WeatherIcon';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [geocode, setReverseGeocode] = useState(null);
  const {searchQuery} = useContext(SearchContext); // Use useContext para obter o valor do context
  const [localidade, setLocalidade] = useState("getúlio vargas,rs,brasil"); // Inicializa localidade com o texto
  const [latitude, setLatitude] = useState('-27.8878'); // Adiciona estado para latitude
  const [longitude, setLongitude] = useState('-52.2257'); // Adiciona estado para longitude
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  // useEffect para chamar getWeather quando searchQuery mudar
  useEffect(() => {
    if (searchQuery) {
      setLocalidade(searchQuery); // Atualiza localidade
    }
  }, [searchQuery]);

  // Novo useEffect para chamar getWeather quando 'localidade' mudar
  useEffect(() => {
    if (localidade) {
      getWeather();
    }
  }, [localidade]); // Agora monitora mudanças no valor de 'localidade'

  // Chama getCityName sempre que latitude ou longitude forem atualizados
  useEffect(() => {
    if (latitude && longitude) {
      getCityName();
    }
  }, [latitude, longitude]); // Monitora as mudanças em latitude e longitude

  //Obter data e hora do Sunrise e Sunset
  const setSunriseSunset = () => {
    if (weather) {
      const sunriseDate = new Date(weather.sys.sunrise * 1000);
      const sunsetDate = new Date(weather.sys.sunset * 1000);
      setSunrise(sunriseDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
      setSunset(sunsetDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
    }
  }

  // Função para obter os dados da API Weather
  const getWeather = async () => {
    try {
      const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lang=pt_br&q=${localidade}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      setWeather(response1.data);
      setLatitude(response1.data.coord.lat); // Atualiza latitude após obter dados do weather
      setLongitude(response1.data.coord.lon); // Atualiza longitude após obter dados do weather
      setSunriseSunset();
    } catch (error) {
      console.error(error);
    }
  };

  const getCityName = async () => {
    try {
      const response2 = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      setReverseGeocode(response2.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!weather ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="p-5 mb-3 bg-body-tertiary rounded-3">
          <div className="row">
            {/* Primeira Coluna */}
            <div className="col-md-6">
              <div className="container-fluid py-5">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
                  <WeatherIcon weatherCode={weather.weather[0].icon} />
                </div>
  
                {geocode?.length > 0 && (
                  <>
                    <h1 className="display-5 fw-bold">{geocode[0].name}</h1>
                    <h3>
                      {geocode[0].state}, {geocode[0].country}
                    </h3>
                  </>
                )}
  
                <h5>
                  Latitude {weather.coord.lat}, Longitude {weather.coord.lon}
                </h5>
                <br/>
                <h5>Condição atual:</h5>
                <h1>
                  {weather.weather[0].description[0].toUpperCase() +
                    weather.weather[0].description.substring(1)}
                </h1>
              </div>
            </div>
  
            {/* Segunda Coluna */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="container-fluid text-center">
                <div className="row mb-4">
                  <div className="col">
                    <h2 className="mb-3">Temperatura Atual</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-thermometer-half fs-1 me-2"></i> {/* Ícone da temperatura */}
                      <h1>{weather.main.temp}°C</h1>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-6 mb-3">
                    <h5>Nascer do sol</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-sunrise fs-1 me-2"></i> {/* Ícone de temperatura máxima */}
                      <h4>{sunrise}</h4>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <h5>Pôr do sol</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-sunset fs-1 me-2"></i>
                      <h4>{sunset}</h4>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-12">
                    <h5>Sensação Térmica</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-wind fs-4 me-2"></i> {/* Ícone de sensação térmica */}
                      <h4>{weather.main.feels_like}°C</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );

}  