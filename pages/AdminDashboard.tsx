
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, income: 2400 },
  { name: 'Feb', sales: 3000, income: 1398 },
  { name: 'Mar', sales: 2000, income: 9800 },
  { name: 'Apr', sales: 2780, income: 3908 },
  { name: 'May', sales: 1890, income: 4800 },
  { name: 'Jun', sales: 2390, income: 3800 },
];

const COLORS = ['#ea580c', '#16a34a', '#2563eb', '#9333ea'];

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Artisans Onboarded', value: '1,240', change: '+12% this month' },
    { label: 'Pending Verifications', value: '43', change: '8 new today' },
    { label: 'Orders Managed', value: '₹4.2L', change: 'Total value' },
    { label: 'Villages Covered', value: '86', change: 'Across 4 districts' }
  ];

  const recentApprovals = [
    { id: 1, name: 'Lakshmi Bai', craft: 'Dhokra Art', region: 'Kondagaon', status: 'Pending Review' },
    { id: 2, name: 'Jharkhand SHG', craft: 'Sohrai Art', region: 'Hazaribagh', status: 'Image Quality Low' },
    { id: 3, name: 'Muni', craft: 'Bamboo Lamp', region: 'Wayanad', status: 'Ready for Live' }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Team Operations Hub</h1>
            <p className="text-gray-500">Managing the journey from rural studio to global doorstep.</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-200 px-6 py-2 rounded-xl font-bold shadow-sm">Export Report</button>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-orange-600/20">New Campaign</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-green-600 font-bold">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-8">Sales & Impact Growth</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                  <Tooltip 
                    cursor={{fill: '#fef3c7'}} 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="sales" radius={[10, 10, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Task Management */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Artisan Approvals</h3>
            <div className="space-y-6">
              {recentApprovals.map(artisan => (
                <div key={artisan.id} className="flex items-center justify-between group">
                  <div>
                    <p className="font-bold text-gray-900">{artisan.name}</p>
                    <p className="text-xs text-gray-500">{artisan.craft} • {artisan.region}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${
                      artisan.status.includes('Ready') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {artisan.status}
                    </span>
                    <button className="block text-xs text-blue-600 font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Review Profile</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 border-2 border-dashed border-gray-200 text-gray-400 py-3 rounded-2xl font-bold hover:border-orange-300 hover:text-orange-600 transition-all">
              View All 124 Applications
            </button>
          </div>
        </div>

        {/* Logistics Intermediary Highlight */}
        <div className="mt-12 bg-gray-900 rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">Quality & Logistics Sync</h2>
            <p className="text-gray-400 text-lg">Every product undergoes a 4-step quality check at our regional hubs before reaching the buyer. Fair payments are released to artisans within 24 hours of hub arrival.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 p-4 rounded-2xl text-center">
              <p className="text-2xl font-bold">14</p>
              <p className="text-[10px] uppercase font-black text-gray-400">Hubs Active</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl text-center">
              <p className="text-2xl font-bold">99%</p>
              <p className="text-[10px] uppercase font-black text-gray-400">On-time Pay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
