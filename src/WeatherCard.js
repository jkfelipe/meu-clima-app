import React, { useEffect, useState, useContext  } from 'react';
import axios from 'axios';
import SearchContext from './SearchContext'; // Importe o context
import WeatherIcon from './WeatherIcon';
import WindDirection from './WindDirection';
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

  // Função para obter os dados da API Weather
  const getWeather = async () => {
    try {
      const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lang=pt_br&q=${localidade}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      setWeather(response1.data);
      setLatitude(response1.data.coord.lat); // Atualiza latitude após obter dados do weather
      setLongitude(response1.data.coord.lon); // Atualiza longitude após obter dados do weather

      // Obtém hora do nascer e por do sol
      const sunriseDate = new Date(response1.data.sys.sunrise * 1000);
      const sunsetDate = new Date(response1.data.sys.sunset * 1000);
      setSunrise(sunriseDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(", ")[1].trim());
      setSunset(sunsetDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(", ")[1].trim());

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
        <div className="p-5 bg-body-tertiary">
          <div className="row">

            {/* Primeira Coluna */}
            <div className="col-md-6 bg-body-tertiary rounded-3 mx-auto border p-3">
              <div className="container-fluid py-5 text-center text-md-start">
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

                <br />

                <div className="col">
                  <h5>Condição climática</h5>
                  <div className="d-flex justify-content-center justify-content-md-start align-items-center">
                    {/* justify-content-md-start alinha à esquerda em telas grandes */}
                    <h1>
                      {weather.weather[0].description[0].toUpperCase() +
                        weather.weather[0].description.substring(1)}
                    </h1>
                  </div>
                </div>
                
              </div>
            </div>
 
            <div className="d-block d-md-none my-3">
              <hr />
            </div>

            {/* Segunda Coluna */}
            <div className="col-md-6 mt-2 d-flex align-items-center justify-content-center">
              <div className="container-fluid text-center">

                <div className="row">

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Temperatura Atual</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-thermometer-half fs-2 me-2"></i>
                      <h1>{weather.main.temp}°C</h1>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Sensação Térmica</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-thermometer-sun fs-2 me-2"></i>
                      <h1>{weather.main.feels_like}°C</h1>
                    </div>
                  </div>

                </div>

                <div className="row">

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Nascer do sol</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-sunrise fs-2 me-2"></i>
                      <h4>{sunrise}</h4>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Pôr do sol</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-sunset fs-2 me-2"></i>
                      <h4>{sunset}</h4>
                    </div>
                  </div>

                </div>

                <div className="row">

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Umidade</h5>
                    <div className="d-flex justify-content-center align-items-center">
                    <i className="bi bi-droplet fs-4 me-2"></i>
                      <h4>{weather.main.humidity}%</h4>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Pressão atmosférica</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-speedometer fs-3 me-2"></i>
                      <h4>{weather.main.pressure} hPa</h4>
                    </div>
                  </div>

                </div>

                <div className="row">

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Velocidade dos ventos</h5>
                    <div className="d-flex justify-content-center align-items-center">
                    <i className="bi bi-wind fs-4 me-2"></i>
                    <h4>{weather.wind.speed} m/s </h4>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Direção dos ventos</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-flag fs-4 me-2"></i>
                      <h4><WindDirection degrees={weather.wind.deg} /></h4>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                  
                    <h5>Precipitação</h5>
                    <div className="d-flex justify-content-center align-items-center">
                    
                      {/*Precipitação chuv ou nece */}
                      {weather.snow ? (
                        <>
                          <i className="bi bi-cloud-snow fs-4 me-2" title='Neve'></i>
                          <h4>{weather.snow ? weather.snow['1h'] || 0 : 0} mm </h4>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-cloud-rain fs-4 me-2" title='Chuva'></i>
                          <h4>{weather.rain ? weather.rain['1h'] || 0 : 0} mm </h4>
                        </>
                      )}

                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-3 rounded-3 border p-3">
                    <h5>Nebulosidade</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-cloud fs-4 me-2"></i>
                      <h4>{weather.clouds.all}% </h4>
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