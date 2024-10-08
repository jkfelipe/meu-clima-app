import React, { useEffect, useState, useContext } from 'react';
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
  const [latitude, setLatitude] = useState("-27.8878"); // Adiciona estado para latitude
  const [longitude, setLongitude] = useState("-52.2257"); // Adiciona estado para longitude
  const [cidade, setCidade] = useState(null);
  const [estado, setEstado] = useState(null);
  const [pais, setPais] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  //Verifica se há alguma pesquisa previamente feita
  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setLocalidade(savedSearchQuery); // Atualiza a localidade com o valor salvo
    }
  }, []);

  // useEffect para chamar getWeather quando searchQuery mudar
  useEffect(() => {
    if (searchQuery) {
      setLocalidade(searchQuery); // Atualiza localidade
      localStorage.setItem('searchQuery', searchQuery); // Salva no Local Storage
      getWeather();
    } else {
      getWeather();
    }
  }, [searchQuery]);

  // Função para obter os dados da API Weather
  const getWeather = async () => {
    try {
      const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lang=pt_br&q=${localidade}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      setWeather(response1.data);
      setLatitude(response1.data.coord.lat); // Atualiza latitude após obter dados do weather
      setLongitude(response1.data.coord.lon); // Atualiza longitude após obter dados do weather

      //Obtém o nome da cidade
      const response2 = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${response1.data.coord.lat}&lon=${response1.data.coord.lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      setCidade(response2.data[0].name);
      setPais(response2.data[0].country);
      setEstado(response2.data[0].state);
       
      // Obtém hora do nascer e por do sol
      const sunriseDate = new Date(response1.data.sys.sunrise * 1000);
      const sunsetDate = new Date(response1.data.sys.sunset * 1000);
      setSunrise(sunriseDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(", ")[1].trim());
      setSunset(sunsetDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(", ")[1].trim());

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
        <div className="container-fluid">
          <div className="row">

            {/* Primeira Coluna (ocupa metade da tela) */}
            <div className="col-12 col-md-6 d-flex flex-column bg-body-tertiary rounded-3 border p-3">
              <div className="container-fluid mt-3 text-md-start flex-grow-1 d-flex flex-column">
                <div className="feature-icon d-inline-flex align-items-center fs-2 mb-3">
                  <WeatherIcon weatherCode={weather.weather[0].icon} />
                </div>
                  <>
                    {console.log(cidade + ' ' + estado + ' ' + pais)}
                    <h1 className="display-5 fw-bold">{cidade}</h1>
                    <h3>{estado}, {pais}</h3>
                  </>
                <h5>Latitude {latitude}, Longitude {longitude}</h5>
                <br />
                <div className="col">
                  <h5>Condição climática:</h5>
                  <div className="d-flex justify-content-md-start">
                    <h1>
                      {weather.weather[0].description[0].toUpperCase() + 
                      weather.weather[0].description.substring(1)}
                    </h1>
                  </div>
                  <div className="d-flex">                    
                    {/*Precipitação chuv ou nece */}
                    {weather.snow ? (
                      <>
                        <h4>
                          <i className="bi bi-cloud-snow fs-4 me-2" title='Neve'></i> Volume de neve {weather.snow ? weather.snow['1h'] || 0 : 0} mm 
                        </h4>
                      </>
                    ) : (
                      <>
                        <h4>
                          <i className="bi bi-cloud-rain fs-4 me-2" title='Chuva'></i> Volume de chuva {weather.rain ? weather.rain['1h'] || 0 : 0} mm 
                        </h4>
                      </>
                    )}
                  </div>
                  <h5>
                    <i className="bi bi-cloud fs-4 me-2" title='Chuva'></i> Nebulosidade de {weather.clouds.all}% 
                  </h5>
                </div>
              </div>
            </div>

            <div className="d-block d-md-none my-3">
              <hr />
            </div>

            {/* Segunda Coluna (1/4 da tela) */}
            <div className="col-12 col-md-3 d-flex flex-column justify-content-center h-100">
              <div className="container-fluid text-center h-100 d-flex flex-column justify-content-around">

                {/* Primeira linha de colunas */}
                <div className="row align-items-stretch">
                  <div className="col-12 mb-3 p-3 border rounded-3 bg-body-tertiary d-flex flex-column justify-content-center">
                    <h5>Temperatura Atual</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-thermometer-half fs-2 me-2"></i>
                      <h4>{weather.main.temp}°C</h4>
                    </div>
                  </div>
                  <div className="col-12 mb-3 rounded-3 border p-3 bg-body-tertiary d-flex flex-column justify-content-center">
                    <h5>Umidade</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-droplet fs-4 me-2"></i>
                      <h4>{weather.main.humidity}%</h4>
                    </div>
                  </div>
                </div>

                {/* Segunda linha de colunas */}
                <div className="row align-items-stretch">
                  <div className="col-12 mb-3 rounded-3 border p-3 bg-body-tertiary d-flex flex-column justify-content-center">
                    <h5>Nascer do sol</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-sunrise fs-3 me-2"></i>
                      <h4>{sunrise}</h4>
                    </div>
                  </div>
                  <div className="col-12 mb-3 rounded-3 border p-3 bg-body-tertiary d-flex flex-column justify-content-center">
                    <h5>Pôr do sol</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-sunset fs-3 me-2"></i>
                      <h4>{sunset}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terceira Coluna (1/4 da tela) */}
            <div className="col-12 col-md-3 d-flex flex-column justify-content-center h-100">
              <div className="container-fluid text-center">

                {/* Primeira linha de colunas */}
                <div className="row align-items-stretch">

                  <div className="col-12 mb-3 rounded-3 border p-3 bg-body-tertiary d-flex flex-column justify-content-center">
                    <h5>Sensação Térmica</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-thermometer-sun fs-2 me-2"></i>
                      <h4>{weather.main.feels_like}°C</h4>
                    </div>
                  </div>

                  
                  <div className="col-12 mb-3 rounded-3 border p-3 bg-body-tertiary d-flex flex-column justify-content-center">
                    <h5>Pressão atmosférica</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-speedometer fs-4 me-2"></i>
                      <h4>{weather.main.pressure} hPa</h4>
                    </div>
                  </div>
                </div>

                {/* Segunda linha de colunas */}
                <div className="row align-items-stretch">
                  <div className="col-12 mb-3 rounded-3 border p-3 bg-body-tertiary d-flex flex-column justify-content-center">
                    <h5>Velocidade dos ventos</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-wind fs-3 me-2"></i>
                      <h4>{weather.wind.speed} m/s</h4>
                    </div>
                  </div>
                  <div className="col-12 mb-3 rounded-3 border p-3 bg-body-tertiary d-flex flex-column justify-content-center">
                    <h5>Direção dos ventos</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-flag fs-3 me-2"></i>
                      <h4><WindDirection degrees={weather.wind.deg} /></h4>
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