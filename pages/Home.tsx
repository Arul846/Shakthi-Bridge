
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPath } from '../types';

interface HomeProps {
  setUserRole: (role: UserPath) => void;
}

const Home: React.FC<HomeProps> = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleSelection = (role: UserPath) => {
    setUserRole(role);
    if (role === UserPath.SELLER) {
      navigate('/seller/onboarding');
    } else {
      navigate('/buyer/marketplace');
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            SHAKTI BRIDGE
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
            Empowering rural women to sell their crafts with <span className="text-orange-600 font-medium italic">dignity</span> and <span className="text-orange-600 font-medium italic">global reach</span>.
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Seller Option */}
          <button 
            onClick={() => handleSelection(UserPath.SELLER)}
            className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-orange-200 transition-all hover:-translate-y-1 text-left"
          >
            <div className="mb-6 w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
              <span className="text-3xl">🧵</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">I Am a Seller</h2>
            <p className="text-gray-500 mb-6">Are you a woman artisan or representing a self-help group? We help you sell and manage everything.</p>
            <div className="flex items-center text-orange-600 font-bold">
              Start Your Journey <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>

          {/* Buyer Option */}
          <button 
            onClick={() => handleSelection(UserPath.BUYER)}
            className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-green-200 transition-all hover:-translate-y-1 text-left"
          >
            <div className="mb-6 w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <span className="text-3xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">I Am a Buyer</h2>
            <p className="text-gray-500 mb-6">Looking for authentic, ethical, handmade products? Browse portfolios and support rural livelihoods.</p>
            <div className="flex items-center text-green-600 font-bold">
              Explore Marketplace <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        </div>

        <div className="mt-24 text-center">
          <h3 className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-8">Our Core Promise</h3>
          <div className="flex flex-wrap justify-center gap-12 text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-orange-500 font-bold">✓</span>
              <span>Managed Logistics</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-orange-500 font-bold">✓</span>
              <span>Fair Pricing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-orange-500 font-bold">✓</span>
              <span>AI Portfolio Builder</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-orange-500 font-bold">✓</span>
              <span>Team Support</span>
            </div>
          </div>
          <p className="mt-16 text-gray-400 font-medium italic">
            "We don’t just connect buyers and sellers — we manage the entire journey so rural women can focus only on creating."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
