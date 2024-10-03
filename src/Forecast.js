import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchProvider } from './SearchContext';
import Header from './Header';

function Forecast() {
  const [forecast, setForecast] = useState(null);
  
  //Pega o código do ícone e retorna o componente com o png
  const WeatherIcon = ({weatherCode}) => {
    // Suponha que 'weatherCode' seja um código de condição meteorológica fornecido pela API do OpenWeather
    const baseURL = 'http://openweathermap.org/img/wn/';
    const iconURL = `${baseURL}${weatherCode}.png`; // Concatenação dinâmica do código de condição meteorológica no URL base
  
    return (
      <img src={iconURL} className='weather-icon' alt="Weather Icon" />
    );
  };
  
  //Calcula a direção do vento
  const WindDirection = ({degrees}) => {
    let direction = '';

    switch (true){
      case (degrees >= 0 && degrees <= 11.25):
        direction = 'Norte';
        break;
      case (degrees >= 11.26 && degrees <= 33.75):
        direction = 'Norte-Nordeste';
        break;
      case (degrees >= 33.76 && degrees <= 56.25):
        direction = 'Nordeste';
        break;
      case (degrees >= 56.26 && degrees <= 78.75):
        direction = 'Leste-Nordeste';
        break;
      case (degrees >= 78.76 && degrees <= 101.25):
        direction = 'Leste';
        break;
      case (degrees >= 101.26 && degrees <= 123.75):
        direction = 'Leste-Sudeste';
        break;
      case (degrees >= 123.76 && degrees <= 146.25):
        direction = 'Sudeste';
        break;
      case (degrees >= 146.26 && degrees <= 168.75):
        direction = 'Sul-Sudeste';
        break;
      case (degrees >= 168.76 && degrees <= 191.25):
        direction = 'Sul';
        break;
      case (degrees >= 191.26 && degrees <= 213.75):
        direction = 'Sul-Sudoeste';
        break; 
      case (degrees >= 213.76 && degrees <= 236.25):
        direction = 'Sudoeste';
        break;
      case (degrees >= 236.26 && degrees <= 258.75):
        direction = 'Oeste-Sudoeste';
        break;
      case (degrees >= 258.76 && degrees <= 281.25):
        direction = 'Oeste';
        break;
      case (degrees >= 281.26 && degrees <= 303.75):
        direction = 'Oeste-Noroeste';
        break;
      case (degrees >= 303.76 && degrees <= 326.25):
        direction = 'Noroeste';
        break;
      case (degrees >= 326.26 && degrees <= 348.75):
        direction = 'Norte-Noroeste';
        break;
      default:
        direction = 'Norte';
    }
    return direction;
  };

  //Calcula a visibilidade
  const Visibility = ({visibility}) => { 
    let visibilidade = '';
      if(visibility < 1000){
        visibilidade = visibility + ' m';
      } else {
        visibilidade = visibility/1000 + ' km';
      }
    return visibilidade;
  };

  const getForecast = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&q=Getúlio Vargas,rs,br&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`);
      setForecast(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getForecast();
  }, []);

  return(
    <div>
      <SearchProvider>
        <Header />
      </SearchProvider>
      <h1>Forecast (previsão)</h1>
      {!forecast && <p>Carregando...</p>}
        {forecast && <div>
          <p>Cidade: {forecast.city.name}, {forecast.city.country} </p>
          <p>Latitude: {forecast.city.coord.lat} | Longitude: {forecast.city.coord.lon} </p>
          <table border="1 solid #000">
            <thead>
              <tr>
                <th>Indice</th>
                <th>Data</th>
                <th>Ilustração</th>
                <th>Temperatura</th>
                <th>Sesnsação</th>
                <th>Pressão</th>
                <th>Umidade</th>
                <th>Ventos</th>
                <th>Rajadas</th>
                <th>Direção do vento</th>
                <th>Nebulosidade</th>
                <th>Visibilidade</th>
                <th title="Probabilidade de Precipitação">PoP</th>
                <th>Volume de chuva</th>
                <th>Volume de neve</th>
                <th>Condição</th>
              </tr>
            </thead>
            <tbody>
              {forecast.list.map((item, index) => (              
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.dt_txt}</td>
                  <td><WeatherIcon weatherCode={item.weather[0].icon} /></td>
                  <td>{item.main.temp} °C</td>
                  <td>{item.main.feels_like} °C</td>
                  <td>{item.main.grnd_level} hPa</td>
                  <td>{item.main.humidity} %</td>
                  <td>{item.wind.speed} m/sec</td>
                  <td>{item.wind.gust} m/sec</td>
                  <td><WindDirection degrees={item.wind.deg} /></td>
                  <td>{item.clouds.all} %</td>
                  <td><Visibility visibility={item.visibility} /></td>
                  <td>{item.pop * 100}%</td>
                  <td> {item.rain && item.rain['3h'] ? `${item.rain['3h']} mm` : '0 mm'}</td>
                  <td> {item.snow && item.snow['3h'] ? `${item.snow['3h']} mm` : '0 mm'}</td>
                  <td>{item.weather[0].description}</td> 
                </tr>
              ))}
            </tbody>
          </table>          
        </div>}
    </div>
  );
}

export default Forecast;