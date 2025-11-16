
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
