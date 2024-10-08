import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SearchContext from './SearchContext'; // Importe o context
import WindDirection from './WindDirection';

export default function ForecastTable() {
  const [forecast, setForecast] = useState(null);
  const {searchQuery} = useContext(SearchContext); // Use useContext para obter o valor do context
  const [localidade, setLocalidade] = useState(null); // Inicializa localidade com o texto
  
  //Pega o código do ícone e retorna o componente com o png
  const WeatherIcon = ({weatherCode}) => {
    // Suponha que 'weatherCode' seja um código de condição meteorológica fornecido pela API do OpenWeather
    const baseURL = 'http://openweathermap.org/img/wn/';
    const iconURL = `${baseURL}${weatherCode}.png`; // Concatenação dinâmica do código de condição meteorológica no URL base
  
    return (
      <img src={iconURL} className='weather-icon' alt="Weather Icon" />
    );
  };

  //Verifica se há alguma pesquisa previamente feita
  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setLocalidade(savedSearchQuery); // Atualiza a localidade com o valor salvo
    } else {
      setLocalidade("getúlio vargas,rs,brasil");
    }
  }, []);

  // useEffect para chamar getWeather quando searchQuery mudar
  useEffect(() => {
    if (searchQuery) {
      setLocalidade(searchQuery); // Atualiza localidade
      localStorage.setItem('searchQuery', searchQuery); // Salva no Local Storage
    } 
  }, [searchQuery]);

  useEffect(() => {
    if (localidade) {
      getForecast();
    }
  }, [localidade]); // Agora monitora mudanças no valor de 'localidade'
  
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
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&q=${localidade}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`);
      setForecast(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div>
      <h3>Forecast (previsão)</h3>
      {!forecast &&  
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>}
        {forecast && <div>
          <h1>Cidade: {forecast.city.name}, {forecast.city.country} </h1>
          <p>Latitude: {forecast.city.coord.lat} | Longitude: {forecast.city.coord.lon} </p>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Data</th>
                  <th>Ilustração</th>
                  <th>Temperatura</th>
                  <th>Sensação</th>
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
                    <td>{item.rain?.['3h'] || '0 mm'}</td>
                    <td>{item.snow?.['3h'] || '0 mm'}</td>
                    <td>{item.weather[0].description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>         
        </div>}
    </div>  
  );
}