
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('artisan_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!profile) return null;

  const orders = [
    { id: '#SB-1024', item: profile.productName || 'Handmade Craft', status: 'In Packaging', amount: `₹${profile.productPrice || '0'}`, date: 'Just now' },
    { id: '#SB-1022', item: 'Previous Work', status: 'Shipped', amount: '₹3,500', date: 'Yesterday' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Header */}
      <div className="bg-orange-600 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-40 h-40 rounded-[40px] overflow-hidden border-4 border-white/20 shadow-2xl bg-white">
            <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-5xl font-black mb-3 tracking-tight">{profile.name || 'Artisan Studio'}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold flex items-center">
                📍 {profile.location}
              </span>
              <span className="bg-orange-500/50 px-4 py-1 rounded-full text-sm font-bold flex items-center">
                📞 {profile.phone}
              </span>
              <span className="bg-green-500/50 px-4 py-1 rounded-full text-sm font-bold">
                ✓ Verified
              </span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 text-center md:text-right">
            <p className="text-orange-200 text-xs uppercase tracking-widest font-black mb-1">Your Total Earnings</p>
            <p className="text-5xl font-black">₹14,500</p>
            <p className="text-xs text-orange-200/60 mt-2 font-medium">Updated 5 mins ago</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: AI Portfolio */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-gray-900">Digital Studio</h2>
              <span className="bg-blue-50 text-blue-600 px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest">AI Portfolio Ready</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Our AI Generated Bio</h3>
                  <p className="text-gray-700 leading-relaxed text-lg italic bg-orange-50/50 p-6 rounded-3xl border border-orange-100/50">
                    "{profile.bio}"
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Detected Master Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string, idx: number) => (
                      <div key={idx} className="bg-white text-orange-700 px-4 py-2 rounded-xl text-sm font-bold border border-orange-100 shadow-sm">
                        {skill}
                      </div>
                    ))}
                    {profile.skills.length === 0 && <span className="text-gray-400 italic">Processing skills...</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Latest Showcase Product</h3>
                <div className="relative group rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                  <img src={profile.productImage} alt="Product" className="w-full h-64 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-black text-xl">{profile.productName || 'New Craft'}</p>
                    <p className="text-orange-400 font-bold">Listed Price: ₹{profile.productPrice}</p>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🚛</span>
                    <div>
                      <p className="font-bold text-green-900">Collection Status</p>
                      <p className="text-xs text-green-700">Team will arrive for pickup on Tuesday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black mb-8">Managed Sales Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-6 font-black text-gray-400 uppercase text-xs">Tracking ID</th>
                    <th className="pb-6 font-black text-gray-400 uppercase text-xs">Product</th>
                    <th className="pb-6 font-black text-gray-400 uppercase text-xs">Managed Status</th>
                    <th className="pb-6 font-black text-gray-400 uppercase text-xs">Your Earnings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-6 font-mono text-sm text-gray-500">{order.id}</td>
                      <td className="py-6 font-black text-gray-900">{order.item}</td>
                      <td className="py-6">
                        <span className="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-orange-100">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-6 font-black text-green-600 text-lg">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Profile & Actions */}
        <div className="space-y-8">
          <div className="bg-gray-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <h3 className="text-2xl font-black mb-6 relative z-10">Studio Assistant</h3>
            <div className="space-y-6 relative z-10">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-orange-400 font-black text-sm uppercase mb-2">Artisan Support</p>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "Hello {profile.name}! Your dedicated manager is <span className="text-white font-bold">Ramesh</span>. He will handle all buyer calls for you."
                </p>
              </div>
              <button className="w-full bg-orange-600 hover:bg-orange-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-600/20 active:scale-95">
                📞 Call Your Manager
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold border border-white/10 transition-all">
                📷 Take New Product Photo
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Live Shop URL</p>
            <p className="text-orange-600 font-bold text-sm mb-4">shaktibridge.in/studio/{profile.name?.toLowerCase().replace(/\s+/g, '-') || 'artisan'}</p>
            <div className="w-24 h-24 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center border-2 border-dashed border-gray-100 mb-4">
              <span className="text-4xl">🔗</span>
            </div>
            <button className="text-gray-400 font-bold hover:text-orange-600 transition-colors">Share Portfolio</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
