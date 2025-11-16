
export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  albumArt: string;
  duration: string;
}

export interface SocialNotification {
  id: number;
  platform: 'discord' | 'slack' | 'email';
  serverOrChannel: string;
  author: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
}

export interface Project {
    id: string;
    name: string;
    status: 'on-track' | 'at-risk' | 'off-track';
    lastUpdate: string;
    progress: number;
}

export interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'blinds' | 'lock';
  state: boolean | number; // boolean for on/off, number for brightness/temp
}

export interface Room {
  id: string;
  name: string;
  icon: React.ReactNode;
  devices: Device[];
}
