import React, { useEffect, useState } from 'react';

export default function WindDirection({degrees}, {size}) {

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

}
