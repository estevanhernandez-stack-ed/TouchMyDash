
import React, { useState } from 'react';
import { LightbulbIcon, ThermometerIcon, SofaIcon, BedIcon, KitchenIcon, OfficeIcon, DiskIcon as LockIcon } from './icons';
import type { Room, Device } from '../types';

// Placeholder data
const initialRooms: Room[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    icon: <SofaIcon />,
    devices: [
      { id: 'lr-light-1', name: 'Main Lights', type: 'light', state: 80 },
      { id: 'lr-thermo', name: 'Thermostat', type: 'thermostat', state: 22 },
    ],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    icon: <BedIcon />,
    devices: [
      { id: 'br-light-1', name: 'Bedside Lamp', type: 'light', state: 0 },
      { id: 'br-light-2', name: 'Ceiling Light', type: 'light', state: 100 },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: <KitchenIcon />,
    devices: [
      { id: 'kt-light-1', name: 'Overhead Lights', type: 'light', state: 100 },
    ],
  },
   {
    id: 'office',
    name: 'Office',
    icon: <OfficeIcon />,
    devices: [
      { id: 'of-light-1', name: 'Desk Lamp', type: 'light', state: 60 },
      { id: 'of-lock', name: 'Door Lock', type: 'lock', state: true },
    ],
  },
];

const DeviceControl: React.FC<{ device: Device; onStateChange: (deviceId: string, newState: boolean | number) => void }> = ({ device, onStateChange }) => {
  // FIX: Add type check to prevent comparing a boolean with a number.
  const isOn = device.type === 'light' ? typeof device.state === 'number' && device.state > 0 : device.state === true;

  const getIcon = () => {
    switch (device.type) {
      case 'light': return <LightbulbIcon className={`w-5 h-5 ${isOn ? 'text-yellow-300' : 'text-gray-500'}`} />;
      case 'thermostat': return <ThermometerIcon className="w-5 h-5 text-red-400" />;
      case 'lock': return <LockIcon className={`w-5 h-5 ${isOn ? 'text-green-400' : 'text-gray-500'}`} />;
      default: return null;
    }
  };

  const handleToggle = () => {
    if (device.type === 'light') {
        // FIX: Add type check to ensure device.state is a number before comparison.
        if (typeof device.state === 'number') {
            onStateChange(device.id, device.state > 0 ? 0 : 100);
        }
    } else if (device.type === 'lock') {
        if (typeof device.state === 'boolean') {
            onStateChange(device.id, !device.state);
        }
    }
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStateChange(device.id, parseInt(e.target.value, 10));
  };

  return (
    <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                {getIcon()}
                <span className="text-sm font-medium">{device.name}</span>
            </div>
            { (device.type === 'light' || device.type === 'lock') && (
                <button onClick={handleToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isOn ? 'bg-cyan-500' : 'bg-gray-600'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            )}
             { device.type === 'thermostat' && (
                <span className="text-sm font-bold">{device.state}°C</span>
            )}
        </div>
        {/* FIX: Add type check to ensure device.state is a number before comparison. */}
        { (device.type === 'light' && typeof device.state === 'number' && device.state > 0) && (
             <input
                type="range"
                min="0"
                max="100"
                value={device.state as number}
                onChange={handleSliderChange}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
        )}
         { device.type === 'thermostat' && (
             <input
                type="range"
                min="15"
                max="30"
                value={device.state as number}
                onChange={handleSliderChange}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-400"
            />
        )}
    </div>
  );
};

const RoomCard: React.FC<{ room: Room; onStateChange: (deviceId: string, newState: boolean | number) => void }> = ({ room, onStateChange }) => {
    return (
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
                <div className="text-cyan-400">{room.icon}</div>
                <h3 className="text-lg font-bold text-gray-200">{room.name}</h3>
            </div>
            <div className="space-y-4">
                {room.devices.map(device => (
                    <DeviceControl key={device.id} device={device} onStateChange={onStateChange} />
                ))}
            </div>
        </div>
    );
}

const SmartHomeTab: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);

    const handleDeviceStateChange = (deviceId: string, newState: boolean | number) => {
        setRooms(currentRooms => 
            currentRooms.map(room => ({
                ...room,
                devices: room.devices.map(device => 
                    device.id === deviceId ? { ...device, state: newState } : device
                )
            }))
        );
    };

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold font-orbitron mb-6 text-cyan-400">Smart Home Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pr-2">
                {rooms.map(room => (
                    <RoomCard key={room.id} room={room} onStateChange={handleDeviceStateChange} />
                ))}
            </div>
        </div>
    );
};

export default SmartHomeTab;
