
import React from 'react';
import type { SocialNotification } from '../types';
import { DiscordIcon } from './icons';

const notifications: SocialNotification[] = [
  { id: 1, platform: 'discord', serverOrChannel: '#dev-chat', author: 'CodeWizard', message: 'Just pushed the latest updates to the main branch. Let me know what you think!', timestamp: '2m ago', avatar: 'https://picsum.photos/seed/avatar1/40/40' },
  { id: 2, platform: 'discord', serverOrChannel: '#gaming-lounge', author: 'ShadowGamer', message: 'Anyone up for a match tonight? Planning to start around 9 PM EST.', timestamp: '15m ago', avatar: 'https://picsum.photos/seed/avatar2/40/40' },
  { id: 3, platform: 'discord', serverOrChannel: '#general', author: 'PixelPusher', message: 'Check out this awesome new design I am working on!', timestamp: '1h ago', avatar: 'https://picsum.photos/seed/avatar3/40/40' },
  { id: 4, platform: 'discord', serverOrChannel: '#dev-chat', author: 'SyntaxSorceress', message: '@CodeWizard Looks good, but I found a small bug in the authentication flow.', timestamp: '22m ago', avatar: 'https://picsum.photos/seed/avatar4/40/40' },
   { id: 5, platform: 'discord', serverOrChannel: '#random', author: 'MemeLord', message: 'You guys have to see this cat video lol', timestamp: '3h ago', avatar: 'https://picsum.photos/seed/avatar5/40/40' },
];

const SocialTab: React.FC = () => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-cyan-400 flex items-center"><DiscordIcon className="mr-2" /> Discord Feed</h2>
      <div className="flex-grow space-y-4 overflow-y-auto pr-2">
        {notifications.map(notif => (
          <div key={notif.id} className="bg-gray-900/70 p-4 rounded-lg flex space-x-4 border-l-4 border-cyan-500/50">
            <img src={notif.avatar} alt={notif.author} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-cyan-300">{notif.author}</span>
                <span className="text-xs text-gray-400">{notif.serverOrChannel}</span>
                <span className="text-xs text-gray-500">{notif.timestamp}</span>
              </div>
              <p className="text-gray-300 mt-1">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
       <div className="mt-4 flex">
        <input type="text" placeholder="Message #dev-chat" className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white" />
        <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-r-md transition-colors">Send</button>
      </div>
    </div>
  );
};

export default SocialTab;
