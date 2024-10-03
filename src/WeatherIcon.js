//`https://api.openweathermap.org/data/2.5/weather?lang=pt_br&q=Getúlio Vargas,rs,br&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`);
import React, { useEffect, useState } from 'react';

export default function WeatherIcon({weatherCode}, {size}) {

    let iconURL, width, height;

    switch (weatherCode) {
      case "01d":
        iconURL = "./day-sunny.svg"
      break;
      case "01n":
        iconURL = "./moon-line.svg"
      break;
      case "02d":
        iconURL = "./day-cloudy.svg"
      break;
      case "02n":
        iconURL = "./night-cloudy.svg"
      break;
      case "03d":
        iconURL = "./cloud.svg"
      break;
      case "03n":
        iconURL = "./cloud.svg"
      break;
      case "04d":
        iconURL = "./cloudy.svg"
      break;
      case "04n":
        iconURL = "./cloudy.svg"
      break;
      case "09d":
        iconURL = "./cloud-rain.svg"
      break;
      case "09n":
        iconURL = "./cloud-rain.svg"
      break;
      case "10d":
        iconURL = "./day-cloud-rain.svg"
      break;
      case "10n":
        iconURL = "./night-cloud-rain.svg"
      break;
      case "11d":
        iconURL = "./cloud-rain-lightning.svg"
      break;
      case "11n":
        iconURL = "./cloud-rain-lightning.svg"
      break;
      case "13d":
        iconURL = "./cooling.svg"
      break;
      case "13n":
        iconURL = "./cooling.svg"
      break;
      case "50d":
        iconURL = "./cloud-fog.svg"
      break;
      case "50n":
        iconURL = "./cloud-fog.svg"
      break;
    }

    if (size){
      //se houver tamanho
    } else {
      width = '100px';
      height = '100px';
    }

    return (
      <img src={iconURL} className='weather-icon' width={width} alt='Weather Icon' />
    );

}
