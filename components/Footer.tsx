
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SHAKTI BRIDGE</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">
              Connecting rural talent with global opportunity through a managed and ethical marketplace.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-600 transition-colors">𝕏</a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-600 transition-colors">📸</a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-600 transition-colors">💼</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Marketplace</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Browse Portfolio</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Artisan Stories</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Bulk Orders</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">For Artisans</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Register Studio</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Partner NGOs</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Hub Locations</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Fair Trade Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Intermediary Trust</h4>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <p className="text-xs text-orange-800 leading-relaxed">
                We manage logistics, packaging, and payments so artisans can focus on their craft. Shakti Bridge ensures 100% fair wage transfer.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 Shakti Bridge Managed Marketplace. All rights reserved.</p>
          <div className="flex space-x-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
            <a href="#" className="hover:text-gray-600">Ethical Charter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
