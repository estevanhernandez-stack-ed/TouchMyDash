
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CpuIcon, RamIcon, DiskIcon, GpuIcon } from './icons';
import type { SystemMetric, Project } from '../types';

const systemMetrics: SystemMetric[] = [
  { name: 'CPU', value: 34, unit: '%' },
  { name: 'GPU', value: 68, unit: '%' },
  { name: 'RAM', value: 58, unit: '%' },
  { name: 'Disk', value: 76, unit: '%' },
];

const projects: Project[] = [
    { id: 'proj-1', name: 'Nexus OS', status: 'on-track', lastUpdate: '2h ago', progress: 75 },
    { id: 'proj-2', name: 'Game Engine', status: 'at-risk', lastUpdate: '1d ago', progress: 40 },
    { id: 'proj-3', name: 'Portfolio Site', status: 'on-track', lastUpdate: '5m ago', progress: 95 },
];

const performanceData = [
  { name: '10s', usage: 30 },
  { name: '9s', usage: 25 },
  { name: '8s', usage: 45 },
  { name: '7s', usage: 40 },
  { name: '6s', usage: 60 },
  { name: '5s', usage: 55 },
  { name: '4s', usage: 70 },
  { name: '3s', usage: 65 },
  { name: '2s', usage: 80 },
  { name: 'Now', usage: 34 },
];

const MetricCard = ({ metric, icon }: { metric: SystemMetric; icon: React.ReactNode }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg flex items-center space-x-4 border border-gray-700 hover:border-cyan-500 transition-colors">
    <div className="text-cyan-400">{icon}</div>
    <div>
      <div className="text-sm text-gray-400">{metric.name} Usage</div>
      <div className="text-2xl font-bold">{metric.value}<span className="text-lg text-gray-400">{metric.unit}</span></div>
    </div>
  </div>
);

// Fix: Explicitly type ProjectStatus as a React.FC to correctly handle the `key` prop type.
const ProjectStatus: React.FC<{ project: Project }> = ({ project }) => {
    const statusColor = {
        'on-track': 'bg-green-500',
        'at-risk': 'bg-yellow-500',
        'off-track': 'bg-red-500',
    };
    return (
        <div className="bg-gray-800/50 p-4 rounded-lg mb-2 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{project.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full text-black ${statusColor[project.status]}`}>{project.status.replace('-', ' ')}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="text-right text-xs text-gray-400 mt-1">Last update: {project.lastUpdate}</div>
        </div>
    )
}


const DashboardTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard metric={systemMetrics[0]} icon={<CpuIcon />} />
                <MetricCard metric={systemMetrics[1]} icon={<GpuIcon />} />
                <MetricCard metric={systemMetrics[2]} icon={<RamIcon />} />
                <MetricCard metric={systemMetrics[3]} icon={<DiskIcon />} />
            </div>
             <div className="bg-gray-800/50 p-4 rounded-lg h-64 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-cyan-400">CPU Performance</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: -25 }}>
                         <defs>
                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                        <Area type="monotone" dataKey="usage" stroke="#06b6d4" fillOpacity={1} fill="url(#colorUsage)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="lg:col-span-1 bg-gray-800/50 p-4 rounded-lg border border-gray-700 overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Project Tracker</h3>
            <div>
                {projects.map(p => <ProjectStatus key={p.id} project={p} />)}
            </div>
        </div>
    </div>
  );
};

export default DashboardTab;
