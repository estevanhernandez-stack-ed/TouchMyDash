
import React from 'react';
import type { WeatherData } from '../types';
import { SunIcon } from './icons';

const Weather: React.FC = () => {
  // Placeholder data. In a real app, this would come from a weather API.
  const weatherData: WeatherData = {
    city: 'Neo-Kyoto',
    temperature: 28,
    condition: 'Clear Skies',
    icon: 'SUN',
  };

  return (
    <div className="flex items-center space-x-3 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
      <SunIcon className="w-8 h-8 text-yellow-400" />
      <div>
        <p className="font-bold text-lg leading-tight">{weatherData.temperature}°C</p>
        <p className="text-xs text-gray-400 leading-tight">{weatherData.condition}</p>
        <p className="text-xs text-gray-400 leading-tight">{weatherData.city}</p>
      </div>
    </div>
  );
};

export default Weather;
