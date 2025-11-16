

import React, { useState } from 'react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import DashboardTab from './components/DashboardTab';
import MusicTab from './components/MusicTab';
import SocialTab from './components/SocialTab';
import SmartHomeTab from './components/SmartHomeTab';
import ControlPanel from './components/ControlPanel';
import { DashboardIcon, MusicIcon, SocialIcon, ScreensaverIcon, SettingsIcon, SmartHomeIcon } from './components/icons';
import { Screensaver } from './components/Screensaver';

type Tab = 'dashboard' | 'music' | 'social' | 'smarthome';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('smarthome');
  const [isScreensaverActive, setScreensaverActive] = useState(false);
  const [isControlPanelOpen, setControlPanelOpen] = useState(false);

  // Fix: Use React.useRef to hold the timeout ID to persist it across re-renders.
  // This also resolves the NodeJS type error as we can use the return type of browser's setTimeout.
  // Fix: Correctly type the ref to allow for an undefined initial value.
  // FIX: Explicitly pass `undefined` to `useRef` to address "Expected 1 arguments, but got 0" error.
  const timeoutIdRef = React.useRef<number | undefined>(undefined);

  const resetScreensaverTimer = React.useCallback(() => {
    if (timeoutIdRef.current) {
      // FIX: Use window.clearTimeout to avoid ambiguity with Node.js's clearTimeout type definitions.
      window.clearTimeout(timeoutIdRef.current);
    }
    if(isScreensaverActive) {
      setScreensaverActive(false);
    }
    timeoutIdRef.current = window.setTimeout(() => setScreensaverActive(true), 300000); // 5 minutes
  }, [isScreensaverActive]);

  React.useEffect(() => {
    document.addEventListener('mousemove', resetScreensaverTimer);
    document.addEventListener('mousedown', resetScreensaverTimer);
    document.addEventListener('keypress', resetScreensaverTimer);
    document.addEventListener('touchstart', resetScreensaverTimer);
    resetScreensaverTimer();

    return () => {
      if (timeoutIdRef.current) {
        // FIX: Use window.clearTimeout to avoid ambiguity with Node.js's clearTimeout type definitions.
        window.clearTimeout(timeoutIdRef.current);
      }
      document.removeEventListener('mousemove', resetScreensaverTimer);
      document.removeEventListener('mousedown', resetScreensaverTimer);
      document.removeEventListener('keypress', resetScreensaverTimer);
      document.removeEventListener('touchstart', resetScreensaverTimer);
    };
  }, [resetScreensaverTimer]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'music':
        return <MusicTab />;
      case 'social':
        return <SocialTab />;
      case 'smarthome':
        return <SmartHomeTab />;
      default:
        return <SmartHomeTab />;
    }
  };

  const NavButton = ({ tabName, icon }: { tabName: Tab; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 ${
        activeTab === tabName ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {icon}
      <span className="mt-1 text-xs capitalize">{tabName === 'smarthome' ? 'Smart Home' : tabName}</span>
    </button>
  );

  if (isScreensaverActive) {
    return <Screensaver onClick={() => setScreensaverActive(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h1 className="text-3xl font-orbitron text-cyan-400 animate-pulse">NEXUS</h1>
          <p className="text-sm text-gray-400">Personal Command Center</p>
        </div>
        <div className="flex-1 flex justify-end">
          <Weather />
        </div>
      </header>

      <main className="flex-grow flex flex-col bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-2xl shadow-cyan-500/10 overflow-hidden">
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
          {renderTabContent()}
        </div>

        <nav className="flex bg-gray-900 border-t border-gray-700/50 mt-auto">
          <NavButton tabName="smarthome" icon={<SmartHomeIcon />} />
          <NavButton tabName="dashboard" icon={<DashboardIcon />} />
          <NavButton tabName="music" icon={<MusicIcon />} />
          <NavButton tabName="social" icon={<SocialIcon />} />
           <button
              onClick={() => setControlPanelOpen(true)}
              className="flex-1 flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 text-gray-400 hover:bg-gray-700/50 hover:text-white"
            >
              <SettingsIcon />
              <span className="mt-1 text-xs capitalize">Controls</span>
            </button>
           <button
              onClick={() => setScreensaverActive(true)}
              className="flex-1 flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 text-gray-400 hover:bg-gray-700/50 hover:text-white"
            >
              <ScreensaverIcon />
              <span className="mt-1 text-xs capitalize">Screensaver</span>
            </button>
        </nav>
      </main>

       <footer className="mt-4 text-center">
        <Clock />
      </footer>
      <ControlPanel isOpen={isControlPanelOpen} onClose={() => setControlPanelOpen(false)} />
    </div>
  );
};

export default App;