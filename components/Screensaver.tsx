
import React, { useState, useEffect } from 'react';
import { WeatherData } from '../types';
import { SunIcon, CloudIcon, RainIcon } from './icons';

const weatherData: WeatherData = {
  city: 'Neo-Kyoto',
  temperature: 28,
  condition: 'Clear Skies',
  icon: 'SUN',
};

const weatherIcons: { [key: string]: React.ReactNode } = {
  SUN: <SunIcon className="w-24 h-24 text-yellow-300" />,
  CLOUD: <CloudIcon className="w-24 h-24 text-gray-300" />,
  RAIN: <RainIcon className="w-24 h-24 text-blue-300" />,
};

export const Screensaver: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };
   const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer animate-fadeIn"
      onClick={onClick}
    >
      <div className="text-center">
        <div className="font-orbitron text-8xl md:text-9xl font-bold text-cyan-400" style={{ textShadow: '0 0 15px #06b6d4' }}>
          {formatTime(time)}
        </div>
         <div className="text-2xl md:text-3xl text-gray-300 mt-2">
            {formatDate(time)}
        </div>
      </div>
      <div className="absolute bottom-10 right-10 flex items-center space-x-4 text-white">
        {weatherIcons[weatherData.icon]}
        <div>
            <div className="text-5xl font-bold">{weatherData.temperature}°C</div>
            <div className="text-xl text-gray-400">{weatherData.condition}</div>
            <div className="text-xl text-gray-400">{weatherData.city}</div>
        </div>
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};
