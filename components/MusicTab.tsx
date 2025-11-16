
import React from 'react';
import type { MusicTrack } from '../types';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon } from './icons';

const nowPlaying: MusicTrack = {
  id: 1,
  title: 'Cybernetic Dreams',
  artist: 'Synthwave Rider',
  albumArt: 'https://picsum.photos/seed/music1/500/500',
  duration: '3:45',
};

const suggestedTracks: MusicTrack[] = [
  { id: 2, title: 'Neon Run', artist: 'Grid Runner', albumArt: 'https://picsum.photos/seed/music2/100/100', duration: '4:12' },
  { id: 3, title: 'Digital Sunset', artist: 'Data Drive', albumArt: 'https://picsum.photos/seed/music3/100/100', duration: '5:02' },
  { id: 4, title: 'Future Funk', artist: 'Chrome Cats', albumArt: 'https://picsum.photos/seed/music4/100/100', duration: '2:58' },
];

const MusicTab: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(true);

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Now Playing Section */}
      <div className="md:w-2/3 flex flex-col items-center justify-center bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <img src={nowPlaying.albumArt} alt="Album Art" className="w-48 h-48 md:w-64 md:h-64 rounded-lg shadow-2xl shadow-cyan-500/20 mb-6" />
        <h2 className="text-2xl font-bold">{nowPlaying.title}</h2>
        <p className="text-md text-gray-400 mb-4">{nowPlaying.artist}</p>
        
        <div className="w-full max-w-sm">
            <div className="h-1 bg-gray-700 rounded-full">
                <div className="w-2/3 h-1 bg-cyan-400 rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>2:30</span>
                <span>{nowPlaying.duration}</span>
            </div>
        </div>

        <div className="flex items-center space-x-6 mt-4">
          <button className="text-gray-400 hover:text-white transition-colors"><SkipBackIcon /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-cyan-500 text-black rounded-full p-4 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/30 transform hover:scale-110">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors"><SkipForwardIcon /></button>
        </div>
      </div>

      {/* Suggested Tracks Section */}
      <div className="md:w-1/3 bg-gray-800/50 p-6 rounded-lg border border-gray-700 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4 text-cyan-400">Up Next</h3>
        <ul className="space-y-3">
          {suggestedTracks.map((track) => (
            <li key={track.id} className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
              <img src={track.albumArt} alt={track.title} className="w-12 h-12 rounded" />
              <div className="flex-1">
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
              <span className="text-sm text-gray-500">{track.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicTab;
